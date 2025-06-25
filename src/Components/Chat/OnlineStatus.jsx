import { useEffect, useState } from 'react';
import socketService from '../../services/socket/socket.service';
import { format, isToday, isYesterday, isThisYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatRelativeTime } from '../../utils/dateUtils';
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

    const formatLastSeenDisplay = (date) => {
        if (!date) return 'Desconectado';

        const lastSeenDate = new Date(date); // Asegúrate de que es un objeto Date

        // Usamos formatRelativeTime con showTimeForTodayAndYesterday = true
        const formatted = formatRelativeTime(lastSeenDate, true);

        // Añadir "Últ. vez " al inicio
        // La función ya devuelve "hoy a las ..." o "ayer a las ...", así que solo añadimos "Últ. vez " si no es eso
        if (formatted.startsWith('hoy a las') || formatted.startsWith('ayer a las')) {
            return `Últ. vez ${formatted}`;
        }
        return `Últ. vez ${formatted}`;
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
                    {formatLastSeenDisplay(status.lastSeen)}
                </span >
            )
            }
        </div >
    );
}