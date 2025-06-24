// import { useEffect, useState, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { BsArrowLeft, BsThreeDotsVertical, BsEmojiSmile, BsPaperclip, BsSend, } from "react-icons/bs";
// import { IoSend } from "react-icons/io5";
// import EmojiPicker from 'emoji-picker-react';
// import { enqueueSnackbar } from "notistack";
// import { throttle } from 'lodash';
// import { typeError } from "../../models/alertModels";
// import Header from "../../Components/Header";
// import Nav from "../../Components/Nav";
// import Message from "../../Components/Chat/Message";
// // import ContactViewingStatus from "../../Components/Chat/ContactViewingStatus";
// import OnlineStatus from "../../Components/Chat/OnlineStatus";
// import { getProfile } from "../../services/users/usersService";
// import { getMessages, sendMessage } from "../../services/chatService";
// import socketService from "../../services/socket.service";
// import { setCurrentChat, addMessage, setMessagesRead, setMessageRead, updateMessages, removeMessage, replaceTempMessage, resetChat } from "../../features/chatSlice";
// import { markMessagesAsRead } from "../../services/chatService";
// import { formatDateHeader, groupMessagesByDate } from '../../utils/dateUtils';

// export default function Chat() {
//     const { username } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const auth = useSelector((state) => state.auth);
//     const chat = useSelector((state) => state.chat);
//     const { messages } = useSelector(state => state.chat);
//     const [message, setMessage] = useState("");
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const messagesEndRef = useRef(null);
//     const textareaRef = useRef(null);
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Nuevo estado para controlar la visibilidad del picker

//     // Referencia para el botón de emoji y el picker, para cerrar al hacer clic fuera
//     const emojiButtonRef = useRef(null);
//     const emojiPickerRef = useRef(null);


//     // Estados para la paginación
//     const [page, setPage] = useState(1);
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const messagesContainerRef = useRef(null);
//     const lastScrollTopRef = useRef(0); // Para guardar el scrollTop antes de la carga
//     const [initialScrollDone, setInitialScrollDone] = useState(false);



//     // Función para cargar más mensajes
//     // const loadMoreMessages = useCallback(async () => {

//     //     // if (messagesContainerRef.current.scrollTop === 0) {
//     //     //     alert(messagesContainerRef.current.scrollTop);
//     //     // }
//     //     if (loadingMore || !hasMore) return;

//     //     setLoadingMore(true);
//     //     try {
//     //         const nextPage = page + 1;
//     //         const result = await dispatch(getMessages({ userId: user.userId, page: nextPage })).unwrap();

//     //         setPage(nextPage);
//     //         setHasMore(result.hasMore);

//     //         // Mantener la posición del scroll después de cargar
//     //         if (messagesContainerRef.current) {
//     //             const { scrollHeight, scrollTop } = messagesContainerRef.current;
//     //             const prevHeight = scrollHeight;

//     //             // Usar setTimeout para asegurar que el DOM se haya actualizado
//     //             setTimeout(() => {
//     //                 if (messagesContainerRef.current) {
//     //                     messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight - prevHeight + scrollTop;
//     //                 }
//     //             }, 0);
//     //         }
//     //     } catch (error) {
//     //         enqueueSnackbar('Error cargando mensajes anteriores', typeError);
//     //     } finally {
//     //         setLoadingMore(false);
//     //     }
//     // }, [page, loadingMore, hasMore, user, dispatch]);

//     // const loadMoreMessages = useCallback(async () => {
//     //     if (loadingMore || !hasMore || !user) return; // Asegúrate de que 'user' esté definido

//     //     setLoadingMore(true);
//     //     try {
//     //         const container = messagesContainerRef.current;
//     //         if (!container) return;

//     //         // 1. Guardar la altura ANTES de cargar nuevos mensajes
//     //         // y la altura del scroll desde el "fondo" (mensajes más recientes)
//     //         const oldScrollHeight = container.scrollHeight;
//     //         // const oldScrollFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;


//     //         const nextPage = page + 1;
//     //         const result = await dispatch(getMessages({ userId: user.userId, page: nextPage })).unwrap();

//     //         setPage(nextPage);
//     //         setHasMore(result.hasMore);

//     //         // 2. Después de que React actualice el DOM con los nuevos mensajes,
//     //         // ajustamos la posición del scroll.
//     //         // Usamos requestAnimationFrame para esperar el siguiente frame de renderizado,
//     //         // que es a menudo más fiable que setTimeout(0) para manipulaciones de DOM después de la actualización de estado.
//     //         requestAnimationFrame(() => {
//     //             if (messagesContainerRef.current) {
//     //                 const newScrollHeight = messagesContainerRef.current.scrollHeight;
//     //                 // Calcula la diferencia en altura que los nuevos mensajes agregaron
//     //                 const heightDifference = newScrollHeight - oldScrollHeight;

