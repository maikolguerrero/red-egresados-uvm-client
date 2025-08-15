import { useEffect, useState } from "react";
import { CardBanner } from "../../Components/Card/CardBanner";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markNotificationAsRead } from "../../services/notifications/notificationService";
import socketService from "../../services/socket/socket.service";
import notify from "../../utils/notifications";
import { decrementUnreadCount } from "../../features/notifications/notificationSlice";
import Paginations from "../../Components/Paginations";
import { Loader } from "../../Components/Loader";

function Notifications() {
  const { notifications } = useSelector((state) => state.notifications);
  const pagination = useSelector((state) => state.notifications.pagination);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useSelector((state) => state.socket);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        dispatch(getNotifications({ page: currentPage, limit: perPage }));
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
    const handleNewNotification = () => {
      dispatch(getNotifications());
    };

    socketService.socket.on('new_notification', handleNewNotification);

    return () => {
      socketService.socket.off('new_notification', handleNewNotification);
    };
  }, [isConnected]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      dispatch(markNotificationAsRead(notificationId));

      // Actualizar Redux solo si estaba no leída
      const notification = notifications?.find(n => n.id === notificationId);
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

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center py-8">
          <Loader />
        </div>
      ) : (
        <>
          {/* sin notificaciones */}
          {notifications?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-8">
              <div className="bg-Gris p-4 rounded-lg shadow-sm max-w-md w-full">
                <p className="text-center font-barolw text-lg">No tienes notificaciones</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-6 px-4">
              {notifications?.map((item) => (
                <CardBanner
                  key={item?.id}
                  noti={item?.data?.message}
                  type={item?.type}
                  createdAt={item?.createdAt}
                  isRead={item?.read}
                  onMarkAsRead={() => handleMarkAsRead(item?.id)}
                  notificationId={item?.id}
                  data={item?.data}
                />
              ))}
            </div>
          )}
          {pagination.pages > 1 && (
            <div className="flex justify-center py-4">
              <Paginations
                currentPage={pagination.page}
                totalPages={pagination.pages}
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