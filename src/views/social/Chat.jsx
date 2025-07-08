import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowLeft, BsThreeDotsVertical, BsEmojiSmile, BsPaperclip, BsSend, } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { enqueueSnackbar } from "notistack";
import { throttle } from 'lodash';
import { typeError } from "../../models/alertModels";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import Message from "../../Components/Chat/Message";
import OnlineStatus from "../../Components/Chat/OnlineStatus";
import { getProfile } from "../../services/users/usersService";
import { getMessages, sendMessage } from "../../services/chat/chatService";
import socketService from "../../services/socket/socket.service";
import { setCurrentChat, addMessage, setMessagesRead, setMessageRead, updateMessages, removeMessage, replaceTempMessage, resetChat } from "../../features/chat/chatSlice";
import { markMessagesAsRead } from "../../services/chat/chatService";
import { formatDateHeader, groupMessagesByDate } from '../../utils/dateUtils';
import useIsMobile from "../../hooks/useIsMobile";
import { Loader } from "../../Components/Loader";

export default function Chat() {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const chat = useSelector((state) => state.chat);
    const { messages } = useSelector(state => state.chat);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const textareaRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const emojiButtonRef = useRef(null);
    const emojiPickerRef = useRef(null);

    // Nuevo estado para detectar si es un dispositivo móvil
    const isMobile = useIsMobile();

    const userAgent = navigator.userAgent || window.opera;
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    const isDesktop = !isMobileUserAgent;

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const messagesContainerRef = useRef(null);
    const lastScrollTopRef = useRef(0);
    // Nuevo estado para indicar si ya se hizo el scroll inicial al final
    const [initialScrollDone, setInitialScrollDone] = useState(false);

    // NUEVOS ESTADOS Y REFS PARA LA FECHA FLOTANTE
    const [floatingDate, setFloatingDate] = useState(null); // La fecha que se mostrará
    const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false); // Controla la visibilidad
    const dateRefs = useRef({}); // Objeto para almacenar las refs de cada cabecera de fecha

    // Altura del header superior del chat (ajusta si es necesario)
    const chatHeaderHeight = 64; // Altura del div con clase "flex items-center justify-between p-4 border-b-2 border-verdeD bg-Gris"

    const groupedMessages = groupMessagesByDate(chat.messages);

    // Función para scroll al final al enviar mensajes
    const scrollToBottomOnSend = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []);

    // Función para obtener/crear refs para los encabezados de fecha
    // No necesita ser useCallback si su lógica es simple y solo crea un objeto.
    const getDateRef = useCallback((dateKey) => {
        if (!dateRefs.current[dateKey]) {
            dateRefs.current[dateKey] = { current: null };
        }
        return dateRefs.current[dateKey];
    }, []);


    const loadMoreMessages = useCallback(async () => {
        if (loadingMore || !hasMore || !user) return;

        setLoadingMore(true);
        try {
            const container = messagesContainerRef.current;
            if (!container) return;

            const oldScrollHeight = container.scrollHeight;

            const nextPage = page + 1;
            const result = await dispatch(getMessages({ userId: user.userId, page: nextPage })).unwrap();

            setPage(nextPage);
            setHasMore(result.hasMore);

            requestAnimationFrame(() => {
                if (messagesContainerRef.current) {
                    const newScrollHeight = messagesContainerRef.current.scrollHeight;
                    const heightDifference = newScrollHeight - oldScrollHeight;
                    messagesContainerRef.current.scrollTop = heightDifference + lastScrollTopRef.current;
                }
            });

        } catch (error) {
            enqueueSnackbar('Error cargando mensajes anteriores', typeError);
        } finally {
            setLoadingMore(false);
        }
    }, [page, loadingMore, hasMore, user, dispatch]);


    // Efecto para manejar el scroll para cargar más mensajes antiguos y mostrar/ocultar fecha flotante
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        let scrollTimeout; // Para detectar el final del scroll

        const handleScroll = throttle(() => {
            // Lógica para cargar más mensajes
            if (!initialScrollDone && container.scrollTop > 0) {
                setInitialScrollDone(true);
            }

            lastScrollTopRef.current = container.scrollTop;
            const scrollThreshold = 10;

            if (container.scrollTop < scrollThreshold && !loadingMore && hasMore && initialScrollDone) {
                console.log('¡Disparando loadMoreMessages por scroll al tope!');
                loadMoreMessages();
            }

            // Lógica para mostrar/ocultar la fecha flotante
            setShowHeaderOnScroll(true); // Mostrar el encabezado al detectar scroll

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setShowHeaderOnScroll(false); // Ocultar después de un breve tiempo sin scroll
            }, 500); // 500ms sin scroll para ocultar
        }, 100); // Throttling para el scroll

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout); // Limpiar timeout al desmontar
        };
    }, [loadMoreMessages, loadingMore, hasMore, initialScrollDone]);


    // Efecto para la carga inicial del chat
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!username || !auth.id) return;
                setLoading(true);

                const profileResult = await dispatch(getProfile({ username })).unwrap();

                const userData = {
                    userId: profileResult.profile.user.id,
                    username: profileResult.profile.user.username,
                    nombreCompleto: profileResult.profile.nombreCompleto,
                    degree: profileResult.profile.degree,
                    profilePicture: {
                        url: profileResult.profile.user.profilePicture?.url || null
                    }
                };
                setUser(userData);

                dispatch(setCurrentChat({
                    userId: userData.userId,
                    username: userData.username,
                    name: `${userData.nombreCompleto}`
                }));

                // Cargar la primera página de mensajes
                await dispatch(getMessages({ userId: userData.userId, page: 1 }));

                // Desplazar al final *después* de que los mensajes iniciales se hayan renderizado
                // y marcar que el scroll inicial ya se hizo.
                requestAnimationFrame(() => {
                    if (messagesContainerRef.current) {
                        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                        setInitialScrollDone(true); // Marca que el scroll inicial ya está hecho
                    }
                });
            } catch (error) {
                console.error("Error en fetchData:", error);
                enqueueSnackbar(error.message, typeError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            dispatch(resetChat());
        };
    }, [username, dispatch, navigate, auth.id]);

    // Efecto para manejar el scroll para cargar más mensajes antiguos y mostrar/ocultar fecha flotante
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        let scrollTimeout; // Para detectar el final del scroll

        const handleScroll = throttle(() => {
            // Lógica para cargar más mensajes
            if (!initialScrollDone && container.scrollTop > 0) {
                setInitialScrollDone(true);
            }

            lastScrollTopRef.current = container.scrollTop;
            const scrollThreshold = 10;

            if (container.scrollTop < scrollThreshold && !loadingMore && hasMore && initialScrollDone) {
                console.log('¡Disparando loadMoreMessages por scroll al tope!');
                loadMoreMessages();
            }

            // Lógica para mostrar/ocultar la fecha flotante
            setShowHeaderOnScroll(true); // Mostrar el encabezado al detectar scroll

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setShowHeaderOnScroll(false); // Ocultar después de un breve tiempo sin scroll
            }, 500); // 500ms sin scroll para ocultar
        }, 100); // Throttling para el scroll

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout); // Limpiar timeout al desmontar
        };
    }, [loadMoreMessages, loadingMore, hasMore, initialScrollDone]);

    // Efecto para notificar cuando el usuario está viendo el chat
    useEffect(() => {
        if (!user?.userId || !auth.id) return;

        // Notificar que estamos viendo este chat
        socketService.notifyViewingChat(user.userId);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                socketService.notifyViewingChat(user.userId);
            } else {
                socketService.notifyLeftChat();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            socketService.notifyLeftChat();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user, auth.id]);

    // Efecto para manejar el estado "leído" correctamente
    useEffect(() => {
        if (!user || !auth.id) return;
        // Marcar mensajes como leídos cuando:
        // 1. El chat está visible
        // 2. Los mensajes son del otro usuario
        // 3. No están marcados como leídos
        const unreadMessages = messages.filter(
            msg => !msg.read && msg.sender?.id === user.userId
        );

        if (unreadMessages.length > 0) {
            const unreadIds = unreadMessages.map(msg => msg.id);

            // Enviar al servidor
            socketService.markMessagesAsRead(unreadIds)
                .catch(err => {
                    console.error('Error marcando como leído:', err);
                    // Revertir si falla
                    dispatch(setMessagesRead(unreadIds.map(id => ({ id, read: false }))));
                });
        }
    }, [messages, user, auth.id, dispatch]);

    const handleMarkAsRead = useCallback((messageIds) => {
        dispatch(markMessagesAsRead(messageIds));
    }, [dispatch]);

    // Ajusta la altura del textarea dinámicamente
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const maxHeight = 120;
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

            if (textarea.scrollHeight > maxHeight) {
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }
        }
    }, [message]);

    // Efecto para cerrar el selector de emojis
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
                emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
        textareaRef.current.focus();
    };

    const handleEmojiButtonClick = () => {
        setShowEmojiPicker(prev => !prev);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && isDesktop) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        const unreadIds = messages
            .filter(msg => !msg.read && msg.sender?.id !== auth.id)
            .map(msg => msg.id);

        if (unreadIds.length > 0) {
            handleMarkAsRead(unreadIds);
        }
    }, [messages, auth.id, handleMarkAsRead]);

    const handleSendMessage = async () => {
        if (message.trim() === "") {
            enqueueSnackbar("No puedes enviar un mensaje vacío", typeError);
            return;
        }

        try {
            const tempId = Date.now().toString();
            const tempMessage = {
                id: tempId,
                sender: {
                    id: auth.id,
                    username: auth.username,
                    nombreCompleto: auth.nombreCompleto,
                },
                content: message,
                createdAt: new Date().toISOString(),
                isTemp: true
            };

            dispatch(addMessage(tempMessage));
            setMessage("");
            scrollToBottomOnSend(); // Scroll al enviar

            const resultAction = await dispatch(sendMessage({
                receiverId: user.userId,
                content: message,
                read: chat.contactViewingStatus[user.userId]
            }));

            if (sendMessage.fulfilled.match(resultAction)) {
                dispatch(replaceTempMessage({
                    tempId,
                    realMessage: resultAction.payload
                }));
                scrollToBottomOnSend(); // Volver a scrollar al final si es necesario
            } else {
                throw new Error(resultAction.error.message);
            }

        } catch (error) {
            console.error("Error enviando mensaje:", error);
            enqueueSnackbar(error.message, typeError);
        }
    };

    if (loading || !user) {
        return (
            <>
                {!isMobile && (
                    <>
                        <Header />
                        <div className="h-[10.5vh]"></div>
                    </>
                )}
                <main className="flex relative">
                    {!isMobile && (
                        <Nav />
                    )}
                    <div className={`w-full ${isMobile ? 'h-[100vh]' : 'h-[89.5vh]'} flex items-center justify-center`}>
                        <div className="flex items-center justify-center w-full">
                            <p className="font-barolw"><Loader /></p>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            {!isMobile && (
                <>
                    <Header />
                    <div className="h-[10.5vh]"></div>
                </>
            )}

            <main className="flex relative">
                {!isMobile && (
                    <Nav />
                )}

                <div className={`w-full ${isMobile ? 'h-[100vh]' : 'h-[89.5vh]'} flex flex-col`}>

                    {/* Header del chat */}
                    <div className="flex items-center justify-between p-4 border-b-2 border-verdeD bg-Gris">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-verdeD hover:text-RojoC transition-colors duration-200"
                            >
                                <BsArrowLeft className="text-xl" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {user.profilePicture.url ? (
                                        <img
                                            src={user.profilePicture.url}
                                            alt={`${user.nombreCompleto}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-bold">
                                            {user?.nombreCompleto?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-barolw font-semibold text-Negro text-sm">
                                        {user?.nombreCompleto}
                                    </h3>
                                    <p className="text-xs font-barlow-semi-condensed text-verdeD">
                                        @{user?.username}
                                    </p>
                                    <OnlineStatus userId={user?.userId} />
                                </div>
                            </div>
                        </div>
                        {/* <button className="text-verdeD hover:text-RojoC transition-colors duration-200">
                            <BsThreeDotsVertical className="text-xl" />
                        </button> */}
                    </div>

                    {/* Contenedor de la fecha flotante */}
                    {/* Se muestra solo si hay floatingDate Y showHeaderOnScroll es true */}
                    {floatingDate && showHeaderOnScroll && (
                        <div className="absolute w-full flex justify-center py-2 z-10 pointer-events-none"
                            style={{ top: `${chatHeaderHeight + 10.5 * window.innerHeight / 100}px` }}>
                            <div className="bg-Gris/80 backdrop-blur-sm text-Negro/70 text-xs font-medium px-3 py-1 rounded-full shadow-md">
                                {formatDateHeader(floatingDate)}
                            </div>
                        </div>
                    )}


                    {/* Área de mensajes */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 p-4 overflow-y-auto bg-Blanco"
                    >
                        {/* Botón de prueba para cargar más mensajes */}
                        {/* {hasMore && !loadingMore && (
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={loadMoreMessages}
                                    className="bg-verdeA hover:bg-verdeD text-white text-sm px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? 'Cargando...' : 'Ver más mensajes'}
                                </button>
                            </div>
                        )} */}

                        {loadingMore && (
                            <div className="flex justify-center py-2">
                                <p className="text-sm text-gray-500">Cargando mensajes anteriores...</p>
                            </div>
                        )}

                        {/* si no hay mensajes */}
                        {groupedMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <p className="text-lg font-bold text-verdeA text-center">
                                    ¡Inicia una conversación con {user?.nombreCompleto}!
                                </p>
                            </div>
                        )}

                        {groupedMessages.map((group) => {
                            const dateKey = new Date(group.date).toISOString().split('T')[0];
                            return (
                                <div key={group.date} className="mb-4">
                                    <div
                                        ref={getDateRef(dateKey)} // Asignar la ref aquí
                                        id={dateKey} // Asignar un ID para el IntersectionObserver
                                        className="flex items-center justify-center my-4"
                                    >
                                        <div className="bg-Gris/50 text-Negro/70 text-xs font-medium px-3 py-1 rounded-full">
                                            {formatDateHeader(group.date)}
                                        </div>
                                    </div>

                                    {group.messages.map((msg) => {
                                        const isOwn = msg.sender?.id === auth.id;
                                        return (
                                            <Message
                                                key={msg.id}
                                                message={{
                                                    ...msg,
                                                    sender: {
                                                        ...msg.sender,
                                                        nombreCompleto: msg.sender?.nombreCompleto || user?.nombreCompleto,
                                                        username: msg.sender?.username,
                                                        profilePicture: msg.sender?.profilePicture || {
                                                            url: null
                                                        }
                                                    }
                                                }}
                                                isOwn={isOwn}
                                                markMessagesAsRead={handleMarkAsRead}
                                            />
                                        );
                                    })}
                                </div>
                            )
                        })
                        }
                    </div >

                    {/* Contenedor principal de la barra de mensaje */}
                    < div className="p-4 border-t-2 border-verdeD bg-Gris" >
                        <div className="flex items-end gap-2">
                            <button
                                ref={emojiButtonRef}
                                onClick={handleEmojiButtonClick}
                                className="text-verdeD hover:text-RojoC transition-colors duration-200 p-2 rounded-full">
                                <BsEmojiSmile className="text-xl"
                                />
                            </button>
                            <div className="flex-1 min-h-[40px] flex items-end">
                                <textarea
                                    ref={textareaRef}
                                    value={message}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe un mensaje..."
                                    rows={1}
                                    className="w-full h-full p-2 text-Negro font-barolw text-sm resize-none
                                   bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
                                    style={{ overflowY: 'hidden' }}
                                />
                            </div>

                            <button
                                onClick={handleSendMessage}
                                disabled={message.trim() === ""}
                                className="bg-verdeA hover:bg-verdeD text-white align-center p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <IoSend className="text-xl" />
                            </button>
                        </div>
                    </div >

                    {/* Selector de Emojis */}
                    {showEmojiPicker && (
                        <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-50 shadow-lg rounded-lg overflow-hidden">
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                height={350}
                                width="100%"
                                skinTonePickerLocation="PREVIEW"
                                searchDisabled={false}
                                lazyLoadEmojis={true}
                                theme="light"
                                emojiStyle="native"
                            />
                        </div>
                    )}
                </div >
            </main >
        </>
    );
}