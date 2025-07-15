import { useEffect, useState } from 'react';
import socketService from '../../services/socket/socket.service';
import { formatLastSeen } from '../../utils/dateUtils';
import logger from '../../utils/logger';

export default function OnlineStatus({ userId }) {
    const [status, setStatus] = useState({ isOnline: false, lastSeen: null });

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
                logger.error('Error fetching status:', error);
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
        return formatLastSeen(date);
    };

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