//     //                 // Ajusta el scrollTop para compensar la nueva altura
//     //                 // Esto mantiene la posición relativa del contenido antiguo
//     //                 messagesContainerRef.current.scrollTop += heightDifference;
//     //             }
//     //         });

//     //     } catch (error) {
//     //         enqueueSnackbar('Error cargando mensajes anteriores', typeError);
//     //     } finally {
//     //         setLoadingMore(false);
//     //     }
//     // }, [page, loadingMore, hasMore, user, dispatch]); // Dependencias correctas


//     const loadMoreMessages = useCallback(async () => {
//         if (loadingMore || !hasMore || !user) return;

//         setLoadingMore(true);
//         try {
//             const container = messagesContainerRef.current;
//             if (!container) return;

//             // Guardar la altura del scroll ANTES de que los nuevos mensajes se carguen
//             const oldScrollHeight = container.scrollHeight;

//             const nextPage = page + 1;
//             const result = await dispatch(getMessages({ userId: user.userId, page: nextPage })).unwrap();

//             setPage(nextPage);
//             setHasMore(result.hasMore);

//             // Importante: Ajustar el scroll DESPUÉS de que el DOM se haya actualizado
//             // Usamos requestAnimationFrame para asegurar que el navegador ha renderizado los nuevos mensajes
//             requestAnimationFrame(() => {
//                 // if (messagesContainerRef.current) {
//                 //     const newScrollHeight = messagesContainerRef.current.scrollHeight;
//                 //     const heightDifference = newScrollHeight - oldScrollHeight;

//                 //     // Ajustamos el scrollTop para mantener la posición.
//                 //     // Sumamos la diferencia de altura para "empujar" el scroll hacia abajo
//                 //     // y mantener el contenido visible anterior en su lugar.
//                 //     messagesContainerRef.current.scrollTop = heightDifference + lastScrollTopRef.current;
//                 //     // Opcional: Si el scroll debe ir al principio si el usuario ya estaba en el tope
//                 //     // messagesContainerRef.current.scrollTop = heightDifference; // Esto si quieres ir al principio
//                 // }

//                 if (messagesContainerRef.current) {
//                     messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//                     setInitialScrollDone(true); // <--- Marcamos que el scroll inicial ya está hecho
//                 }
//             });

//         } catch (error) {
//             enqueueSnackbar('Error cargando mensajes anteriores', typeError);
//         } finally {
//             setLoadingMore(false);
//         }
//     }, [page, loadingMore, hasMore, user, dispatch]);

//     // Efecto para manejar el scroll
//     // useEffect(() => {
//     //     const container = messagesContainerRef.current;
//     //     if (!container) return;

//     //     const handleScroll = throttle(() => {
//     //         if (container.scrollTop === 0) {
//     //            alert(container.scrollTop);

//     //         }
//     //         if (container.scrollTop < 2000 && hasMore && !loadingMore) {
//     //             loadMoreMessages();
//     //         }
//     //     }, 200);

//     //     container.addEventListener('scroll', handleScroll);
//     //     return () => container.removeEventListener('scroll', handleScroll);
//     // }, [loadMoreMessages, loadingMore, hasMore]);

//     // useEffect(() => {
//     //     const container = messagesContainerRef.current;
//     //     if (!container) return;

//     //     const handleScroll = throttle(() => {
//     //         // La condición para cargar más mensajes antiguos al scrollar hacia arriba
//     //         // es que scrollTop sea cercano al final del "espacio scrollable",
//     //         // es decir, (scrollHeight - clientHeight).
//     //         // Si el scrollTop es 0, estás al final de la conversación (mensajes recientes).
//     //         // Necesitas scrollar hacia arriba (donde scrollTop aumenta) para ver los antiguos.
//     //         // La condición debe ser (scrollHeight - scrollTop - clientHeight < UMERAL)

//     //         const scrollThreshold = 100; // Puedes ajustar este valor

//     //         // Calcula la distancia desde el "tope" (inicio de los mensajes antiguos)
//     //         // Esto es útil para contenedores con `flex-direction: column-reverse;`
//     //         const distanceFromTop = container.scrollHeight - container.scrollTop - container.clientHeight;

//     //         console.log('Scroll Top:', container.scrollTop, 'Scroll Height:', container.scrollHeight, 'Client Height:', container.clientHeight, 'Distance From Top:', distanceFromTop, 'Loading More:', loadingMore, 'Has More:', hasMore);

//     //         if (distanceFromTop < scrollThreshold && !loadingMore && hasMore) {
//     //             loadMoreMessages();
//     //         }
//     //     }, 200);

