import { useEffect, useState } from "react";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { CardBanner } from "../../Components/Card/CardBanner";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markNotificationAsRead, deleteNotification, getUnreadNotificationCount } from "../../services/notifications/notificationService";
import socketService from "../../services/socket/socket.service";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../models/alertModels";
import { decrementUnreadCount } from "../../features/notifications/notificationSlice";

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700",
      span: "font-semibold text-gray-900",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-verdeD bg-Gris py-2 leading-tight text-Negro enabled:hover:bg-white enabled:hover:text-verdeD",
      active:
        "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

function Notifications() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
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
        enqueueSnackbar(error.message, typeError);
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
      enqueueSnackbar(error.message, typeError);
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
      enqueueSnackbar(error.message, typeError);
      // Revertir cambios si hay error
      const response = await getNotifications(currentPage, perPage);
      setNotifications(response.data);
      setTotal(response.pagination.total);
    }
  };

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          {loading ? (
            <div className="w-full flex justify-center">
              <p>Cargando notificaciones...</p>
            </div>
          ) : (
            <>

              {/* sin notificaciones */}
              {notifications.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  <div className="bg-Gris p-4 rounded-lg shadow-sm">
                    <p className="text-center font-barolw text-lg">No tienes notificaciones</p>
                  </div>
                </div>
              ) : (
                <div className="w-full gap-6 justify-center flex-col flex">
                  {notifications.map((item) => (
                    console.log("Notificación:", item),
                    <CardBanner
                      key={item.id}
                      noti={item.data.message}
                      type={item.type}
                      createdAt={item.createdAt}
                      isRead={item.read}
                      onMarkAsRead={() => handleMarkAsRead(item.id)}
                      notificationId={item.id}
                      onDelete={handleDeleteNotification}
                      data={item.data} // Pasa todos los datos de la notificación
                    />
                  ))}
                </div>
              )}
              {max > 1 && (
                <div className="flex justify-center">
                  <ThemeProvider theme={customTheme}>
                    <Pagination
                      theme={customTheme}
                      className="border-verdeD"
                      currentPage={currentPage}
                      totalPages={max}
                      onPageChange={onPageChange}
                    />
                  </ThemeProvider>
                </div>
              )}
            </>
          )}
        </section>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default Notifications;