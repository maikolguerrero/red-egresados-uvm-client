import { io } from 'socket.io-client';
import store from '../../app/store';
import { enqueueSnackbar } from 'notistack';
import { typeError } from '../../models/alertModels';
import { URL_SOCKET } from '../../config';
import { updateConversationOnNewMessage } from '../../features/chat/chatSlice';

class SocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.eventListeners = {};
    }

    connect() {
        if (this.isConnected) return;

        this.socket = io(URL_SOCKET, {
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // Solo configurar listeners si no existen
        if (!this.eventListeners.connected) {
            this.setupEventListeners();
        }

        this.setupeEventConnectionListeners();
    }

    disconnect() {
        if (!this.socket || !this.isConnected) return;
        this.socket.disconnect();
        this.isConnected = false;
        this.socket = null;
    }

    setupeEventConnectionListeners() {
        // Registrar que los listeners han sido configurados
        this.eventListeners.connected = true;

        this.socket.on('connect', () => {
            this.isConnected = true;
            store.dispatch({ type: 'socket/setConnected', payload: true });
            console.log('Conectado al servidor de sockets');
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            store.dispatch({ type: 'socket/setConnected', payload: false });
            console.log('Desconectado del servidor de sockets');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Error de conexión con Socket.io:', error);
            enqueueSnackbar('Error de conexión con el chat', typeError);
        });
    }

    setupEventListeners() {
        this.socket.on('user_status_change', (data) => {
            store.dispatch({
                type: 'chat/setUserOnlineStatus',
                payload: {
                    userId: data.userId,
                    isOnline: data.isOnline,
                    lastSeen: data.lastSeen
                }
            });
        });

        this.socket.on('chat_request_accepted', (data) => {
            store.dispatch({
                type: 'chat/chatRequestAccepted',
                payload: {
                    messageId: data.messageId,
                    acceptorId: data.acceptorId
                }
            });
        });

        this.socket.on('new_private_message', (message) => {
            store.dispatch({ type: 'chat/addMessage', payload: message });

            // Si el drawer de conversaciones está abierto, actualizar
            if (this.isChatDrawerOpen) {
                store.dispatch(updateConversationOnNewMessage(message));
            }
        });

        this.socket.on('message_error', (error) => {
            enqueueSnackbar(`Error en el chat: ${error}`, typeError);
        });

        this.socket.on('message_read', (data) => {
            store.dispatch({
                type: 'chat/setMessageRead',
                payload: {
                    messageId: data.messageId,
                    readAt: data.readAt
                }
            });
        });

        this.socket.on('messages_read', (data) => {
            store.dispatch({
                type: 'chat/setMessagesRead',
                payload: data.messageIds
            });

            // También podrías actualizar el estado de las conversaciones si es necesario
            store.dispatch({
                type: 'chat/updateConversationOnMessageRead',
                payload: {
                    messageIds: data.messageIds,
                    readAt: data.readAt
                }
            });
        });

        this.socket.on('contact_viewing_chat', (data) => {
            store.dispatch({
                type: 'chat/setContactViewingStatus',
                payload: {
                    userId: data.userId,
                    isViewing: data.isViewing
                }
            });
        });

        this.socket.on('new_notification', (notification) => {
            store.dispatch({
                type: 'notifications/addNotification',
                payload: notification
            });

            // Mostrar notificación emergente si no está en la página de notificaciones
            if (window.location.pathname !== '/notifications') {
                enqueueSnackbar(notification.data.message, {
                    variant: 'info',
                    persist: false,
                    // Puedes personalizar más aquí
                });
            }
        });

        this.socket.on('notification_count', (count) => {
            store.dispatch({
                type: 'notifications/setUnreadCount',
                payload: count
            });
        });
    }

    acceptChatRequest(messageId) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('No hay conexión con el servidor'));
                return;
            }

            this.socket.emit('accept_chat_request', { messageId }, (response) => {
                if (response?.success) {
                    resolve(response.message);
                } else {
                    reject(new Error(response?.error || 'Error al aceptar solicitud'));
                }
            });
        });
    }

    sendPrivateMessage(receiverId, content, read) {
        if (!this.isConnected) {
            console.error('No hay conexión con el servidor de sockets');
            return false;
        }

        return new Promise((resolve, reject) => {
            this.socket.emit('private_message', {
                receiver: receiverId,
                content: content,
                read: read,
            }, (response) => {
                if (response.success) {
                    resolve(response.message); // Devuelve el mensaje confirmado
                } else {
                    reject(new Error(response.error || "Error al enviar mensaje"));
                }
            });
        });
    }

    joinUserRoom(userId) {
        if (this.isConnected && this.socket) {
            this.socket.emit('join_private_chat', userId);
        }
    }

    markMessagesAsRead(messageIds) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                console.error('Socket no conectado al intentar marcar como leído');
                reject(new Error('No hay conexión con el servidor'));
                return;
            }

            console.log('Enviando mensajes para marcar como leído:', messageIds);
            this.socket.emit('mark_as_read', { messageIds }, (response) => {
                if (response?.success) {
                    console.log('Mensajes marcados como leídos con éxito:', messageIds);
                    resolve(response);
                } else {
                    console.error('Error al marcar como leído:', response?.error);
                    reject(new Error(response?.error || 'Error al marcar como leído'));
                }
            });
        });
    }

    notifyViewingChat(contactId) {
        if (this.isConnected && contactId) {
            this.socket.emit('user_viewing_chat', { contactId });
        }
    }

    notifyLeftChat() {
        if (this.isConnected) {
            this.socket.emit('user_left_chat');
        }
    }

    manualDisconnect(reason = 'logout') {
        if (this.isConnected && this.socket) {
            this.socket.emit('manual_disconnect', { reason });
            this.disconnect();
        }
    }

    getUserStatus(userId) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('No hay conexión con el servidor'));
                return;
            }

            this.socket.emit('get_user_status', userId, (response) => {
                if (response?.success) {
                    resolve(response.status);
                } else {
                    reject(new Error(response?.error || 'Error al obtener estado'));
                }
            });
        });
    }

    // Método para obtener usuarios online
    getOnlineUsers() {
        return new Promise((resolve) => {
            if (this.isConnected) {
                this.socket.emit('get_online_users', (onlineUsers) => {
                    // Crear objeto de estado { userId: true }
                    const onlineStatus = {};
                    onlineUsers.forEach(userId => onlineStatus[userId] = true);

                    // Dispatch con type
                    store.dispatch({
                        type: 'socket/updateOnlineUsers',
                        payload: onlineStatus
                    });

                    resolve(onlineUsers);
                });
            } else {
                resolve([]);
            }
        });
    }

    // Método para obtener el conteo de notificaciones no leídas
    getUnreadNotificationCount() {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('No hay conexión con el servidor'));
                return;
            }

            this.socket.emit('get_unread_notification_count', (response) => {
                if (response?.success) {
                    resolve(response.count);
                } else {
                    reject(new Error(response?.error || 'Error al obtener conteo'));
                }
            });
        });
    }


    // Método para obtener el conteo inicial
    getInitialNotificationCount() {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('Socket no conectado'));
                return;
            }

            this.socket.emit('get_unread_notification_count', (response) => {
                if (response?.success) {
                    resolve(response.count);
                } else {
                    reject(new Error(response?.error || 'Error al obtener conteo'));
                }
            });
        });
    }
}

const socketService = new SocketService();

export default socketService;