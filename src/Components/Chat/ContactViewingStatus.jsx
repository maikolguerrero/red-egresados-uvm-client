import { useSelector } from "react-redux";

export default function ContactViewingStatus({ userId }) {
    const isViewing = useSelector(state => 
        state.chat.contactViewingStatus[userId] || false
    );

    return isViewing ? (
        <div className="text-xs text-green-500 mt-1">
            <span className="relative flex h-2 w-2 mr-1 inline-block">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Viendo el chat
        </div>
    ) : null;
}