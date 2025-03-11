import Button from "../Buttons/Button";
import { Link } from "react-router-dom";

function FormRecoverC(props) {
  return (
    <>
      <form onSubmit={(e) => (
        e.preventDefault()
      )} className="flex flex-col gap-8 w-full">
        <p className="text-Negro text- md:text-base font-barlow-condensed font-medium text-center">
        Ingresa el código de recuperación que llego a tu <a className="text-RojoC">correo electrónico</a>.
        </p>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="code"
            placeholder="Código de Recuperación"
          />
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
          ¿No recibiste el código?{" "}
            <button type="button" className="text-verdeC">Volver a enviarlo.</button>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-center gap-4">
          <Link to={"/login"} className="w-full">
            <Button className={"w-full"} text="INICIAR SESIÓN" />
          </Link>
          <Button className={"w-full"} action={(e) => {
            props.setForm("D")
          }} text="SIGUIENTE" />
        </div>
      </form>
    </>
  );
}

export default FormRecoverC;
