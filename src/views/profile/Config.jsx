import { FaKey } from "react-icons/fa";
import { ButtonSecurity } from "../../Components/Buttons/ButtonSecurity";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { MdEmail } from "react-icons/md";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";

function Config() {
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <h4 className="font-barlow-condensed text-xl font-bold uppercase">
            Opciones de Seguridad
          </h4>
          <div className="flex gap-6">
            <ButtonSecurity
              icono={<FaKey className="text-6xl" />}
              texto={"Cambio de Contraseña"}
            />
            <ButtonSecurity
              icono={<MdEmail className="text-6xl" />}
              texto={"Cambio de Correo de Recuperación"}
            />
          </div>
        </div>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </div>
    </>
  );
}

export default Config;
