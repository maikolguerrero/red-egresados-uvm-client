import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from "notistack";
import { typeError } from "../models/alertModels";
import socketService from "../services/socket.service";
import { getMessages, markMessagesAsRead } from "../services/chatService";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentChat: null,
        messages: [],
        conversations: [],
        unreadTotal: 0,
        loading: false,
        error: null,
        unreadCount: 0,
        // usersViewingStatus: {}, // { userId: { isViewing: boolean, chatWith: string } }
        contactViewingStatus: {}, // { userId: boolean }
        userOnlineStatus: {}, // { userId: { isOnline: boolean, lastSeen: Date } }
    },
    reducers: {
        updateConversationOnNewMessage: (state, action) => {
            const message = action.payload;
            const contactId = message.sender.id === state.currentUser.id
                ? message.receiver.id
                : message.sender.id;

            const conversationIndex = state.conversations.findIndex(
                c => c.userId === contactId
            );

            if (conversationIndex >= 0) {
                // Actualizar último mensaje
                state.conversations[conversationIndex].lastMessage = message;

                // Incrementar contador si el mensaje es para mí
                if (message.receiver.id === state.currentUser.id) {
                    state.conversations[conversationIndex].unreadCount += 1;
                    state.unreadTotal += 1;
                }

                // Mover la conversación al inicio
                const updatedConversation = state.conversations.splice(conversationIndex, 1)[0];
                state.conversations.unshift(updatedConversation);
            }
        },
        updateConversationOnMessageRead: (state, action) => {
            const { messageIds, readAt } = action.payload;

            state.conversations = state.conversations.map(conv => {
                if (conv.lastMessage && messageIds.includes(conv.lastMessage._id)) {
                    return {
                        ...conv,
                        lastMessage: {
                            ...conv.lastMessage,
                            read: true,
                            readAt
                        }
                    };
                }
                return conv;
            });
        },
        setConversations(state, action) {
            state.conversations = action.payload;
            state.unreadTotal = action.payload.reduce((sum, conv) => sum + conv.unreadCount, 0);
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            if (action.payload.sender !== state.currentChat?.userId) {
                state.unreadCount += 1;
            }
        },
        setMessagesRead: (state, action) => {
            const messageIds = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.messages = state.messages.map(msg => {
                if (messageIds.includes(msg._id)) {
                    return { ...msg, read: true, readAt: new Date().toISOString() };
                }
                return msg;
            });
            state.unreadCount = Math.max(0, state.unreadCount - messageIds.length);
        },
        setMessageRead: (state, action) => {
            const { messageId, readAt } = action.payload;
            state.messages = state.messages.map(msg => {
                if (msg._id === messageId) {
                    return {
                        ...msg,
                        read: true,
                        readAt: readAt || new Date().toISOString()
                    };
                }
                return msg;
            });
        },
        updateMessages: (state, action) => {
            action.payload.forEach(updatedMsg => {
                const index = state.messages.findIndex(m => m._id === updatedMsg._id);
                if (index !== -1) {
                    state.messages[index] = {
                        ...state.messages[index],
                        ...updatedMsg
                    };
                }
            });
        },
        setUserOnlineStatus: (state, action) => {
            const { userId, isOnline, lastSeen } = action.payload;
            state.userOnlineStatus[userId] = { isOnline, lastSeen };
        },
        setUserViewingStatus: (state, action) => {
            const { userId, isViewing, chatWith } = action.payload;
            state.usersViewingStatus[userId] = { isViewing, chatWith };
        },
        setContactViewingStatus: (state, action) => {
            const { userId, isViewing } = action.payload;
            state.contactViewingStatus[userId] = isViewing;
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter(msg => msg._id !== action.payload);
        },
        replaceTempMessage: (state, action) => {
            const index = state.messages.findIndex(msg => msg._id === action.payload.tempId);
            if (index !== -1) {
                state.messages[index] = {
                    ...action.payload.realMessage,
                    isTemp: false
                };
            }
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        // setConversations: (state, action) => {
        //     state.conversations = action.payload;
        // },
        resetChat: (state) => {
            state.messages = [];
            state.currentChat = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                console.log("Cargando mensajes...");
                state.loading = true;
                state.error = null;
            })
            // .addCase(getMessages.fulfilled, (state, action) => {
            //     console.log("Mensajes cargados:", action.payload);
            //     state.loading = false;
            //     state.messages = action.payload;
            // })

            // Modificar el extraReducer para getMessages.fulfilled
            .addCase(getMessages.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.isNewPage) {
                    // Agregar mensajes al inicio si es una nueva página
                    state.messages = [...action.payload.messages, ...state.messages];
                } else {
                    // Reemplazar mensajes si es la primera carga
                    state.messages = action.payload.messages;
                }

                state.hasMore = action.payload.hasMore;
            })
            .addCase(getMessages.rejected, (state, action) => {
                console.error("Error cargando mensajes:", action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(markMessagesAsRead.pending, (state) => {
                state.loading = true;
            })
            .addCase(markMessagesAsRead.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(markMessagesAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    setConversations,
    addMessage,
    setMessagesRead,
    setMessageRead,
    updateMessages,
    removeMessage,
    replaceTempMessage,
    setCurrentChat,
    setMessages,
    resetChat
} = chatSlice.actions;

export default chatSlice.reducer;



// export const getMessages = createAsyncThunk(
//     "chat/getMessages",
//     async (userId, thunkAPI) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/chat/conversation/${userId}`,
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

//             // Asegúrate de devolver un array de mensajes
//             return data.data || [];

//         } catch (error) {
//             // Usa thunkAPI para manejar el error consistentemente
//             return thunkAPI.rejectWithValue(error.message);
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

// export const sendMessageAction = (receiverId, content) => {
//     return async (dispatch) => {
//         try {
//             const success = socketService.sendPrivateMessage(receiverId, content);
//             if (!success) {
//                 throw new Error("No se pudo enviar el mensaje");
//             }
//         } catch (error) {
//             enqueueSnackbar(error.message, typeError);
//             throw error;
//         }
//     };
// };

// // Crear una acción asíncrona para marcar como leído
// export const markMessagesAsRead = createAsyncThunk(
//     'chat/markMessagesAsRead',
//     async (messageIds, { dispatch }) => {
//         try {
//             // Primero actualizar el estado local
//             dispatch(setMessagesRead(messageIds));

//             // Luego enviar al servidor
//             await socketService.markMessagesAsRead(messageIds);
//             return messageIds;
//         } catch (error) {
//             enqueueSnackbar(error.message, typeError);
//             throw error;
//         }
//     }
// );