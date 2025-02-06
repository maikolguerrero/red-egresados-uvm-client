import { FaLock, FaUserCircle } from "react-icons/fa";
import Button from "../Buttons/Button";

function FormLogin(props) {
  return (
    <>
      <form className="flex flex-col gap-8 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-xl font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="username"
            placeholder="Usuario"
          />
          <FaUserCircle className="absolute right-3 top-2 text-verdeA text-2xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-xl font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          <FaLock className="absolute right-3 top-2 text-verdeA text-2xl" />
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-sm md:text-lg text-center">
          <p className="">
            ¿No tienes una cuenta?{" "}
            <a className="text-verdeC">Regístrate Aquí.</a>
          </p>
          <p>
            ¿Olvidaste tu contraseña?{" "}
            <a className="text-verdeC">Recupérala Aquí.</a>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="REGISTRO" />
          <Button className={"w-full"} text="INICIAR SESIÓN" />
        </div>
      </form>
    </>
  );
}

export default FormLogin;