//     //     container.addEventListener('scroll', handleScroll);
//     //     return () => container.removeEventListener('scroll', handleScroll);
//     // }, [loadMoreMessages, loadingMore, hasMore]);

//     // useEffect(() => {
//     //     const container = messagesContainerRef.current;
//     //     if (!container) return;

//     //     // Utilizamos `throttle` para evitar que la función se ejecute demasiadas veces mientras el usuario hace scroll.
//     //     // Esto mejora el rendimiento.
//     //     const handleScroll = throttle(() => {
//     //         const scrollThreshold = 100; // Define cuántos píxeles antes del "tope" queremos activar la carga.
//     //         // Puedes ajustar este valor.

//     //         // Calcula la distancia desde el "tope" de los mensajes antiguos.
//     //         // Para un contenedor `flex-col-reverse`, el scrollTop 0 es el final de la conversación (mensajes más recientes).
//     //         // A medida que scrollas hacia arriba para ver mensajes antiguos, scrollTop aumenta.
//     //         // La "distancia al tope" se calcula desde la altura total, restando el scrollTop y la altura visible.
//     //         const distanceFromTop = container.scrollHeight - container.scrollTop - container.clientHeight;

//     //         // console.log para depuración:
//     //         // console.log('Scroll Top:', container.scrollTop,
//     //         //             'Scroll Height:', container.scrollHeight,
//     //         //             'Client Height:', container.clientHeight,
//     //         //             'Distance From Top:', distanceFromTop,
//     //         //             'Loading More:', loadingMore,
//     //         //             'Has More:', hasMore);

//     //         // Condición para cargar más mensajes:
//     //         // 1. La `distanceFromTop` es menor que nuestro umbral (estamos cerca del tope).
//     //         // 2. No estamos ya cargando más mensajes (`!loadingMore`).
//     //         // 3. Todavía hay más mensajes disponibles para cargar (`hasMore`).
//     //         if (distanceFromTop < scrollThreshold && !loadingMore && hasMore) {
//     //             console.log('¡Disparando loadMoreMessages por scroll!'); // Para confirmar que se activa
//     //             loadMoreMessages();
//     //         }
//     //     }, 200); // El retardo de 200ms para el throttle

//     //     // Adjuntar el event listener
//     //     container.addEventListener('scroll', handleScroll);

//     //     // Limpiar el event listener cuando el componente se desmonte o el efecto se re-ejecute
//     //     return () => container.removeEventListener('scroll', handleScroll);
//     // }, [loadMoreMessages, loadingMore, hasMore]); // Dependencias: asegúrate de que sean correctas

//     // EFECTO PARA MANEJAR EL SCROLL (CARGAR AL TOP)
//     useEffect(() => {
//         const container = messagesContainerRef.current;
//         if (!container) return;

//         const handleScroll = throttle(() => {
//             // Si el scroll inicial aún no se ha marcado como hecho,
//             // pero el usuario ya ha scrollado (es decir, scrollTop es > 0),
//             // asumimos que el scroll inicial ya se ejecutó o no es necesario y activamos el flag.
//             // Esto cubre casos donde el chat no tiene suficientes mensajes para llenar la pantalla inicialmente,
//             // pero el usuario intenta scrollar de todas formas.
//             if (!initialScrollDone && container.scrollTop > 0) {
//                 setInitialScrollDone(true);
//             }

//             // Guarda el scrollTop actual para usarlo en loadMoreMessages
//             lastScrollTopRef.current = container.scrollTop;

//             const scrollThreshold = 100; // Define cuántos píxeles desde el tope queremos activar la carga.

//             // Condición para cargar más mensajes:
//             // 1. scrollTop es menor que nuestro umbral (estamos cerca del tope).
//             // 2. No estamos ya cargando mensajes (`!loadingMore`).
//             // 3. Todavía hay más mensajes disponibles (`hasMore`).
//             if (container.scrollTop < scrollThreshold && !loadingMore && hasMore && initialScrollDone) {
//                 console.log('¡Disparando loadMoreMessages por scroll al tope!'); // Para depuración
//                 loadMoreMessages();
//             }
//         }, 200); // El retardo de 200ms para el throttle

//         // Adjuntar el event listener
//         container.addEventListener('scroll', handleScroll);

//         // Limpiar el event listener cuando el componente se desmonte o el efecto se re-ejecute
//         return () => container.removeEventListener('scroll', handleScroll);
//     }, [loadMoreMessages, loadingMore, hasMore, initialScrollDone]); // Dependencias correctas


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (!username || !auth.id) return;
//                 setLoading(true);

