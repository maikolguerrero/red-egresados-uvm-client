import { ButtonSecurity } from "../../Components/Buttons/ButtonSecurity";
import { IoIosHome } from "react-icons/io";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";

function ContentManager() {
  return (
    <>
      <h4 className="font-barlow-condensed text-xl font-bold uppercase">
        Selecciona una sección a configurar
      </h4>
      {/* <div className="flex flex-col md:flex-row gap-6"> */}
      <div className="flex flex-col md:flex-row flex-wrap md:justify-center gap-6">
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
    </>
  );
}

export default ContentManager;
