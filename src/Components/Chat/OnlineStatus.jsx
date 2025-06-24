// import { useSelector } from 'react-redux';

// export default function OnlineStatus({ userId }) {
//     const onlineStatus = useSelector(state => state.chat.onlineStatus[userId]);

//     return (
//         <div className="flex items-center gap-1">
//             <span className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             <span className="text-xs text-gray-600">
//                 {onlineStatus ? 'En línea' : 'Desconectado'}
//             </span>
//         </div>
//     );
// }

// En OnlineStatus.jsx
// import { useSelector } from 'react-redux';
// import { formatDistanceToNow } from 'date-fns';
// import { es } from 'date-fns/locale';

// export default function OnlineStatus({ userId }) {
//     const status = useSelector(state => state.chat.onlineStatus[userId]);

//     if (!status) {
//         // Si no tenemos información, asumimos desconectado
//         return (
//             <div className="flex items-center gap-1">
//                 <span className="w-2 h-2 rounded-full bg-gray-400"></span>
//                 <span className="text-xs text-gray-600">Desconectado</span>
//             </div>
//         );
//     }

//     return (
//         <div className="flex items-center gap-1">
//             <span className={`w-2 h-2 rounded-full ${status.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             <span className="text-xs text-gray-600">
//                 {status.isOnline
//                     ? 'En línea'
//                     : status.lastSeen
//                         ? `Visto ${formatDistanceToNow(new Date(status.lastSeen), {
//                             addSuffix: true,
//                             locale: es
//                         })}`
//                         : 'Desconectado'}
//             </span>
//         </div>
//     );
// }

// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { formatDistanceToNow } from 'date-fns';
// import { es } from 'date-fns/locale';

// export default function OnlineStatus({ userId }) {
//     const [timeAgo, setTimeAgo] = useState('');
//     const status = useSelector(state => state.chat.onlineStatus[userId]);

//     useEffect(() => {
//         if (!status?.isOnline && status?.lastSeen) {
//             const interval = setInterval(() => {
//                 setTimeAgo(formatDistanceToNow(new Date(status.lastSeen), {
//                     addSuffix: true,
//                     locale: es
//                 }));
//             }, 60000); // Actualizar cada minuto

//             // Actualizar inmediatamente
//             setTimeAgo(formatDistanceToNow(new Date(status.lastSeen), {
//                 addSuffix: true,
//                 locale: es
//             }));

//             return () => clearInterval(interval);
//         }
//     }, [status]);

//     if (!status) {
//         return (
//             <div className="flex items-center gap-1">
//                 <span className="w-2 h-2 rounded-full bg-gray-400"></span>
//                 <span className="text-xs text-gray-600">Desconectado</span>
//             </div>
//         );
//     }

//     return (
//         <div className="flex items-center gap-1">
//             <span
//                 className={`w-2 h-2 rounded-full ${status.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                     }`}
//                 title={status.isOnline ? 'En línea' : `Visto por última vez: ${new Date(status.lastSeen).toLocaleString()}`}
//             ></span>
//             <span className="text-xs text-gray-600">
//                 {status.isOnline ? 'En línea' : timeAgo || 'Desconectado'}
//             </span>
//         </div>
//     );
// }


// En src/Components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
//     const socket = useSelector(state => state.socket);

//     useEffect(() => {
//         if (!userId || !socket.isConnected) return;

//         // Función para obtener el estado inicial
//         const fetchStatus = async () => {
//             try {
//                 const response = await fetch(`/api/users/${userId}/status`);
//                 const data = await response.json();
//                 if (data.success) {
//                     setStatus(data.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user status:', error);
//             }
//         };

//         fetchStatus();

//         // Escuchar cambios en el estado
//         const handleStatusChange = (data) => {
//             if (data.userId === userId) {
//                 setStatus(prev => ({
//                     ...prev,
//                     isOnline: data.isOnline,
//                     lastSeen: data.isOnline ? null : new Date()
//                 }));
//             }
//         };

//         socketService.socket.on('user_status_change', handleStatusChange);

//         return () => {
//             socketService.socket.off('user_status_change', handleStatusChange);
//         };
//     }, [userId, socket.isConnected]);

//     if (!status.isOnline && status.lastSeen) {
//         const lastSeenDate = new Date(status.lastSeen);
//         const now = new Date();
//         const diffHours = Math.floor((now - lastSeenDate) / (1000 * 60 * 60));

//         let lastSeenText = '';
//         if (diffHours < 1) {
//             lastSeenText = 'Recientemente';
//         } else if (diffHours < 24) {
//             lastSeenText = `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
//         } else {
//             const diffDays = Math.floor(diffHours / 24);
//             lastSeenText = `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
//         }

