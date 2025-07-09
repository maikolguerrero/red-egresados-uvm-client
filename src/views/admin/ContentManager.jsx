import { ButtonSecurity } from "../../Components/Buttons/ButtonSecurity";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { IoIosHome } from "react-icons/io";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";

function ContentManager() {
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <h4 className="font-barlow-condensed text-xl font-bold uppercase">
            Selecciona una sección a configurar
          </h4>
          <div className="flex flex-col md:flex-row gap-6">
            <Link to={"/content-manager/landing"}>
              <ButtonSecurity
                icono={<BsPcDisplayHorizontal className="text-6xl" />}
                texto={"Configuración de Langing Page"}
              />
            </Link>
            <Link to={"/content-manager/home"}>
              <ButtonSecurity
                icono={<IoIosHome className="text-6xl" />}
                texto={"Configuración de la Sección Principal"}
              />
            </Link>
            <Link to={"/content-manager/academic-requests"}>
              <ButtonSecurity
                icono={<FaGraduationCap className="text-6xl" />}
                texto={"Info de Solicitudes Académicas"}
              />
            </Link>
          </div>
        </div>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </div>
    </>
  );
}

export default ContentManager;
