import { useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../models/alertModels";
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
      return enqueueSnackbar("Debes escribir el email", typeError);
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
          Ingresa tu <a className="text-RojoC">correo electronico</a>.
        </p>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="email"
            name="emailOrUsername"
            value={values.emailOrUsername}
            onChange={handleInputChange}
            placeholder="Correo de recuperacion..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-center gap-4">
          <Link to={"/login"} className="w-full">
            <Button className={"w-full"} text="INICIAR SESIÓN" />
          </Link>
          <Button
            className={"w-full"}
            action={handleSubmit}
            text="ENVIAR CODIGO"
          />
        </div>
      </form>
    </>
  );
}

export default FormRecoverA;