//         return (
//             <span className="text-xs font-barlow-semi-condensed text-gray-500">
//                 {lastSeenText}
//             </span>
//         );
//     }

//     return (
//         <div className="flex items-center gap-1">
//             <span className="w-2 h-2 rounded-full bg-green-500"></span>
//             <span className="text-xs font-barlow-semi-condensed text-green-500">
//                 En línea
//             </span>
//         </div>
//     );
// }


// // En src/Components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
//     const socket = useSelector(state => state.socket);

//     useEffect(() => {
//         if (!userId || !socket.isConnected) return;

//         // Función para obtener el estado inicial
//         const fetchStatus = async () => {
//             try {
//                 const response = await fetch(`/api/users/${userId}/status`);
//                 const data = await response.json();
//                 if (data.success) {
//                     setStatus(data.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user status:', error);
//             }
//         };

//         fetchStatus();

//         // Escuchar cambios en el estado
//         const handleStatusChange = (data) => {
//             if (data.userId === userId) {
//                 setStatus(prev => ({
//                     ...prev,
//                     isOnline: data.isOnline,
//                     lastSeen: data.isOnline ? null : new Date()
//                 }));
//             }
//         };

//         socketService.socket.on('user_status_change', handleStatusChange);

//         return () => {
//             socketService.socket.off('user_status_change', handleStatusChange);
//         };
//     }, [userId, socket.isConnected]);

//     if (!status.isOnline && status.lastSeen) {
//         const lastSeenDate = new Date(status.lastSeen);
//         const now = new Date();
//         const diffHours = Math.floor((now - lastSeenDate) / (1000 * 60 * 60));

//         let lastSeenText = '';
//         if (diffHours < 1) {
//             lastSeenText = 'Recientemente';
//         } else if (diffHours < 24) {
//             lastSeenText = `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
//         } else {
//             const diffDays = Math.floor(diffHours / 24);
//             lastSeenText = `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
//         }

//         return (
//             <span className="text-xs font-barlow-semi-condensed text-gray-500">
//                 {lastSeenText}
//             </span>
//         );
//     }

//     return (
//         <div className="flex items-center gap-1">
//             <span className="w-2 h-2 rounded-full bg-green-500"></span>
//             <span className="text-xs font-barlow-semi-condensed text-green-500">
//                 En línea
//             </span>
//         </div>
//     );
// }


// En src/Components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const [isOnline, setIsOnline] = useState(false);

//     useEffect(() => {
//         if (!userId) return;

//         // Verificar estado inicial
//         socketService.checkUserOnline(userId).then(online => {
//             setIsOnline(online);
//         });

//         // Escuchar cambios de estado
//         const handleStatusChange = (data) => {
//             if (data.userId === userId) {
//                 setIsOnline(data.isOnline);
//             }
//         };

//         socketService.socket?.on('user_online_status', handleStatusChange);

//         return () => {
//             socketService.socket?.off('user_online_status', handleStatusChange);
//         };
//     }, [userId]);

//     return (
//         <p className="text-xs font-barlow-semi-condensed">
//             {isOnline ? (
//                 <span className="text-verdeD">En línea</span>
//             ) : (
//                 <span className="text-gray-500">Desconectado</span>
//             )}
//         </p>
//     );
// }


// En src/components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const onlineStatus = useSelector(state => state.chat.onlineStatus[userId]);
//     const [isOnline, setIsOnline] = useState(false);

//     useEffect(() => {
//         const checkStatus = async () => {
//             const status = await socketService.checkUserOnlineStatus(userId);
//             setIsOnline(status);
//         };

//         checkStatus();
//     }, [userId, onlineStatus]);

//     return (
//         <div className="flex items-center gap-1">
//             <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             <span className="text-xs text-gray-500">
//                 {isOnline ? 'En línea' : 'Desconectado'}
//             </span>
//         </div>
//     );
// }

// src/Components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const [isOnline, setIsOnline] = useState(false);

//     useEffect(() => {
//         const handleOnlineStatus = (data) => {
//             if (data.userId === userId) {
//                 setIsOnline(data.isOnline);
//             }
//         };

//         // Escuchar eventos de cambio de estado
//         socketService.socket?.on('user_online_status', handleOnlineStatus);

//         // Verificar estado inicial (opcional, podrías necesitar una API para esto)
//         // socketService.socket?.emit('check_online_status', userId, (isOnline) => {
//         //   setIsOnline(isOnline);
//         // });

//         return () => {
//             socketService.socket?.off('user_online_status', handleOnlineStatus);
//         };
//     }, [userId]);

//     return (
//         <div className="flex items-center gap-1">
//             <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             <span className="text-xs text-gray-500">
//                 {isOnline ? 'En línea' : 'Desconectado'}
//             </span>
//         </div>
//     );
// }


