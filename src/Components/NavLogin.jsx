import { FaBars } from "react-icons/fa";
import logo from "./../../public/LogoUvm.png";
import { HiXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";
import Button from "./Buttons/Button";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import { useSelector } from "react-redux";

function NavLogin() {
  const sessionActive = useSelector((state) => state.auth.sessionActive);

  const [sidebar, setSidebar] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const [isHorizontal, setIsHorizontal] = useState(false);

  // Detectar orientación del dispositivo
  useEffect(() => {
    const checkOrientation = () => {
      setIsHorizontal(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", checkOrientation);
    checkOrientation();

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);


  return (
    <>
      <header className={`bg-verdeC ${isMobile ? ((isHorizontal) ? "h-[12.5vh] " : "h-[7.5vh]") : "h-[7.5vh] lg:h-[80px]"} relative w-full flex`}>
        <div className="w-3/4 md:5/6 flex gap-2 h-full items-center px-3">
          <img src={logo} alt="Logo de la UVM" className={`${isMobile ? ((isHorizontal) ? "w-8 h-" : "w-9 h-9") : "w-9 h-9 md:w-12 md:h-12"}`} />
          <h1 className={`font-barlow-semi-condensed font-bold ${isMobile ? ((isHorizontal) ? "text-lg" : "text-xl") : "text-lg md:text-xl"}  text-Blanco`}>
            RED DE EGRESADOS UVM
          </h1>
        </div>

        <div className="w-1/4 flex items-center h-full justify-end px-4 md:hidden">
          <button
            className="text-xl text-Blanco"
            onClick={(e) => setSidebar(true)}
          >
            <FaBars />
          </button>
        </div>

        <nav
          className={`bg-verdeC w-full md:w-1/6 ${isMobile ? ((isHorizontal) ? "h-[12.5vh] " : "h-[7.5vh]") : "h-[7.5vh] lg:h-[80px]"} lg:h-full absolute md:static items-center justify-center flex transition-all duration-300 ${sidebar ? "top-0 md:right-auto" : "-top-full md:right-auto"
            }`}
        >
          <div className="w-5/6 md:w-full flex justify-center">

            {
              !sessionActive && (
                <>
                  {
                    currentPath === "/verify-alumni" ? (
                      <>
                        <Link to={"/login"}><Button text="LOGIN" /></Link>
                        <Link to={"/register"}><Button text="REGISTRO" className="ml-2" /></Link>
                      </>
                    ) : (
                      <>
                        {currentPath === "/login" ? (
                          <Link to={"/register"}><Button text="REGISTRO" /></Link>
                        ) : (
                          <Link to={"/login"}><Button text="LOGIN" /></Link>
                        )}
                        <Link to={"/verify-alumni"}><Button text="VERIFICACIÓN" className="ml-2" /></Link>

                      </>
                    )
                  }
                </>
              )
            }



          </div>
          <div className="w-1/6 md:w-0 flex items-center h-full justify-end px-4 md:hidden">
            <button
              className="text-2xl text-Blanco"
              onClick={(e) => setSidebar(false)}
            >
              <HiXMark />
            </button>
          </div>
        </nav>
      </header >
    </>
  );
}

export default NavLogin;
