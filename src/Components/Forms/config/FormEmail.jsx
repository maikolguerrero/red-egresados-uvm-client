import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../../models/alertModels";
import { changeRecoveryEmail } from "../../../services/auth/changeEmailService";

let defaultValues = {
  "currentPassword": "",
  "newEmail": ""
}

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FormEmail() {
  const dispatch = useDispatch()

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(defaultValues);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.currentPassword.trim() === "") {
      return enqueueSnackbar("Debes colocar tu contraseña", typeError);
    }
    if (values.newEmail.trim() === "") {
      return enqueueSnackbar("Debes el nuevo correo de recuperacion", typeError);
    }
    if (!validarEmail(values.newEmail)) {
      return enqueueSnackbar("Tu correo electrónico no es válido", typeError);
    }

    dispatch(changeRecoveryEmail(values))
  };

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"CAMBIAR CORREO DE RECUPERACION"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Contraseña actual:
            </Label>
            <input
              className={styles.input}
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleInputChange}
              placeholder="********"
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Nuevo correo electronico:
            </Label>
            <textarea
              className={styles.input}
              type="email"
              name="newEmail"
              value={values.newEmail}
              onChange={handleInputChange}
              placeholder="Nuevo correo..."
            ></textarea>
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

export default FormEmail;