import { useEffect, useState } from "react";
import { CardBanner } from "../../Components/Card/CardBanner";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markNotificationAsRead, deleteNotification } from "../../services/notifications/notificationService";
import socketService from "../../services/socket/socket.service";
import notify from "../../utils/notifications";
import { decrementUnreadCount } from "../../features/notifications/notificationSlice";
import Paginations from "../../Components/Paginations";

function Notifications() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useSelector((state) => state.socket);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await getNotifications(currentPage, perPage);
        setNotifications(response.data);
        setTotal(response.pagination.total);
      } catch (error) {
        notify.error(error.message, true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage, perPage]);

  useEffect(() => {
    if (!isConnected) return;

    // Escuchar nuevas notificaciones
    const handleNewNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setTotal(prev => prev + 1);
    };

    socketService.socket.on('new_notification', handleNewNotification);

    return () => {
      socketService.socket.off('new_notification', handleNewNotification);
    };
  }, [isConnected]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );

      // Actualizar Redux solo si estaba no leída
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        dispatch(decrementUnreadCount());

        // Opcional: Verificar con el servidor
        if (socketService.isConnected) {
          socketService.socket.emit('get_unread_notification_count');
        }
      }
    } catch (error) {
      notify.error(error.message, true);
    }
  };

  const max = Math.ceil(total / perPage);

  const onPageChange = (page) => setCurrentPage(page);

  const handleDeleteNotification = async (deletedId, wasRead) => {
    try {
      await deleteNotification(deletedId);

      // Actualización optimista del estado local
      setNotifications(prev => prev.filter(n => n.id !== deletedId));
      setTotal(prev => prev - 1);

      // Si la notificación no estaba leída, actualizar el contador
      if (!wasRead) {
        // Actualizar Redux
        dispatch(decrementUnreadCount());

        // Opcional: Verificar con el servidor para mantener consistencia
        if (socketService.isConnected) {
          socketService.socket.emit('get_unread_notification_count');
        }
      }
    } catch (error) {
      notify.error(error.message, true);
      // Revertir cambios si hay error
      const response = await getNotifications(currentPage, perPage);
      setNotifications(response.data);
      setTotal(response.pagination.total);
    }
  };

  // return (
  //   <>
  //     {loading ? (
  //       <div className="w-full flex justify-center">
  //         <p>Cargando notificaciones...</p>
  //       </div>
  //     ) : (
  //       <>

  //         {/* sin notificaciones */}
  //         {notifications.length === 0 ? (
  //           <div className="w-full flex justify-center items-center">
  //             <div className="bg-Gris p-4 rounded-lg shadow-sm">
  //               <p className="text-center font-barolw text-lg">No tienes notificaciones</p>
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="w-full gap-6 justify-center flex-col flex">
  //             {notifications.map((item) => (
  //               <CardBanner
  //                 key={item.id}
  //                 noti={item.data.message}
  //                 type={item.type}
  //                 createdAt={item.createdAt}
  //                 isRead={item.read}
  //                 onMarkAsRead={() => handleMarkAsRead(item.id)}
  //                 notificationId={item.id}
  //                 onDelete={handleDeleteNotification}
  //                 data={item.data} // Pasa todos los datos de la notificación
  //               />
  //             ))}
  //           </div>
  //         )}
  //         {max > 1 && (
  //           <div className="flex justify-center">
  //             <Paginations
  //               currentPage={currentPage}
  //               totalPages={max}
  //               onPageChange={onPageChange}
  //             />
  //           </div>
  //         )}
  //       </>
  //     )}
  //   </>
  // );
  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center py-8">
          <p>Cargando notificaciones...</p>
        </div>
      ) : (
        <>
          {/* sin notificaciones */}
          {notifications.length === 0 ? (
            <div className="w-full flex justify-center items-center py-8">
              <div className="bg-Gris p-4 rounded-lg shadow-sm max-w-md w-full">
                <p className="text-center font-barolw text-lg">No tienes notificaciones</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-6 px-4">
              {notifications.map((item) => (
                <CardBanner
                  key={item.id}
                  noti={item.data.message}
                  type={item.type}
                  createdAt={item.createdAt}
                  isRead={item.read}
                  onMarkAsRead={() => handleMarkAsRead(item.id)}
                  notificationId={item.id}
                  onDelete={handleDeleteNotification}
                  data={item.data}
                />
              ))}
            </div>
          )}
          {max > 1 && (
            <div className="flex justify-center py-4">
              <Paginations
                currentPage={currentPage}
                totalPages={max}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Notifications;