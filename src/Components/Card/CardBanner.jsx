import { useNavigate } from "react-router-dom";
import { Banner, Badge } from "flowbite-react";
import { HiX } from "react-icons/hi";
import ButtonSmall from "../Buttons/ButtonSmall";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { useState } from "react";
import { deleteNotification } from "../../services/notifications/notificationService";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { IoIosNotifications } from "react-icons/io";

export function CardBanner({
  type,
  noti,
  isRead,
  onMarkAsRead,
  notificationId,
  onDelete,
  data
}) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

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
          baseRoute: "/forums"
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
          baseRoute: "/proyects"
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
    if (data?.threadId) {
      // Notificaciones relacionadas con foros
      navigate(`/forums/${data.threadId}`);

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
      navigate(`/proyects/${data.projectId}`);
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
      enqueueSnackbar("Notificación eliminada", typeSuccess);
    } catch (error) {
      enqueueSnackbar(error.message, typeError);
      console.error("Error eliminando notificación:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <Banner>
      <div
        className={`flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border ${!isRead ? "border-RojoC" : "border-verdeD"
          } bg-Gris p-4 shadow-sm md:flex-row lg:max-w-7xl cursor-pointer`}
        onClick={handleViewClick}
      >
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <div className="mb-2 flex gap-3 items-center border-verdeC md:mb-0 md:mr-4 md:border-r md:pr-4">
            {icon}
            <span className="self-center whitespace-nowrap text-lg font-semibold md:pr-6">
              {typeText}
            </span>
          </div>
          <p className="flex items-center text-sm font-normal text-Negro">
            {noti}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {!isRead && (
            <Badge color="failure" className="mr-2">
              Nuevo
            </Badge>
          )}
          <ButtonSmall
            text={"Ver..."}
            className={"bg-verdeC hover:bg-RojoC"}
          />
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita que se marque como leída al hacer clic en la X
              handleDelete();
            }}
            className="border-0 bg-transparent text-RojoC hover:text-RojoB transition-colors"
            aria-label="Eliminar notificación"
          >
            <HiX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Banner>
  );
}