// components/Chat/OnlineStatus.jsx
// import { useEffect, useState } from 'react';
// import socketService from '../../services/socket.service';

// export default function OnlineStatus({ userId }) {
//     const [status, setStatus] = useState({ isOnline: false, lastSeen: null });

//     useEffect(() => {
//         // Escuchar actualizaciones de estado
//         const handleStatusUpdate = (data) => {
//             if (data.userId === userId) {
//                 setStatus({
//                     isOnline: data.isOnline,
//                     lastSeen: data.lastSeen
//                 });
//             }
//         };

//         // Obtener estado inicial
//         socketService.socket?.emit('get_user_status', userId, (response) => {
//             if (response.success) {
//                 setStatus(response.status);
//             }
//         });

//         // Configurar listener
//         socketService.socket?.on('user_online_status', handleStatusUpdate);

//         return () => {
//             socketService.socket?.off('user_online_status', handleStatusUpdate);
//         };
//     }, [userId]);

//     const formatLastSeen = (date) => {
//         if (!date) return '';
//         const now = new Date();
//         const diff = now - new Date(date);

//         if (diff < 60000) return 'Hace unos segundos';
//         if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
//         if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
//         return `Hace ${Math.floor(diff / 86400000)} días`;
//     };

//     return (
//         <div className="text-xs font-barlow-semi-condensed">
//             {status.isOnline ? (
//                 <span className="text-verdeD">En línea</span>
//             ) : (
//                 <span className="text-gray-500">
//                     {status.lastSeen ? `Visto ${formatLastSeen(status.lastSeen)}` : 'Desconectado'}
//                 </span>
//             )}
//         </div>
//     );
// }

// import { useEffect, useState } from 'react';
// import socketService from '../../services/socket.service';
// import { formatDistanceToNow } from 'date-fns';
// import es from 'date-fns/locale/es';

// export default function OnlineStatus({ userId }) {
//     const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!userId) return;

//         const fetchStatus = async () => {
//             try {
//                 // Consultar estado en tiempo real
//                 const onlineResponse = await new Promise(resolve => {
//                     socketService.socket.emit('check_user_online', userId, resolve);
//                 });

//                 // Si no está online, obtener última conexión
//                 let lastSeen = null;
//                 if (!onlineResponse.isOnline) {
//                     const seenResponse = await new Promise(resolve => {
//                         socketService.socket.emit('get_last_seen', userId, resolve);
//                     });
//                     lastSeen = seenResponse.lastSeen;
//                 }

//                 setStatus({
//                     isOnline: onlineResponse.isOnline,
//                     lastSeen
//                 });
//             } catch (error) {
//                 console.error('Error fetching status:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStatus();

//         // Escuchar cambios en tiempo real
//         const handleStatusChange = (data) => {
//             if (data.userId === userId) {
//                 setStatus(prev => ({
//                     isOnline: data.isOnline,
//                     lastSeen: data.isOnline ? null : new Date()
//                 }));
//             }
//         };

//         socketService.socket.on('user_status_change', handleStatusChange);

//         return () => {
//             // if (!socketService.socket) return;
//             socketService.socket?.off('user_status_change', handleStatusChange);
//         };
//     }, [userId]);

//     if (loading) return null;

//     return (
//         <div className="text-xs font-barlow-semi-condensed">
//             {status.isOnline ? (
//                 <span className="text-green-500">En línea</span>
//             ) : status.lastSeen ? (
//                 <span>
//                     {/* Visto {formatDistanceToNow(new Date(status.lastSeen), { */}
//                     Visto {formatDistanceToNow(new Date(status.lastSeen), {
//                         addSuffix: true,
//                         locale: es
//                     })}
//                 </span>
//             ) : (
//                 <span>Desconectado</span>
//             )}
//         </div>
//     );
// }


// import { useEffect, useState } from 'react';
// import socketService from '../../services/socket.service';
// import { formatDistanceToNow, format, isToday, isYesterday, isThisYear } from 'date-fns';
// import { es } from 'date-fns/locale';

// export default function OnlineStatus({ userId }) {
//     const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!userId) return;

//         const fetchStatus = async () => {
//             try {
//                 // Consultar estado en tiempo real
//                 const onlineResponse = await new Promise(resolve => {
//                     socketService.socket.emit('check_user_online', userId, resolve);
//                 });

//                 // Si no está online, obtener última conexión
//                 let lastSeen = null;
//                 if (!onlineResponse.isOnline) {
//                     const seenResponse = await new Promise(resolve => {
//                         socketService.socket.emit('get_last_seen', userId, resolve);
//                     });
//                     lastSeen = seenResponse.lastSeen;
//                 }

