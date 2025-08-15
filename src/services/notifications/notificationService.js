import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

export const getNotifications = createAsyncThunk(
    "notifications/getNotifications",
    async ({ page = 1, limit = 10 }, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/notifications?page=${page}&limit=${limit}`,
                {
                    method: "GET",
                }
            );
            if (!response.success) {
                notify.error(response.message || "Error al obtener notificaciones", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }
            return response;
        } catch (error) {
            logger.error("Error en getNotifications:", error);
            notify.error(error, true);
            notify.errorDefault();
            throw error;
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    "notifications/markNotificationAsRead",
    async (notificationId, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/notifications/${notificationId}/read`,
                {
                    method: "PATCH",
                }
            );
            if (!response.success) {
                notify.error(response.message || "Error al marcar como leída", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }
            return response;
        } catch (error) {
            logger.error("Error en markNotificationAsRead:", error);
            notify.error(error, true);
            notify.errorDefault();
            throw error;
        }
    }
);

export const deleteNotification = createAsyncThunk(
    "notifications/deleteNotification",
    async (notificationId, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/notifications/${notificationId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.success) {
                notify.error(response.message || "Error al eliminar notificación", true);
                return thunkAPI.rejectWithValue({ continue: false });
            }

            return response;
        } catch (error) {
            logger.error("Error en deleteNotification:", error);
            notify.error(error, true);
            notify.errorDefault();
            throw error;
        }
    }
);

export const getUnreadNotificationCount = createAsyncThunk(
    "notifications/getUnreadNotificationCount",
    async (data, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/notifications/unread-count`,
                {
                    method: "GET",
                }
            );

            if (!response.success) {
                notify.error(response.message || "Error al obtener conteo de notificaciones", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }

            return response.count || 0;
        } catch (error) {
            logger.error("Error en getUnreadNotificationCount:", error);
            notify.error(error, true);
            notify.errorDefault();
            throw error;
        }
    }
);