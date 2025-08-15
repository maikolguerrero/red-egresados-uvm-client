import { apiFetch } from "../apiService";
import logger from "../../utils/logger";

export const getNotifications = async (page = 1, limit = 10) => {
    const response = await apiFetch(
        `/api/notifications?page=${page}&limit=${limit}`,
        {
            method: "GET",
        }
    );
    if (!response.success) {
        throw new Error(response.message || "Error al obtener notificaciones");
    }
    return response;
};

export const markNotificationAsRead = async (notificationId) => {
    const response = await apiFetch(
        `/api/notifications/${notificationId}/read`,
        {
            method: "PATCH",
        }
    );
    if (!response.success) {
        throw new Error(response.message || "Error al marcar como leída");
    }
    return response;
};

export const deleteNotification = async (notificationId) => {
    try {
        const response = await apiFetch(
            `/api/notifications/${notificationId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.success) {
            throw new Error(response.message || "Error al eliminar notificación");
        }

        return response;
    } catch (error) {
        logger.error("Error en deleteNotification:", error);
        throw error;
    }
};

export const getUnreadNotificationCount = async () => {
    try {
        const response = await apiFetch(
            `/api/notifications/unread-count`,
            {
                method: "GET",
            }
        );

        if (!response.success) {
            throw new Error(response.message || "Error al obtener conteo de notificaciones");
        }

        return response.count || 0;
    } catch (error) {
        logger.error("Error en getUnreadNotificationCount:", error);
        throw error;
    }
};