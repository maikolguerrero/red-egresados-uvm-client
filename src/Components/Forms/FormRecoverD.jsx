import Button from "../Buttons/Button";
import { Link } from "react-router-dom";

function FormRecoverD(props) {
  return (
    <>
      <form onSubmit={(e) => (
        e.preventDefault()
      )} className="flex flex-col gap-8 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="password"
            placeholder="Contraseña"
          />
        </div>

        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="passwordConfirm"
            placeholder="Confirmar Contraseña"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} action={(e) => {
            alert("Recuperaste la Contraseña")
          }} text="RESTABLECER CONTRASEÑA" />
        </div>
      </form>
    </>
  );
}

export default FormRecoverD;
