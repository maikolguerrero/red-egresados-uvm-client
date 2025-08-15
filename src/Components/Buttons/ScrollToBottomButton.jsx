const ScrollToBottomButton = ({ count, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-4 bg-verdeD hover:bg-verdeA text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-50 transition-all duration-200 animate-bounce"
        >
            <span className="text-lg">↓</span>
            {count > 0 && (
                <span className="bg-RojoC text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {count > 99 ? '99+' : count}
                </span>
            )}
            <span className="text-sm font-medium">
                {count > 0 ? 'Nuevos mensajes' : 'Ir al final'}
            </span>
        </button>
    );
};

export default ScrollToBottomButton;