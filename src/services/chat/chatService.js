import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../models/alertModels";
import socketService from "../../services/socket/socket.service";
import { setMessagesRead } from "../../features/chat/chatSlice";
import { apiFetch } from "../apiService";

export const getMessages = createAsyncThunk(
    "chat/getMessages",
    async ({ userId, page = 1 }, thunkAPI) => {

        try {
            const response = await apiFetch(
                `/api/chat/conversation/${userId}?page=${page}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener mensajes");
            }

            return {
                messages: response.data.messages,
                hasMore: response.data.hasMore,
                isNewPage: page > 1
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getConversations = async () => {
    const response = await apiFetch(
        `/api/chat/conversations`,
        {
            method: "GET",
        }
    );
    return response;
};

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ receiverId, content, read }, { rejectWithValue }) => {
        try {
            console.log("Enviando mensaje a:", receiverId);
            const response = await socketService.sendPrivateMessage(receiverId, content, read);
            console.log("Respuesta del servidor:", response);
            return response; // El mensaje confirmado del servidor
        } catch (error) {
            console.error("Error enviando mensaje:", error);
            return rejectWithValue(error.message);
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
            enqueueSnackbar(error.message, typeError);
            throw error;
        }
    }
);