import { useEffect, useState } from "react";
import { MdMessage, MdClose, MdChevronRight } from "react-icons/md";
import { ButtonDM } from "./ButtonDM";
import { getConversations } from "../../services/chat/chatService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socketService from "../../services/socket/socket.service";
import { useDispatch } from 'react-redux';
import { setConversations as setReduxConversations } from '../../features/chat/chatSlice';
import logger from "../../utils/logger";

export function ButtonMessages() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [unreadTotal, setUnreadTotal] = useState(0);

  const [drawerWidth, setDrawerWidth] = useState('28rem');
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setIsOpen(false);

  const fetchConversations = async () => {
    try {
      const { data } = await getConversations();
      updateConversations(data);
    } catch (error) {
      logger.error("Error al obtener conversaciones:", error);
    }
  };

  const updateConversations = (newConversations) => {
    setConversations(newConversations);
    dispatch(setReduxConversations(newConversations));

    const total = newConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    setUnreadTotal(total);
  };

  useEffect(() => {
    // Cargar conversaciones al montar el componente
    if (auth.id) {
      fetchConversations();
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDrawerWidth('100vw');
      } else if (window.innerWidth < 1024) {
        setDrawerWidth('24rem');
      } else {
        setDrawerWidth('28rem');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && auth.id) {
      // Refrescar conversaciones al abrir el drawer
      fetchConversations();
    }
  }, [isOpen, auth.id]);

  useEffect(() => {
    if (!auth.id) return;

    const handleConversationUpdate = (data) => {
      setConversations(prev => {
        const updated = prev.map(conv =>
          conv.userId === data.contactId ? { ...conv, ...data.conversation } : conv
        );
        updateConversations(updated);
        return updated;
      });
    };

    const handleConversationsUpdate = (updatedConversations) => {
      updateConversations(updatedConversations);
    };

    socketService?.socket?.on('conversation_updated', handleConversationUpdate);
    socketService?.socket?.on('conversations_updated', handleConversationsUpdate);

    return () => {
      socketService?.socket?.off('conversation_updated', handleConversationUpdate);
      socketService?.socket?.off('conversations_updated', handleConversationsUpdate);
    };
  }, [auth.id]);

  const handleConversationClick = (username) => {
    navigate(`/chat/${username}`);
    handleClose();
  };

  // Reemplaza el return con este código:
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full border border-verdeD text-verdeD bg-Blanco relative hover:bg-Gris transition-all"
      >
        <MdMessage className="text-2xl" />
        {unreadTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-RojoC text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {unreadTotal > 99 ? '99+' : unreadTotal}
          </span>
        )}
      </button>

      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay que solo cierra al hacer click fuera del drawer */}
        {isOpen && (
          <div
            className="absolute inset-0 bg-black/30"
            onClick={handleClose}
          />
        )}

        {/* Drawer - Ahora con stopPropagation */}
        <div
          className={`absolute inset-y-0 right-0 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
          style={{ width: drawerWidth }}
          onClick={(e) => e.stopPropagation()} // Esto evita que el click se propague al overlay
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-verdeD text-white">
              <h2 className="text-xl font-bold font-barlow-condensed flex items-center gap-2">
                <MdMessage className="text-2xl" />
                Mensajes Directos
              </h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Lista de chats - Ahora con preventDefault en el contenedor */}
            <div
              className="flex-1 overflow-y-auto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {conversations?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                  <MdMessage className="text-4xl mb-2" />
                  <p className="text-center">No tienes conversaciones activas</p>
                  <p className="text-sm text-center">Inicia un chat con algún egresado</p>

                  {/* ir a egresados */}
                  <button
                    onClick={() => navigate('/graduates', setIsOpen(false))}
                    className="mt-4 px-4 py-2 bg-verdeD text-white rounded-full hover:bg-verdeA transition-colors"
                  >
                    Buscar Egresados
                  </button>
                </div>
              ) : (
                conversations?.map((conversation) => (
                  <ButtonDM
                    key={conversation.userId}
                    conversation={conversation}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConversationClick(conversation.username);
                    }}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-verdeD transition-colors"
              >
                <span>Ocultar lista</span>
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
