import { FaLock, FaUserCircle } from "react-icons/fa";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";

function FormLogin(props) {
  return (
    <>
      <form className="flex flex-col gap-8 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="username"
            placeholder="Usuario"
          />
          <FaUserCircle className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          <FaLock className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            ¿No tienes una cuenta?{" "}
            <Link to={"/register"} className="text-verdeC">Regístrate Aquí.</Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña?{" "}
            <Link to={"/recover-password"} className="text-verdeC">Recupérala Aquí.</Link>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="INICIAR SESIÓN" />
        </div>
      </form>
    </>
  );
}

export default FormLogin;