//                 setStatus({
//                     isOnline: onlineResponse.isOnline,
//                     lastSeen
//                 });
//             } catch (error) {
//                 console.error('Error fetching status:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStatus();

//         // Escuchar cambios en tiempo real
//         const handleStatusChange = (data) => {
//             if (data.userId === userId) {
//                 setStatus(prev => ({
//                     isOnline: data.isOnline,
//                     lastSeen: data.isOnline ? null : new Date()
//                 }));
//             }
//         };

//         socketService.socket.on('user_status_change', handleStatusChange);

//         return () => {
//             socketService.socket?.off('user_status_change', handleStatusChange);
//         };
//     }, [userId]);

//     const formatLastSeen = (date) => {
//         if (!date) return 'Desconectado';

//         const lastSeenDate = new Date(date);

//         // Si fue hoy
//         if (isToday(lastSeenDate)) {
//             return `Última vez hoy a las ${format(lastSeenDate, 'HH:mm', { locale: es })}`;
//         }

//         // Si fue ayer
//         if (isYesterday(lastSeenDate)) {
//             return `Última vez ayer a las ${format(lastSeenDate, 'HH:mm', { locale: es })}`;
//         }

//         // Si fue este año
//         if (isThisYear(lastSeenDate)) {
//             return `Última vez el ${format(lastSeenDate, 'd MMMM', { locale: es })}`;
//         }

//         // Más de un año
//         return `Última vez el ${format(lastSeenDate, 'd MMMM yyyy', { locale: es })}`;
//     };

//     if (loading) {
//         return (
//             <div className="text-xs font-barlow-semi-condensed text-gray-400">
//                 Cargando...
//             </div>
//         );
//     }

//     return (
//         <div className="text-xs font-barlow-semi-condensed">
//             {status.isOnline ? (
//                 <div className="flex items-center gap-1">
//                     <span className="text-verdeB">En línea</span>
//                 </div>
//             ) : (
//                 <span className="text-gray-500">
//                     {formatLastSeen(status.lastSeen)}
//                 </span>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import socketService from '../../services/socket.service';
import { format, isToday, isYesterday, isThisYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader } from '../Loader';

export default function OnlineStatus({ userId }) {
    const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchStatus = async () => {
            try {
                // Consultar estado en tiempo real
                const onlineResponse = await new Promise(resolve => {
                    socketService.socket.emit('check_user_online', userId, resolve);
                });

                // Si no está online, obtener última conexión
                let lastSeen = null;
                if (!onlineResponse.isOnline) {
                    const seenResponse = await new Promise(resolve => {
                        socketService.socket.emit('get_last_seen', userId, resolve);
                    });
                    lastSeen = seenResponse.lastSeen;
                }

                setStatus({
                    isOnline: onlineResponse.isOnline,
                    lastSeen
                });
            } catch (error) {
                console.error('Error fetching status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();

        // Escuchar cambios en tiempo real
        const handleStatusChange = (data) => {
            if (data.userId === userId) {
                setStatus(prev => ({
                    isOnline: data.isOnline,
                    lastSeen: data.isOnline ? null : new Date()
                }));
            }
        };

        socketService.socket.on('user_status_change', handleStatusChange);

        return () => {
            socketService.socket?.off('user_status_change', handleStatusChange);
        };
    }, [userId]);

    const formatLastSeen = (date) => {
        if (!date) return 'Desconectado';

        const lastSeenDate = new Date(date);

        // Si fue hoy
        if (isToday(lastSeenDate)) {
            return `Últ. vez hoy a las ${format(lastSeenDate, 'h:mm a', { locale: es })}`;
        }

        // Si fue ayer
        if (isYesterday(lastSeenDate)) {
            return `Últ. vez ayer a las ${format(lastSeenDate, 'h:mm a', { locale: es })}`;
        }

        // Si fue este año
        if (isThisYear(lastSeenDate)) {
            return `Últ. vez ${format(lastSeenDate, 'd MMMM', { locale: es })}`;
        }

        // Más de un año
        return `Últ. vez ${format(lastSeenDate, 'd MMMM yyyy', { locale: es })}`;
    };

    if (loading) {
        return (
            <div className="text-xs font-barlow-semi-condensed text-gray-400">
                <Loader />
            </div>
        );
    }

    return (
        <div className="text-xs font-barlow-semi-condensed">
            {status.isOnline ? (
                <div className="flex items-center gap-1">
                    <span className="text-verdeB">En línea</span>
                </div>
            ) : (
                <span className="text-gray-500">
                    {formatLastSeen(status.lastSeen)}
                </span>
            )}
        </div>
    );
}