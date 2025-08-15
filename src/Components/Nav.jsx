import { BsCalendarDate } from "react-icons/bs";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong, FaGear, FaPeopleGroup } from "react-icons/fa6";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";
import { useEffect, useState, useRef } from "react";
import socketService from "../services/socket/socket.service";
import { getUnreadNotificationCount } from "../services/notifications/notificationService";
import useIsMobile from "../hooks/useIsMobile";
import { MdEditDocument } from "react-icons/md";
import NavItem from "./NavItem";
import logger from "../utils/logger";

function Nav() {
  const role = useSelector((state) => state.auth.role);
  const isSidebar = useSelector((state) => state.sidebar.isSidebar);
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  const isMobile = useIsMobile();

  const itemRef = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const handleMouseEnter = () => {
    if (isMobile) return;

    const rect = itemRef.current.getBoundingClientRect();
    setTooltipStyle({
      left: `${rect.right + 10}px`, // 10px a la derecha del elemento
      top: `${rect.top + rect.height / 2}px`, // Centrado vertical
    });
  };

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        // Obtener el conteo inicial desde la API REST
        const count = await getUnreadNotificationCount();
        setUnreadCount(count);
      } catch (error) {
        logger.error("Error obteniendo conteo de notificaciones:", error);
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
      <>
        {/* Overlay para móvil - solo se muestra cuando el sidebar está abierto */}
        {isMobile && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out ${!isSidebar ? "opacity-50" : "opacity-0 pointer-events-none"
              }`}
            onClick={() => dispatch(toggleSidebar())}
          />
        )}

        <nav
          className={`${isMobile
            ? `fixed top-0 left-0 h-full w-full ${!isSidebar ? "translate-x-0" : "-translate-x-full"}`
            : isSidebar
              ? "w-[60px] items-center"
              : "md:w-[200px] absolute md:relative w-full"
            } flex flex-col border-r-2 bg-Gris ${!isMobile && "border-verdeD"}
              h-[89.5vh] text-verdeD transition-all duration-300 ease-in-out z-20
              overflow-y-auto overflow-x-hidden`} // scroll vertical
        >
          {/* Contenido del sidebar */}
          <div className="px-4 pt-3 flex justify-end">

            <div
              ref={itemRef}
              onMouseEnter={handleMouseEnter}
              // onMouseLeave={() => setTooltipStyle({})}
              className="relative group"
            >
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="rounded-full px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all group relative"
              >
                {isSidebar ? (
                  <FaArrowRightLong className="text-xl" />
                ) : (
                  <FaArrowLeftLong className="text-xl" />
                )}

                {!isMobile && (
                  <div
                    className="fixed z-[9999] px-3 py-1 bg-verdeD text-Blanco text-sm rounded-md whitespace-nowrap shadow-lg origin-left scale-0 group-hover:scale-100 transition-transform duration-200 transform -translate-y-1/2"
                    style={{
                      left: `${tooltipStyle.left}`,
                      top: `${tooltipStyle.top}`,
                    }}
                  >
                    {isSidebar ? "EXPANDIR" : "CONTRAER"}
                  </div>
                )}
              </button>
            </div>
          </div>

          <ul className="py-4 border-b border-verdeD">
            <NavItem
              to="/home"
              icon={<IoIosHome className="text-2xl" />}
              text="PRINCIPAL"
              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
          </ul>
          <ul className="py-4 border-b border-verdeD">
            <NavItem
              to="/graduates"
              icon={<FaGraduationCap className="text-2xl" />}
              text="EGRESADOS"
              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
            <NavItem
              to="/forum"
              icon={<FaPeopleGroup className="text-2xl" />}
              text="FORO"

              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
            <NavItem
              to="/projects"
              icon={<PiProjectorScreenChartBold className="text-2xl" />}
              text="PROYECTOS"
              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
            <NavItem
              to="/events"
              icon={<BsCalendarDate className="text-2xl" />}
              text="EVENTOS"
              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
          </ul>

          <ul className="py-4 border-b border-verdeD">
            <NavItem
              to="/notifications"
              icon={<IoIosNotifications className="text-2xl" />}
              text="NOTIFICACIONES"
              isSidebar={isSidebar}
              badge={unreadCount}
              onClick={handleClickLink}
            />
            <NavItem
              to="/config"
              icon={<FaGear className="text-2xl" />}
              text="CONFIGURACIÓN"
              isSidebar={isSidebar}
              onClick={handleClickLink}
            />
            {role === "egresado" && (
              <NavItem
                to="/my-profile"
                icon={<FaUser className="text-2xl" />}
                text="PERFIL"
                isSidebar={isSidebar}
                onClick={handleClickLink}
              />
            )}
            {(role === "admin" || role === "superadmin") && (
              <NavItem
                to="/content-manager"
                icon={<MdEditDocument className="text-2xl" />}
                text="GESTOR DE CONTENIDO"
                isSidebar={isSidebar}
                onClick={handleClickLink}
              />
            )}
          </ul>
        </nav>
      </>
    </>
  );
}

export default Nav;