//                 // 1. Obtener perfil del usuario
//                 const profileResult = await dispatch(getProfile({ username })).unwrap();

//                 const userData = {
//                     userId: profileResult.profile.user.id,
//                     username: profileResult.profile.user.username,
//                     firstName: profileResult.profile.firstName,
//                     lastName: profileResult.profile.lastName,
//                     degree: profileResult.profile.degree,
//                     profilePicture: {
//                         url: profileResult.profile.user.profilePicture?.url || null
//                     }
//                 };
//                 setUser(userData);

//                 // 2. Configurar chat actual
//                 dispatch(setCurrentChat({
//                     userId: userData.userId,
//                     username: userData.username,
//                     name: `${userData.firstName} ${userData.lastName}`
//                 }));

//                 // // 3. Obtener mensajes - forma correcta de manejar el dispatch
//                 // await dispatch(getMessages(userData.userId));
//                 await dispatch(getMessages({ userId: userData.userId, page: 1 }));


//                 // scrollToBottom();    

//                 // === NUEVO: Scroll al final después de la carga inicial ===
//                 // Usamos requestAnimationFrame para asegurar que el DOM ha terminado de renderizar los mensajes
//                 requestAnimationFrame(() => {
//                     if (messagesContainerRef.current) {
//                         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//                         setInitialScrollDone(true); // <--- Marcamos que el scroll inicial ya está hecho
//                     }
//                 });

//             } catch (error) {
//                 console.error("Error en fetchData:", error);
//                 enqueueSnackbar(error.message, typeError);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();


//         return () => {
//             dispatch(resetChat());
//         };
//     }, [username, dispatch, navigate, auth.id]);


//     // Efecto para manejar la presencia en el chat
//     useEffect(() => {
//         if (!user?.userId || !auth.id) return;

//         // Notificar al entrar al chat
//         socketService.notifyViewingChat(user.userId);

//         // Manejar cambios de pestaña/ventana
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'visible') {
//                 socketService.notifyViewingChat(user.userId);
//             } else {
//                 socketService.notifyLeftChat();
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);

//         return () => {
//             // Notificar al salir del chat
//             socketService.notifyLeftChat();
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, [user, auth.id]);

//     // Efecto para manejar el estado "leído" correctamente
//     useEffect(() => {
//         if (!user || !auth.id) return;

//         // Solo marcar como leído si el contacto está viendo el chat
//         if (chat.contactViewingStatus[user.userId]) {
//             const unreadMessages = chat.messages.filter(
//                 msg => !msg.read && msg.sender?.id === auth.id
//             );

//             if (unreadMessages.length > 0) {
//                 const unreadIds = unreadMessages.map(msg => msg._id);

//                 // Actualización optimista con confirmación visual
//                 dispatch(setMessagesRead(unreadIds));

//                 // Enviar al servidor sin esperar respuesta
//                 socketService.markMessagesAsRead(unreadIds)
//                     .catch(err => {
//                         console.error('Error:', err);
//                         // Revertir visualmente si falla
//                         dispatch(setMessagesRead(unreadIds.map(id => ({ id, read: false }))));
//                     });
//             }
//         }
//     }, [chat.messages, chat.contactViewingStatus, user, auth.id, dispatch]);

//     // Scroll al final de los mensajes
//     // useEffect(() => {
//     //     scrollToBottom();
//     // }, [chat.messages]);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const handleMarkAsRead = useCallback((messageIds) => {
//         dispatch(markMessagesAsRead(messageIds));
//     }, [dispatch]);

//     // Ajusta la altura del textarea dinámicamente
//     useEffect(() => {
//         const textarea = textareaRef.current;
//         if (textarea) {
//             // Reinicia la altura para calcular correctamente el scrollHeight
//             textarea.style.height = 'auto';
//             // Establece la altura al scrollHeight o a un máximo
//             const maxHeight = 120; // Define la altura máxima en píxeles (ej. 4 líneas de texto aprox.)
//             textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

//             // Si el contenido excede la altura máxima, activa el scroll
//             if (textarea.scrollHeight > maxHeight) {
//                 textarea.style.overflowY = 'auto';
//             } else {
//                 textarea.style.overflowY = 'hidden'; // Oculta el scroll si no es necesario
//             }
//         }
//     }, [message]); // Este useEffect se re-ejecuta cada vez que 'message' cambia


//     // Efecto para cerrar el selector de emojis si se hace clic fuera de él o del botón
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
//                 emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)
//             ) {
//                 setShowEmojiPicker(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Función que se ejecuta cuando seleccionas un emoji
//     const onEmojiClick = (emojiObject) => {
//         // Añade el emoji al final del mensaje actual
//         setMessage(prevMessage => prevMessage + emojiObject.emoji);
//         // Opcional: cierra el picker después de seleccionar un emoji
//         // setShowEmojiPicker(false);
//         textareaRef.current.focus(); // Vuelve a enfocar el textarea después de insertar el emoji
//     };

