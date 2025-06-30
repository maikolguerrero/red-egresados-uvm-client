import { useState, useRef, useEffect } from 'react';
import {
    BsThreeDotsVertical,
    BsCheck,
    BsCheckAll,
    BsReply,
    BsTrash,
    BsCopy
} from 'react-icons/bs';
import { enqueueSnackbar } from 'notistack';
import { typeSuccess } from '../../models/alertModels';
import { formatTimeOnly } from '../../utils/dateUtils';

export default function Message({ message, isOwn, markMessagesAsRead }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isRead, setIsRead] = useState(message.read);
    const [isVisible, setIsVisible] = useState(false);
    const messageRef = useRef();

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Observar visibilidad del mensaje
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (messageRef.current) {
            observer.observe(messageRef.current);
        }

        return () => {
            if (messageRef.current) {
                observer.unobserve(messageRef.current);
            }
        };
    }, []);

    // Marcar como leído cuando sea visible y no sea propio
    useEffect(() => {
        if (isVisible && !isOwn && !isRead) {
            setIsRead(true);
            markMessagesAsRead([message.id])
                .catch(err => setIsRead(false));
        }
    }, [isVisible, isOwn, isRead, message.id, markMessagesAsRead]);

    // Sincronizar con cambios externos
    useEffect(() => {
        setIsRead(message.read);
    }, [message.read]);

    // Renderizar el estado de lectura
    const renderStatus = () => {
        if (!isOwn) return null;

        return isRead ? (
            <span className="flex items-center gap-0.5 text-lg font-medium text-blue-400 whitespace-nowrap">
                <BsCheckAll />
            </span>
        ) : (
            <span className="text-lg font-medium text-gray-400 whitespace-nowrap">
                <BsCheck />
            </span>
        );
    };

    // Función para obtener las iniciales del remitente
    const getInitials = () => {
        if (message.sender?.firstName && message.sender?.lastName) {
            return `${message.sender.firstName.charAt(0)}${message.sender.lastName.charAt(0)}`;
        }
        return message.sender?.username?.charAt(0) || 'U';
    };


    // Función para copiar el contenido del mensaje
    const handleCopy = async () => { // Hacemos la función asíncrona
        if (!navigator.clipboard) {
            // Fallback para navegadores antiguos o contextos no seguros
            enqueueSnackbar("Tu navegador no soporta la función de copiado.", { variant: 'error' });
            setMenuOpen(false);
            return;
        }
        try {
            await navigator.clipboard.writeText(message.content);
            enqueueSnackbar("Mensaje copiado", typeSuccess);
        } catch (err) {
            console.error('Error al copiar el texto: ', err);
            enqueueSnackbar("Error al copiar el mensaje.", { variant: 'error' });
        } finally {
            setMenuOpen(false); // Cerrar el menú siempre, incluso si falla
        }
    };

    return (
        <div className={`flex items-start gap-2 mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            {/* Avatar (solo para mensajes recibidos) */}
            {/* {!isOwn && (
                <div className="w-8 h-8 rounded-full bg-verdeA flex items-center justify-center overflow-hidden shrink-0">
                    {message.sender.profilePicture?.url ? (
                        <img
                            src={message.sender.profilePicture.url}
                            alt={`${message.sender.firstName || message.sender.username}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white text-xs font-bold">
                            {getInitials()}
                        </span>
                    )}
                </div>
            )} */}

            {/* Contenedor del mensaje y menú */}
            <div className={`flex items-end gap-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                {/* Contenedor principal del mensaje */}
                <div
                    className={`flex flex-col p-3 rounded-xl break-words overflow-wrap-anywhere min-w-[120px] max-w-[65vw]  sm:max-w-[500px]
                        ${isOwn
                            ? 'bg-verdeD text-white rounded-se-none'
                            : 'bg-Gris text-Negro rounded-ss-none'
                        }`}
                >
                    {/* Cabecera con nombre (solo mensajes recibidos) */}
                    {/* {!isOwn && (
                        <span className="text-sm font-semibold text-verdeD mb-1 break-words">
                            {message.sender.firstName && message.sender.lastName
                                ? `${message.sender.firstName} ${message.sender.lastName}`
                                : message.sender.username}
                        </span>
                    )} */}

                    {/* Contenido del mensaje */}
                    <p className="text-sm font-normal whitespace-pre-wrap">
                        {message.content}
                    </p>

                    {/* Pie de mensaje - ahora en una sola línea */}
                    <div className={`flex items-center justify-end gap-2 mt-1.5 flex-wrap`}>
                        <span className="text-xs font-medium opacity-80 whitespace-nowrap">
                            {formatTimeOnly(message.createdAt)}
                        </span >
                        {renderStatus()}
                    </div >
                </div >

                {/* Botón de menú (para todos los mensajes) */}
                <div className="relative self-center mb-1" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`p-1 rounded-full transition-colors ${menuOpen
                            ? 'bg-gray-100/30'
                            : 'hover:bg-gray-100/30'
                            }`}
                        aria-label="Opciones del mensaje"
                    >
                        <BsThreeDotsVertical className={`w-4 h-4 ${isOwn ? 'text-verdeB/90' : 'text-gray-500'
                            }`} />
                    </button>

                    {/* Menú desplegable personalizado */}
                    {
                        menuOpen && (
                            <div className={`absolute w-40 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden ${isOwn ? 'right-0' : 'left-0'
                                }`}>
                                <button
                                    onClick={handleCopy}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <BsCopy className="text-gray-500" />
                                    Copiar
                                </button>
                                {/* <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <BsReply className="text-gray-500" />
                                    Responder
                                </button>
                                {isOwn && (
                                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                                        <BsTrash className="text-red-500" />
                                        Eliminar
                                    </button>
                                )} */}
                            </div>
                        )
                    }
                </div>
            </div >
        </div >
    );
}