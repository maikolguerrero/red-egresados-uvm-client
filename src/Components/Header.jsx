import { Link, useLocation } from "react-router-dom";
import logo from "../../public/LogoUvm.png"
import { useDispatch } from "react-redux";
import { logoutSesion } from "../services/auth/authService";
import socketService from "../services/socket/socket.service";
import { ButtonNavHamburger } from "./Buttons/ButtonNavHamburger";
import useIsMobile from "../hooks/useIsMobile";

function Header() {
  const dispatch = useDispatch()
  const isLanding = useLocation().pathname === "/landing";

  // --- Uso del hook para saber si es móvil ---
  const isMobile = useIsMobile();

  const handdleLogout = (e) => {
    // Desconectar socket primero
    socketService.manualDisconnect('user_logout');
    // Luego hacer logout
    dispatch(logoutSesion());
  }

  return (
    <>
      <div className="w-full fixed z-20">
        <header className="bg-Blanco h-[7vh] w-full flex justify-center items-center">
          <div className="absolute left-4">
            {
              !isLanding && isMobile && (
                <ButtonNavHamburger />
              )
            }
          </div >
          <div className="flex gap-1 justify-center items-center">
            <h2 className=" text-2xl md:text-3xl text-verdeA font-bold font-barlow-semi-condensed">
              UVM
            </h2>
            <img src={logo} alt="Logo de la UVM" className="w-8 md:w-10" />
            <h3 className="w-[100px] md:w-[120px] text-xs md:text-sm text-RojoC font-semibold font-barlow-semi-condensed leading-4">
              UNIVERSIDAD VALLE DEL MOMBOY
            </h3>
          </div>
        </header >

        <nav className="bg-verdeD h-[3.5vh] w-full">
          <ul className="flex gap-5 justify-center items-center h-full">
            <li className="font-medium font-barlow-semi-condensed text-xs lg:text-sm text-Blanco hover:cursor-pointer hover:text-verdeA transition-all duration-300">
              <Link to={"/landing"}>INICIO</Link>
            </li>
            <li className="font-medium font-barlow-semi-condensed text-xs lg:text-sm text-Blanco hover:cursor-pointer hover:text-verdeA transition-all duration-300">
              <Link to={"/home"}>RED DE EGRESADOS</Link>
            </li>
            <li className="font-medium font-barlow-semi-condensed text-xs lg:text-sm text-Blanco hover:cursor-pointer hover:text-RojoA transition-all duration-300">
              <button onClick={handdleLogout}>CERRAR SESIÓN</button>
            </li>
          </ul>
        </nav>
      </div >
    </>
  );
}

export default Header;
