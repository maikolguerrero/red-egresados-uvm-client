import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "..//models/alertModels";
import socketService from "./socket.service";
import { URL_API } from "../config";
import { setMessagesRead } from "../features/chatSlice";

export const getMessages = createAsyncThunk(
    "chat/getMessages",
    async ({ userId, page = 1 }, thunkAPI) => {

        try {
            const response = await fetch(
                `${URL_API}/api/chat/conversation/${userId}?page=${page}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Error al obtener mensajes");
            }

            return {
                messages: data.data.messages,
                hasMore: data.data.hasMore,
                isNewPage: page > 1
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getConversations = async () => {
    const response = await fetch(
        `${URL_API}/api/chat/conversations`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return await response.json();
};


// export const getConversations = createAsyncThunk(
//     "chat/getConversations",
//     async () => {
//         const response = await api.get('/api/chat/conversations');
//         return response.data;
//     }
// );

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ receiverId, content }, { rejectWithValue }) => {
        try {
            console.log("Enviando mensaje a:", receiverId);
            const response = await socketService.sendPrivateMessage(receiverId, content);
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







// export const getMessages = createAsyncThunk(
//     "chat/getMessages",
//     async (userId, { rejectWithValue }) => {
//         try {
//             const response = await fetch(
//                 `${URL_API}/api/chat/conversation/${userId}`,
//                 {
//                     method: "GET",
//                     credentials: "include",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             const data = await response.json();

//             if (!data.success) {
//                 return rejectWithValue(data.message || "Error al obtener mensajes");
//             }

//             alert("hola");


//             // Mapeamos los datos para normalizar la estructura
//             return data.data.map(msg => ({
//                 _id: msg.id,
//                 sender: {
//                     id: msg.sender.id,
//                     username: msg.sender.username,
//                     profilePicture: {
//                         url: msg.sender.profilePicture?.url || null
//                     }
//                 },
//                 receiver: {
//                     id: msg.receiver.id,
//                     username: msg.receiver.username,
//                     profilePicture: {
//                         url: msg.receiver.profilePicture?.url || null
//                     }
//                 },
//                 content: msg.content,
//                 read: msg.read,
//                 createdAt: msg.createdAt,
//                 updatedAt: msg.updatedAt
//             }));

//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const getMessages = createAsyncThunk(
//     "chat/getMessages",
//     async ({ userId, page = 1 }, thunkAPI) => {

//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/chat/conversation/${userId}?page=${page}`,
//                 {
//                     method: "GET",
//                     credentials: "include",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );


//             const data = await response.json();

//             if (!response.ok || !data.success) {
//                 throw new Error(data.message || "Error al obtener mensajes");
//             }

//             return {
//                 messages: data.data.messages,
//                 hasMore: data.data.hasMore,
//                 isNewPage: page > 1
//             };

//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
