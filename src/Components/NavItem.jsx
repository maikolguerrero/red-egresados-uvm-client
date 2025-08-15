import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile';
import { useState, useRef } from 'react';

export default function NavItem({ to, icon, text, isSidebar, badge, onClick }) {
    const isMobile = useIsMobile();
    const itemRef = useRef(null);
    const [tooltipStyle, setTooltipStyle] = useState({});

    const handleMouseEnter = () => {
        if (isMobile || !isSidebar) return;

        const rect = itemRef.current.getBoundingClientRect();
        setTooltipStyle({
            left: `${rect.right + 10}px`, // 10px a la derecha del elemento
            top: `${rect.top + rect.height / 2}px`, // Centrado vertical
        });
    };

    return (
        <div
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            className="relative group"
        >
            <Link
                to={to}
                onClick={onClick}
                className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"
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
            </Link>

            {/* Tooltip con posición fija (fuera del nav) */}
            {!isMobile && isSidebar && (
                <div
                    className="fixed z-[9999] px-3 py-1 bg-verdeD text-Blanco text-sm rounded-md whitespace-nowrap shadow-lg origin-left scale-0 group-hover:scale-100 transition-transform duration-200 transform -translate-y-1/2"
                    style={{
                        left: `${tooltipStyle.left}`,
                        top: `${tooltipStyle.top}`,
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
}