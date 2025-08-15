import { useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import notify from "../../utils/notifications";
import { changeRecoveryPassword } from "../../services/auth/changeEmailService";
import { useDispatch } from "react-redux";

function FormRecoverA(props) {
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    emailOrUsername: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.emailOrUsername.trim() === "") {
      return notify.error("Falta el nombre de usuario o correo de tu cuenta", false);
    }
    dispatch(changeRecoveryPassword(values));
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-8 w-full"
      >
        <p className="text-Negro text- md:text-base font-barlow-condensed font-medium text-center">
          Ingresa tu <span className="text-RojoC">nombre de usuario</span> o <span className="text-RojoC">correo electrónico</span>.
        </p>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="emailOrUsername"
            value={values.emailOrUsername}
            onChange={handleInputChange}
            placeholder="Nombre de usuario o correo de tu cuenta..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 lg:justify-center gap-4">
          <Button
            className={"w-full"}
            action={handleSubmit}
            text="ENVIAR CORREO PARA RESTABLECER CONTRASEÑA"
          />
          <div className="flex flex-col gap-2 mt-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
            <p className="">
              <Link to={"/login"} className="text-verdeC">
                Regresar a Iniciar Sesión.
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormRecoverA;