//     // Función para manejar el clic en el botón de emoji
//     const handleEmojiButtonClick = () => {
//         setShowEmojiPicker(prev => !prev); // Alterna la visibilidad del picker
//     };

//     // También puedes llamar a la lógica de redimensionamiento en el onChange para una respuesta inmediata
//     const handleChange = (e) => {
//         setMessage(e.target.value);
//         // La actualización de la altura ocurrirá en el useEffect,
//         // pero puedes forzar una actualización manual aquí si necesitas una respuesta más rápida.
//         // O simplemente dejar que el useEffect lo maneje.
//     };

//     useEffect(() => {
//         const unreadIds = messages
//             .filter(msg => !msg.read && msg.sender?.id !== auth.id)
//             .map(msg => msg._id);

//         if (unreadIds.length > 0) {
//             handleMarkAsRead(unreadIds);
//         }
//     }, [messages, auth.id, handleMarkAsRead]);


//     const handleSendMessage = async () => {
//         if (message.trim() === "") {
//             enqueueSnackbar("No puedes enviar un mensaje vacío", typeError);
//             return;
//         }

//         try {
//             // 1. Crear mensaje temporal
//             const tempId = Date.now().toString();
//             const tempMessage = {
//                 _id: tempId,
//                 sender: {
//                     id: auth.id,
//                     username: auth.username,
//                     firstName: auth.firstName,
//                     lastName: auth.lastName
//                 },
//                 content: message,
//                 createdAt: new Date().toISOString(),
//                 isTemp: true
//             };

//             // 2. Mostrar mensaje temporal
//             dispatch(addMessage(tempMessage));
//             setMessage("");

//             scrollToBottom();

//             // 3. Enviar mensaje real
//             const resultAction = await dispatch(sendMessage({
//                 receiverId: user.userId,
//                 content: message
//             }));

//             if (sendMessage.fulfilled.match(resultAction)) {
//                 // 4. Reemplazar mensaje temporal con el real
//                 dispatch(replaceTempMessage({
//                     tempId,
//                     realMessage: resultAction.payload
//                 }));
//                 scrollToBottom();
//             } else {
//                 throw new Error(resultAction.error.message);
//             }

//         } catch (error) {
//             console.error("Error enviando mensaje:", error);
//             enqueueSnackbar(error.message, typeError);
//             // Opcional: remover mensaje temporal si falla
//             // dispatch(removeMessage(tempId));
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const groupedMessages = groupMessagesByDate(chat.messages);

//     if (loading || !user) {
//         return (
//             <>
//                 <Header />
//                 <div className="h-[10.5vh]"></div>
//                 <main className="flex relative">
//                     <Nav />
//                     <div className="w-full h-[89.5vh] flex items-center justify-center">
//                         <p className="font-barolw">Cargando chat...</p>
//                     </div>
//                 </main>
//             </>
//         );
//     }

//     return (
//         <>
//             <Header />
//             <div className="h-[10.5vh]"></div>

//             <main className="flex relative">
//                 <Nav />
//                 <div className="w-full h-[89.5vh] flex flex-col">
//                     {/* Header del chat */}
//                     <div className="flex items-center justify-between p-4 border-b-2 border-verdeD bg-Gris">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="text-verdeD hover:text-RojoC transition-colors duration-200"
//                             >
//                                 <BsArrowLeft className="text-xl" />
//                             </button>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
//                                     {user.profilePicture.url ? (
//                                         <img
//                                             src={user.profilePicture.url}
//                                             alt={`${user.firstName} ${user.lastName}`}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         <span className="text-white font-bold">
//                                             {user.firstName.charAt(0)}{user.lastName.charAt(0)}
//                                         </span>
//                                     )}
//                                 </div>
//                                 <div className="min-w-0">
//                                     <h3 className="font-barolw font-semibold text-Negro text-sm">
//                                         {user.firstName} {user.lastName}
//                                     </h3>
//                                     <p className="text-xs font-barlow-semi-condensed text-verdeD">
//                                         @{user.username}
//                                     </p>
//                                     {/* <ContactViewingStatus userId={user.userId} /> */}
//                                     <OnlineStatus userId={user.userId} />
//                                 </div>
//                             </div>
//                         </div>
//                         <button className="text-verdeD hover:text-RojoC transition-colors duration-200">
//                             <BsThreeDotsVertical className="text-xl" />
//                         </button>
//                     </div>

