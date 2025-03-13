import { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong, FaPeopleGroup } from "react-icons/fa6";
import { HiMiniChartBarSquare } from "react-icons/hi2";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { PiProjectorScreenChartBold } from "react-icons/pi";

function Nav() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <nav className={`${sidebar ? "w-[60px] items-center " : "md:w-[200px] lg:w-[250px] absolute md:relative w-full"} flex flex-col border-r-2 bg-Gris border-verdeD h-[89.5vh] text-verdeD transition-all duration-200`}>
        <div className="px-4 pt-3 flex justify-end">
          <button className="h-full p-1" onClick={e => setSidebar(!sidebar)}>
            {sidebar ? <FaArrowRightLong className="text-xl" /> : <FaArrowLeftLong className="text-xl" />}
          </button>
        </div>

        <ul className="py-4 border-b border-verdeD ">
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><IoIosHome className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>PRINCIPAL</p></li>
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><HiMiniChartBarSquare className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>TENDENCIAS</p></li>
        </ul>

        <ul className="py-4 border-b border-verdeD ">
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><FaGraduationCap className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>EGRESADOS</p></li>
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><FaPeopleGroup className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>FOROS</p></li>
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><PiProjectorScreenChartBold className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>PROYECTOS</p></li>
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><BsCalendarDate className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>EVENTOS</p></li>
        </ul>

        <ul className="py-4 border-b border-verdeD ">
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><IoIosNotifications className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>NOTIFICACIONES</p></li>
            <li className="px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-Blanco duration-300 transition-all"><FaUser className="text-2xl" /> <p className={`${sidebar ? ("hidden") : ("visible")} font-barolw font-bold text-sm`}>PERFIL</p></li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
