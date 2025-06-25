import { BsCheck, BsCheckAll } from 'react-icons/bs';
import { formatMessageTime } from '../../utils/dateUtils';

export function ButtonDM({ conversation, onClick }) {
  const getInitials = () => {
    if (conversation.firstName && conversation.lastName) {
      return `${conversation.firstName.charAt(0)}${conversation.lastName.charAt(0)}`;
    }
    return conversation.username?.charAt(0) || 'U';
  };

  const renderStatus = () => {
    if (!conversation.lastMessage || conversation.lastMessage.sender == conversation.userId) {
      return null;
    }

    return conversation.lastMessage.read ? (
      <BsCheckAll className="text-blue-400 text-2xl" />
    ) : (
      <BsCheck className="text-gray-400 text-2xl" />
    );
  };

  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 relative"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
        {conversation.profilePicture?.url ? (
          <img
            src={conversation.profilePicture.url}
            alt={`${conversation.firstName} ${conversation.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-bold text-lg">
            {getInitials()}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-start">
          <div>
            <h6 className="text-Negro font-barlow-semi-condensed font-semibold">
              {conversation.firstName} {conversation.lastName}
            </h6>
            <p className="text-xs text-gray-400">@{conversation.username}</p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap ml-2 mt-1">
            {conversation.lastMessage && formatMessageTime(conversation.lastMessage.createdAt)}
          </span >
        </div >

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 min-w-0">
            {renderStatus()}
            <p className="text-sm text-gray-500 truncate">
              {conversation.lastMessage?.content || "Nuevo chat"}
            </p>
          </div >

          <div className="flex items-center gap-1">
            {conversation.unreadCount > 0 && (
              <span className="bg-RojoC text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div >
      </div >
    </button >
  );
}