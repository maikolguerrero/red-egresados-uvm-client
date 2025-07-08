import { BsCalendarDate } from "react-icons/bs";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong, FaGear, FaPeopleGroup } from "react-icons/fa6";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";
import { useEffect, useState } from "react";
import socketService from "../services/socket/socket.service";
import { getUnreadNotificationCount } from "../services/notifications/notificationService";
import useIsMobile from "../hooks/useIsMobile";
import { MdEditDocument } from "react-icons/md";

function Nav() {
  const role = useSelector((state) => state.auth.role);
  const isSidebar = useSelector((state) => state.sidebar.isSidebar);
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        // Obtener el conteo inicial desde la API REST
        const count = await getUnreadNotificationCount();
        setUnreadCount(count);
      } catch (error) {
        console.error("Error obteniendo conteo de notificaciones:", error);
      } finally {
        setLoadingCount(false);
      }
    };

    fetchInitialCount();
  }, []);


  useEffect(() => {
    if (!socketService.isConnected) return;

    const handleNotificationCount = (count) => {
      setUnreadCount(count);
    };

    // Configurar listener para actualizaciones en tiempo real
    socketService.socket.on('notification_count', handleNotificationCount);

    return () => {
      if (socketService.isConnected) {
        socketService.socket.off('notification_count', handleNotificationCount);
      }
    };
  }, []);

  useEffect(() => {
    if (!socketService.isConnected) return;

    const handleNotificationDeleted = () => {
      // Disminuir el contador en 1 (optimista)
      setUnreadCount(prev => Math.max(0, prev - 1));

      // Opcional: Verificar con el servidor para estar seguros
      getUnreadNotificationCount().then(count => {
        setUnreadCount(count);
      });
    };

    socketService.socket.on('notification_deleted', handleNotificationDeleted);

    return () => {
      if (socketService.isConnected) {
        socketService.socket.off('notification_deleted', handleNotificationDeleted);
      }
    };
  }, []);


  const handleClickLink = () => {
    if (isMobile) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <>
      {
        ((isMobile && !isSidebar) || !isMobile) && (
          <nav className={`${isSidebar ? "w-[60px] items-center " : "md:w-[200px] lg:w-[250px] absolute md:relative w-full"} flex flex-col border-r-2 bg-Gris border-verdeD h-[89.5vh] text-verdeD transition-all duration-[400ms] z-10`}>
            <div className="px-4 pt-3 flex justify-end">
              <button className="h-full p-1" onClick={() => dispatch(toggleSidebar())}>
                {isSidebar ? <FaArrowRightLong className="text-xl" /> : <FaArrowLeftLong className="text-xl" />}
              </button>
            </div>

            <ul className="py-4 border-b border-verdeD ">
              <Link to={"/home"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <IoIosHome className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>PRINCIPAL</p>
              </Link>
            </ul>

            <ul className="py-4 border-b border-verdeD ">
              <Link to={"/graduates"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <FaGraduationCap className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>EGRESADOS</p>
              </Link>
              <Link to={"/forums"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <FaPeopleGroup className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>FOROS</p>
              </Link>
              <Link to={"/proyects"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <PiProjectorScreenChartBold className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>PROYECTOS</p>
              </Link>
              <Link to={"/events"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <BsCalendarDate className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>EVENTOS</p>
              </Link>
            </ul>

            <ul className="py-4 border-b border-verdeD ">
              <Link to={"/notifications"} className="relative px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <IoIosNotifications className="text-2xl" />
                {(unreadCount > 0) && (
                  <span
                    className="absolute left-8 top-0 -mt-1 bg-RojoC text-white text-[0.6rem] rounded-full w-5 h-5 flex items-center justify-center te z-10"
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>NOTIFICACIONES</p>
              </Link>
              <Link to={"/config"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                <FaGear className="text-2xl" />
                <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>CONFIGURACION</p>
              </Link>
              {role === "egresado" && (
                <Link to={"/my-profile"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                  <FaUser className="text-2xl" />
                  <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>PERFIL</p>
                </Link>
              )}
              {role === "admin" || role === "superadmin" ? (
                <Link to={"/content-manager"} className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all" onClick={handleClickLink}>
                  <MdEditDocument className="text-2xl" />
                  <p className={`${isSidebar ? "hidden" : "visible"} font-barolw font-bold text-sm`}>GESTOR DE CONTENIDO</p>
                </Link>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        )
      }
    </>
  );
}

export default Nav;