import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile';

export default function NavItem({ to, icon, text, isSidebar, badge, onClick }) {
    const isMobile = useIsMobile();
    return (
        <Link
            to={to}
            onClick={onClick}
            // title={text}
            className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all group relative"
        >
            <div className="relative">
                {icon}
                {badge > 0 && (
                    <span className="absolute left-4 -top-3 bg-RojoC text-white text-[0.6rem] rounded-full w-5 h-5 flex items-center justify-center">
                        {badge > 99 ? '99+' : badge}
                    </span>
                )}
            </div>
            <p className={`${isSidebar ? "hidden" : "block"} font-barolw font-bold text-sm`}>
                {text}
            </p>

            {/* Tooltip que solo aparece cuando la sidebar está colapsada */}
            {(!isMobile && isSidebar) && (
                <span className="absolute left-full ml-4 px-3 py-1 bg-verdeD text-Blanco text-sm font-barolw rounded-md shadow-lg whitespace-nowrap scale-0 group-hover:scale-100 origin-left transition-transform duration-200 z-20">
                    {text}
                </span>
            )}
        </Link>
    );
}