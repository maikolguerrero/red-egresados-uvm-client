import { URL_API } from "../../config";

export const getNotifications = async (page = 1, limit = 10) => {
    const response = await fetch(
        `${URL_API}/api/notifications?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Error al obtener notificaciones");
    }
    return data;
};

export const markNotificationAsRead = async (notificationId) => {
    const response = await fetch(
        `${URL_API}/api/notifications/${notificationId}/read`,
        {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Error al marcar como leída");
    }
    return data;
};

export const deleteNotification = async (notificationId) => {
    try {
        const response = await fetch(
            `${URL_API}/api/notifications/${notificationId}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al eliminar notificación");
        }

        return data;
    } catch (error) {
        console.error("Error en deleteNotification:", error);
        throw error;
    }
};

export const getUnreadNotificationCount = async () => {
    try {
        const response = await fetch(
            `${URL_API}/api/notifications/unread-count`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener conteo de notificaciones");
        }

        return data.count || 0;
    } catch (error) {
        console.error("Error en getUnreadNotificationCount:", error);
        throw error;
    }
};