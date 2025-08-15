import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from "../../utils/notifications";
import socketService from "../../services/socket/socket.service";
import { setMessagesRead } from "../../features/chat/chatSlice";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";

export const getMessages = createAsyncThunk(
    "chat/getMessages",
    async ({ userId, page = 1 }, thunkAPI) => {

        try {
            const response = await apiFetch(
                `/chat/conversation/${userId}?page=${page}`,
                {
                    method: "GET",
                }
            );

            if (!response.success) {
                notify.error(response.message || "Error al obtener mensajes", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }

            return {
                messages: response.data.messages,
                hasMore: response.data.hasMore,
                isNewPage: page > 1
            };

        } catch (error) {
            notify.error(error.message, true);
            notify.errorDefault();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getConversations = createAsyncThunk(
    "chat/getConversations",
    async (data, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/chat/conversations`,
                {
                    method: "GET",
                }
            );

            if (!response.success) {
                notify.error(response.message || "Error al obtener conversaciones", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }

            return response;
        } catch (error) {
            notify.error(error.message || "Error al obtener conversaciones", true);
            notify.errorDefault();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ receiverId, content, read }, thunkAPI) => {
        try {
            logger.log("Enviando mensaje a:", receiverId);
            const response = await socketService.sendPrivateMessage(receiverId, content, read);
            logger.log("Respuesta del servidor:", response);

            if (!response) {
                notify.error("Error al enviar mensaje", false);
                return thunkAPI.rejectWithValue({ continue: false });
            }

            return response; // El mensaje confirmado del servidor
        } catch (error) {
            logger.error("Error enviando mensaje:", error);
            notify.error(error.message || "Error al enviar mensaje", true);
            notify.errorDefault();
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Crear una acción asíncrona para marcar como leído
export const markMessagesAsRead = createAsyncThunk(
    'chat/markMessagesAsRead',
    async (messageIds, { dispatch }) => {
        try {
            // Primero actualizar el estado local
            dispatch(setMessagesRead(messageIds));

            // Luego enviar al servidor
            await socketService.markMessagesAsRead(messageIds);
            return messageIds;
        } catch (error) {
            notify.error(error.message || "Error al marcar mensajes como leídos", true);
            throw error;
        }
    }
);