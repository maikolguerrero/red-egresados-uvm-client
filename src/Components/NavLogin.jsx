import { FaBars } from "react-icons/fa";
import logo from "./../../public/LogoUvm.png";
import { HiXMark } from "react-icons/hi2";
import { useState } from "react";
import Button from "./Buttons/Button";
import { Link } from "react-router-dom";

function NavLogin() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <header className="bg-verdeC h-[7.5vh] lg:h-[80px] relative w-full flex">
        <div className="w-3/4 md:5/6 flex gap-2 h-full items-center px-3">
          <img src={logo} alt="Logo de la UVM" className="w-9 h-9 md:w-12 md:h-12" />
          <h1 className="font-barlow-semi-condensed font-bold text-lg md:text-xl text-Blanco">
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
          className={`bg-verdeC w-full md:w-1/6 h-[7.5vh] lg:h-full absolute md:static items-center justify-center flex transition-all duration-300 ${
            sidebar ? "top-0 md:right-auto" : "-top-full md:right-auto"
          }`}
        >
          <div className="w-5/6 md:w-full flex justify-center">
            <Link to={"/register"}><Button text="REGISTRO"  /></Link>
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
      </header>
    </>
  );
}

export default NavLogin;