//                     {/* Área de mensajes */}
//                     <div
//                         ref={messagesContainerRef}
//                         className="flex-1 p-4 overflow-y-auto bg-white"
//                         style={{ overflowAnchor: 'none' }} // Previene saltos al agregar nuevos mensajes
//                     >
//                         {/* Botón de prueba para cargar más mensajes */}
//                         {/* {hasMore && !loadingMore && (
//                             <div className="flex justify-center mt-2">
//                                 <button
//                                     onClick={loadMoreMessages}
//                                     className="bg-verdeA hover:bg-verdeD text-white text-sm px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//                                     disabled={loadingMore}
//                                 >
//                                     {loadingMore ? 'Cargando...' : 'Ver más mensajes'}
//                                 </button>
//                             </div>
//                         )} */}

//                         {loadingMore && (
//                             <div className="flex justify-center py-2">
//                                 <p className="text-sm text-gray-500">Cargando mensajes anteriores...</p>
//                             </div>
//                         )}

//                         {groupedMessages.map((group) => (
//                             <div key={group.date} className="mb-4">
//                                 {/* Cabecera de fecha */}
//                                 <div className="flex items-center justify-center my-4">
//                                     <div className="bg-Gris/50 text-Negro/70 text-xs font-medium px-3 py-1 rounded-full">
//                                         {formatDateHeader(group.date)}
//                                     </div>
//                                 </div>

//                                 {/* Mensajes del día */}
//                                 {group.messages.map((msg) => {
//                                     const isOwn = msg.sender?.id === auth.id;
//                                     return (
//                                         <Message
//                                             key={msg._id}
//                                             message={{
//                                                 ...msg,
//                                                 sender: {
//                                                     ...msg.sender,
//                                                     firstName: msg.sender?.firstName || user?.firstName,
//                                                     lastName: msg.sender?.lastName || user?.lastName,
//                                                     username: msg.sender?.username,
//                                                     profilePicture: msg.sender?.profilePicture || {
//                                                         url: null
//                                                     }
//                                                 }
//                                             }}
//                                             isOwn={isOwn}
//                                             markMessagesAsRead={handleMarkAsRead}
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         ))}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Contenedor principal de la barra de mensaje */}
//                     <div className="p-4 border-t-2 border-verdeD bg-Gris">
//                         {/* Contenedor flex para los botones y el textarea */}
//                         {/* Usamos items-end para alinear los elementos a la parte inferior */}
//                         <div className="flex items-end gap-2">
//                             <button
//                                 ref={emojiButtonRef}
//                                 onClick={handleEmojiButtonClick}
//                                 className="text-verdeD hover:text-RojoC transition-colors duration-200 p-2 rounded-full">
//                                 <BsEmojiSmile className="text-xl"
//                                 />
//                             </button>
//                             {/* <button className="text-verdeD hover:text-RojoC transition-colors duration-200 p-2 rounded-full">
//                                 <BsPaperclip className="text-xl" />
//                             </button> */}

//                             {/* Contenedor del textarea, con altura mínima y flexibilidad */}
//                             <div className="flex-1 min-h-[40px] flex items-end"> {/* Flex y items-end aquí también para el textarea */}
//                                 <textarea
//                                     ref={textareaRef}
//                                     value={message}
//                                     onChange={handleChange}
//                                     onKeyPress={handleKeyPress}
//                                     placeholder="Escribe un mensaje..."
//                                     rows={1}
//                                     // Clases para hacerlo transparente y sin bordes/sombras
//                                     className="w-full h-full p-2 text-Negro font-barolw text-sm resize-none
//                                    bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
//                                     style={{ overflowY: 'hidden' }}
//                                 />
//                             </div>

//                             <button
//                                 onClick={handleSendMessage}
//                                 disabled={message.trim() === ""}
//                                 className="bg-verdeA hover:bg-verdeD text-white align-center p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <IoSend className="text-xl" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Selector de Emojis */}
//                     {showEmojiPicker && (
//                         <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-50 shadow-lg rounded-lg overflow-hidden">
//                             <EmojiPicker
//                                 onEmojiClick={onEmojiClick}
//                                 height={350} // Ajusta la altura del picker
//                                 width="100%" // Ajusta el ancho del picker
//                                 skinTonePickerLocation="PREVIEW" // Muestra el selector de tono de piel en el preview
//                                 searchDisabled={false} // Habilita la barra de búsqueda
//                                 lazyLoadEmojis={true} // Carga los emojis a medida que se necesitan
//                                 theme="light" // Puedes probar 'dark' o 'auto'
//                                 emojiStyle="native" // 'native' para emojis del sistema, 'google' para estilo Google
//                             />
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </>
//     );
// }





