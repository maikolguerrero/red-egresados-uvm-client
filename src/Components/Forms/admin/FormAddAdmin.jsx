import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { typeError } from "../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { resolveReport } from "../../../services/reports/reportsService";
import { addAdmin } from "../../../services/admin/adminsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddAdmin() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
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
    if (values.fullName.trim() === "") {
      return enqueueSnackbar("Se debe escribir el nombre", typeError);
    }
    if (values.email.trim() === "") {
      return enqueueSnackbar("Se debe escribir el correo", typeError);
    }
    if (values.username.trim() === "") {
      return enqueueSnackbar("Se debe escribir el usuario", typeError);
    }
    if (values.password.trim() === "") {
      return enqueueSnackbar("Se debe escribir una contraseña", typeError);
    }
    if (values.password != values.confirmPassword) {
      return enqueueSnackbar("Las contraseñas no son iguales", typeError);
    }
    
    dispatch(addAdmin(values))
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"REGISTRAR ADMIN"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Nombre completo:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleInputChange}
              placeholder={"Nombre completo para el administrador..."}
            />
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Correo electrónico:
            </Label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              placeholder={"Correo electronico del administrador..."}
            />
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Usuario:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              placeholder={"Usuario del administrador..."}
            />
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Contraseña:
            </Label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder={"********"}
            />
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Confirmar contraseña:
            </Label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInputChange}
              placeholder={"********"}
            />
          </div>
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Registrar"} />
      </form>
    </>
  );
}
