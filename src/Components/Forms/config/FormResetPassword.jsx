import { Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import notify from "../../../utils/notifications";
import { forgotPassword } from "../../../services/auth/authService";

let defaultValues = {
  "emailOrUsername": ""
}

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FormResetPassword() {
  const dispatch = useDispatch()

  const [values, setValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validarEmailOUsername = (emailOrUsername) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexUsername = /^[a-zA-Z0-9_-]{4,16}$/;
    return regexEmail.test(emailOrUsername) || regexUsername.test(emailOrUsername);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.emailOrUsername.trim() === "") {
      return notify.error("Falta el nombre de usuario o correo de tu cuenta", false);
    }
    if (!validarEmailOUsername(values.emailOrUsername)) {
      return notify.error("Correo electrónico no válido", false);
    }

    dispatch(forgotPassword(values))
  };

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"SOLICITAR CAMBIO DE CONTRASEÑA"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Ingresa tu nombre de usuario o correo electrónico de tu cuenta:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="emailOrUsername"
              value={values.emailOrUsername}
              onChange={handleInputChange}
              placeholder="Nombre de usuario o correo"
            />
          </div>
        </div>
        <ButtonSmall
          action={handleSubmit}
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Solicitar Cambio"}
        />
      </form>
    </>
  );
}

export default FormResetPassword;