{/* <div className="flex-1 p-4 overflow-y-auto bg-white">
                        {chat.messages.map((msg) => {
                            const isOwn = msg.sender?.id === auth.id;
                            return (
                                <Message
                                    key={msg._id}
                                    message={{
                                        ...msg,
                                        sender: {
                                            ...msg.sender,
                                            firstName: msg.sender?.firstName || user?.firstName,
                                            lastName: msg.sender?.lastName || user?.lastName,
                                            username: msg.sender?.username,
                                            profilePicture: msg.sender?.profilePicture || {
                                                url: null
                                            }
                                        }
                                    }}
                                    isOwn={isOwn}
                                    // markMessagesAsRead={markMessagesAsRead}
                                    markMessagesAsRead={handleMarkAsRead}
                                />
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div> */}


{/* Input de mensaje */ }
{/* <div className="p-4 border-t-2 border-verdeD bg-Gris">
                        <div className="flex items-end gap-2">
                            <button className="text-verdeD hover:text-RojoC transition-colors duration-200 p-2">
                                <BsEmojiSmile className="text-xl" />
                            </button>
                            <button className="text-verdeD hover:text-RojoC transition-colors duration-200 p-2">
                                <BsPaperclip className="text-xl" />
                            </button>
                            <div className="flex-1 min-h-[42px]">
                                <textarea
                                    type="text"
                                    value={message}
                                    onChange={handleChange} // Usamos nuestra propia función handleChange
                                    onKeyPress={handleKeyPress}
                                    rows={1} // Inicia con una fila, la altura será ajustada por JS
                                    placeholder="Escribe un mensaje..."
                                    className="w-full px-4 py-2 rounded-full border border-verdeA focus:border-verdeD focus:outline-none font-barolw text-sm"
                                    style={{ overflowY: 'hidden' }} // Oculta el scroll por defecto, lo manejaremos con JS
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={message.trim() === ""}
                                className="bg-verdeA hover:bg-verdeD text-white p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <BsSend className="text-xl" />
                            </button>
                        </div>
                    </div> */}













