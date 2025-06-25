import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";

export function ButtonNavHamburger() {
    const dispatch = useDispatch();
    return (
        <button
            className="top-[1vh] z-20 p-2"
            onClick={() => dispatch(toggleSidebar())}
        >
            <FaBars className="text-xl text-verdeD" />
        </button>
    )
}
