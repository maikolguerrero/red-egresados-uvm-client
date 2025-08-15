import { useNavigate } from "react-router-dom";
import { Banner, Badge } from "flowbite-react";
import { HiX } from "react-icons/hi";
import ButtonSmall from "../Buttons/ButtonSmall";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { useState } from "react";
import { deleteNotification } from "../../services/notifications/notificationService";
import { IoIosNotifications, IoMdWarning, IoIosInformationCircle } from "react-icons/io";
import { BsExclamationOctagon } from "react-icons/bs";
import { formatNotification } from "../../utils/dateUtils";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";
import { useSelector } from "react-redux";

export function CardBanner({
  type,
  noti,
  createdAt,
  isRead,
  onMarkAsRead,
  notificationId,
  onDelete,
  data
}) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const role = useSelector((state) => state.auth.role);

  // Función para determinar el icono y texto según el tipo
  const getNotificationTypeInfo = () => {
    switch (type) {
      case 'like':
      case 'mention':
      case 'thread_mention':
      case 'thread_comment':
      case 'comment_reply':
      case 'thread_activity':
        return {
          icon: <FaPeopleGroup className="w-6 h-6" />,
          typeText: "FORO",
          baseRoute: "/forum"
        };
      case 'event_reminder':
        return {
          icon: <BsCalendarDate className="w-6 h-6" />,
          typeText: "EVENTO",
          baseRoute: "/events"
        };
      case 'project_join_request':
      case 'project_request_update':
        return {
          icon: <PiProjectorScreenChartBold className="w-6 h-6" />,
          typeText: "PROYECTO",
          baseRoute: "/projects"
        };
      case 'new_report':
      case 'report_resolved':
        return {
          icon: <BsExclamationOctagon className="w-6 h-6" />,
          typeText: "REPORTE",
          baseRoute: (role === "admin" || role === "superadmin") ? "/config/reports" : "/"
        };
      case 'user_warning':
        return {
          icon: <IoMdWarning className="w-6 h-6" />,
          typeText: "ADVERTENCIA",
        };
      case 'system':
        return {
          icon: <IoIosInformationCircle className="w-6 h-6" />,
          typeText: "SISTEMA",
        };
      default:
        return {
          icon: <IoIosNotifications className="w-6 h-6" />,
          typeText: "NOTIFICACIÓN",
          baseRoute: "/notifications"
        };
    }
  };

  const { icon, typeText, baseRoute } = getNotificationTypeInfo();

  const handleViewClick = () => {
    // Marcar como leída si no lo está
    if (!isRead && onMarkAsRead) {
      onMarkAsRead();
    }

    // Navegar según el tipo de notificación y datos disponibles
    if (data?.reportId && (role === "admin" || role === "superadmin")) {
      // Notificaciones de proyectos
      navigate(`/config/reports`);
    } else if (data?.threadId) {
      // Notificaciones relacionadas con foros
      navigate(`/forum/${data.threadId}`);

      // Scroll a comentario específico si existe
      if (data?.commentId) {
        setTimeout(() => {
          const commentElement = document.getElementById(`comment-${data.commentId}`);
          if (commentElement) {
            commentElement.scrollIntoView({ behavior: "smooth" });
            commentElement.classList.add("highlight-comment");
            setTimeout(() => {
              commentElement.classList.remove("highlight-comment");
            }, 2000);
          }
        }, 500);
      }
    } else if (data?.eventId) {
      // Notificaciones de eventos
      navigate(`/events/${data.eventId}`);
    } else if (data?.projectId) {
      // Notificaciones de proyectos
      navigate(`/projects/${data.projectId}`);
    } else {
      // Redirección genérica si no hay ID específico
      navigate(baseRoute);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotification(notificationId);
      setIsVisible(false);
      // Notificar al componente padre que se eliminó
      if (onDelete) {
        onDelete(notificationId, isRead);
      }
      notify.success("Notificación eliminada", false);
    } catch (error) {
      notify.error(error.message, true);
      logger.error("Error eliminando notificación:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center">
      <div
        className={`flex w-full max-w-4xl flex-row justify-between rounded-lg border ${!isRead ? "border-RojoC" : "border-verdeD"
          } bg-Gris p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
        onClick={handleViewClick}
      >
        <div className="mb-2 flex flex-col items-start">
          <div className={`mb-2 flex gap-3 items-center ${!isRead ? "border-RojoC" : "border-verdeD"}`}>
            {icon}
            <span className="self-center whitespace-nowrap text-lg font-semibold">
              {typeText}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal text-Negro">
              {noti}
            </p>
            <p className="text-xs text-gray-600 italic">
              {formatNotification(createdAt)}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {!isRead && (
              <Badge color="failure">
                Nuevo
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row shrink-0 items-center gap-1 self-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="border-0 bg-transparent text-RojoC hover:text-RojoB transition-colors p-1"
            aria-label="Eliminar notificación"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}