import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
// import { toggleSidebar } from "../features/sidebar/sidebarSlice";

export function ButtonNavHamburger() {
    const dispatch = useDispatch();
    // const toggleSidebar = () => dispatch(toggleSidebar());

    return (
        <button
            className="md:hidden top-[1vh] z-20 p-2 "
            // onClick={toggleSidebar}
            onClick={() => dispatch(toggleSidebar())}
        >
            <FaBars className="text-xl text-verdeD" />
        </button>
    )
}
