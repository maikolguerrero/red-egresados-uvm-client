import { FaBars, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import { useSelector } from "react-redux";

export function ButtonNavHamburger() {
    const dispatch = useDispatch();
    const isSidebar = useSelector((state) => state.sidebar.isSidebar);
    return (
        <button
            className="top-[1vh] z-20 p-2"
            onClick={() => dispatch(toggleSidebar())}
        >
            {isSidebar ? <IoMenu className="text-3xl text-verdeD" /> : <IoClose className="text-3xl text-verdeD" />}
        </button>
    )
}