// Código hasta el scroll okkkkkkkkk
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
import { getMessages, sendMessage } from "../../services/chatService";
import socketService from "../../services/socket.service";
import { setCurrentChat, addMessage, setMessagesRead, setMessageRead, updateMessages, removeMessage, replaceTempMessage, resetChat } from "../../features/chatSlice";
import { markMessagesAsRead } from "../../services/chatService";
import { formatDateHeader, groupMessagesByDate } from '../../utils/dateUtils';
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
    const [isMobile, setIsMobile] = useState(false);

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

    // Efecto para detectar si es móvil al cargar el componente usando User Agent
    useEffect(() => {
        const checkIsMobileUserAgent = () => {
            const userAgent = navigator.userAgent || window.opera;

            // Expresión regular para detectar patrones comunes de dispositivos móviles
            if (/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)) {
                return true;
            }
            // También se puede considerar la resolución de pantalla para tablets que no se detectan con lo anterior
            // if (window.innerWidth <= 768 && window.innerHeight <= 1024) { // Valores de ejemplo, ajustar según necesidad
            //     return true;
            // }
            return false;
        };
        setIsMobile(checkIsMobileUserAgent());
    }, []); // Se ejecuta solo una vez al montar el componente

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
                    firstName: profileResult.profile.firstName,
                    lastName: profileResult.profile.lastName,
                    degree: profileResult.profile.degree,
                    profilePicture: {
                        url: profileResult.profile.user.profilePicture?.url || null
                    }
                };
                setUser(userData);

                dispatch(setCurrentChat({
                    userId: userData.userId,
                    username: userData.username,
                    name: `${userData.firstName} ${userData.lastName}`
                }));

                // Cargar la primera página de mensajes
                await dispatch(getMessages({ userId: userData.userId, page: 1 }));

                // === MODIFICACIÓN CLAVE AQUÍ ===
                // Desplazar al final *después* de que los mensajes iniciales se hayan renderizado
                // y marcar que el scroll inicial ya se hizo.
                requestAnimationFrame(() => {
                    if (messagesContainerRef.current) {
                        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                        setInitialScrollDone(true); // Marca que el scroll inicial ya está hecho
                    }
                });
                // ====================================================

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


    // Agregar este efecto al componente Chat:
    useEffect(() => {
        if (!user?.userId || !auth.id) return;

        const handleNewMessage = (message) => {
            // Verificar si el mensaje es para esta conversación
            const isCurrentChat =
                message.sender.id === user.userId ||
                message.receiver.id === user.userId;

            if (isCurrentChat) {
                dispatch(addMessage(message));
                scrollToBottomOnSend();
            }
        };

        socketService.socket.on('new_private_message', handleNewMessage);

        return () => {
            socketService.socket.off('new_private_message', handleNewMessage);
        };
    }, [user, auth.id, dispatch, scrollToBottomOnSend]);

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

    // Efecto para manejar la presencia en el chat
    useEffect(() => {
        if (!user?.userId || !auth.id) return;

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

        if (chat.contactViewingStatus[user.userId]) {
            const unreadMessages = chat.messages.filter(
                msg => !msg.read && msg.sender?.id === auth.id
            );

            if (unreadMessages.length > 0) {
                const unreadIds = unreadMessages.map(msg => msg._id);

                dispatch(setMessagesRead(unreadIds));

                socketService.markMessagesAsRead(unreadIds)
                    .catch(err => {
                        console.error('Error:', err);
                        dispatch(setMessagesRead(unreadIds.map(id => ({ id, read: false }))));
                    });
            }
        }
    }, [chat.messages, chat.contactViewingStatus, user, auth.id, dispatch]);

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
        if (e.key === "Enter" && !e.shiftKey && !isMobile) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        const unreadIds = messages
            .filter(msg => !msg.read && msg.sender?.id !== auth.id)
            .map(msg => msg._id);

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
                _id: tempId,
                sender: {
                    id: auth.id,
                    username: auth.username,
                    firstName: auth.firstName,
                    lastName: auth.lastName
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
                content: message
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
                <Header />
                <div className="h-[10.5vh]"></div>
                <main className="flex relative">
                    <Nav />
                    <div className="w-full h-[89.5vh] flex items-center justify-center">
                        <p className="font-barolw"><Loader /></p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            {/* <Header />
            <div className="h-[10.5vh]"></div> */}

            <main className="flex relative">
                {/* <Nav /> */}
                {/* <div className="w-full h-[89.5vh] flex flex-col"> */}
                <div className="w-full h-[100vh] flex flex-col">
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
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-bold">
                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-barolw font-semibold text-Negro text-sm">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    <p className="text-xs font-barlow-semi-condensed text-verdeD">
                                        @{user.username}
                                    </p>
                                    <OnlineStatus userId={user.userId} />
                                </div>
                            </div>
                        </div>
                        <button className="text-verdeD hover:text-RojoC transition-colors duration-200">
                            <BsThreeDotsVertical className="text-xl" />
                        </button>
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
                        className="flex-1 p-4 overflow-y-auto bg-white"
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
                                                key={msg._id}
                                                message={{
                                                    ...msg,
                                                    sender: {
                                                        ...msg.sender,
                                                        firstName: msg.sender?.firstName || user?.firstName,
                                                        lastName: msg.sender?.lastName || user?.lastName,
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
                        })}
                    </div>

                    {/* Contenedor principal de la barra de mensaje */}
                    <div className="p-4 border-t-2 border-verdeD bg-Gris">
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
                    </div>

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
                </div>
            </main>
        </>
    );
}


{/* <div className="flex items-center justify-center my-4">
                                    <div className="bg-Gris/50 text-Negro/70 text-xs font-medium px-3 py-1 rounded-full">
                                        {formatDateHeader(group.date)}
                                    </div>
                                </div> */}


// Efecto para detectar si es móvil al cargar el componente
// useEffect(() => {
//     // Simple detección táctil para dispositivos móviles/tablets
//     const checkIsMobile = () => {
//         return (('ontouchstart' in window) ||
//             (navigator.maxTouchPoints > 0) ||
//             (navigator.msMaxTouchPoints > 0));
//     };
//     setIsMobile(checkIsMobile());
// }, []); // Se ejecuta solo una vez al montar el componente


// // Efecto para manejar el scroll para cargar más mensajes antiguos
// useEffect(() => {
//     const container = messagesContainerRef.current;
//     if (!container) return;

//     const handleScroll = throttle(() => {
//         // Solo activar la lógica de scroll para cargar más si el scroll inicial ya se hizo
//         if (!initialScrollDone && container.scrollTop > 0) {
//             // Si aún no hemos hecho el scroll inicial y el usuario se mueve,
//             // asumimos que el scroll inicial ya no es necesario o que ya está en una posición válida.
//             setInitialScrollDone(true);
//         }

//         lastScrollTopRef.current = container.scrollTop;
//         const scrollThreshold = 10;

//         // La condición para cargar: cerca del tope, no cargando, y hay más mensajes
//         if (container.scrollTop < scrollThreshold && !loadingMore && hasMore && initialScrollDone) {
//             console.log('¡Disparando loadMoreMessages por scroll al tope!');
//             loadMoreMessages();
//         }
//     }, 200);

//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
// }, [loadMoreMessages, loadingMore, hasMore, initialScrollDone]); // Añadido initialScrollDone como dependencia