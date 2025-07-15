import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages, markMessagesAsRead } from "../../services/chat/chatService";
import logger from "../../utils/logger";

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
        contactViewingStatus: {}, // { userId: boolean }
        userOnlineStatus: {}, // { userId: { isOnline: boolean, lastSeen: Date } }
        chatRequests: {} // Para rastrear solicitudes de chat
    },
    reducers: {
        chatRequestAccepted: (state, action) => {
            const { messageId, acceptorId } = action.payload;

            // Actualizar el estado del mensaje en la lista de mensajes
            state.messages = state.messages.map(msg => {
                if (msg.id === messageId) {
                    return { ...msg, status: 'accepted' };
                }
                return msg;
            });

            // Si el mensaje aceptado es el currentChat, actualizar permisos
            if (state.currentChat?.userId === acceptorId ||
                state.messages.some(m => m.sender.id === acceptorId || m.receiver.id === acceptorId)) {
                state.hasChatPermission = true;
            }

            // Eliminar la solicitud pendiente si existe
            if (state.pendingRequest?.id === messageId) {
                state.pendingRequest = null;
            }
        },
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
                if (conv.lastMessage && messageIds.includes(conv.lastMessage.id)) {
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
                if (messageIds.includes(msg.id)) {
                    return { ...msg, read: true, readAt: new Date().toISOString() };
                }
                return msg;
            });
            state.unreadCount = Math.max(0, state.unreadCount - messageIds.length);
        },
        setMessageRead: (state, action) => {
            const { messageId, readAt } = action.payload;
            state.messages = state.messages.map(msg => {
                if (msg.id === messageId) {
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
                const index = state.messages.findIndex(m => m.id === updatedMsg.id);
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
            state.messages = state.messages.filter(msg => msg.id !== action.payload);
        },
        replaceTempMessage: (state, action) => {
            const index = state.messages.findIndex(msg => msg.id === action.payload.tempId);
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
        resetChat: (state) => {
            state.messages = [];
            state.currentChat = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                logger.log("Cargando mensajes...");
                state.loading = true;
                state.error = null;
            })
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
                logger.error("Error cargando mensajes:", action.payload);
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
    chatRequestAccepted,
    setConversations,
    addMessage,
    setMessagesRead,
    setMessageRead,
    updateMessages,
    updateConversationOnNewMessage,
    removeMessage,
    replaceTempMessage,
    setCurrentChat,
    setMessages,
    resetChat
} = chatSlice.actions;

export default chatSlice.reducer;