import { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../../../utils/notifications";
import { Label } from "flowbite-react";
import ButtonSmall from "../../Buttons/ButtonSmall";
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
      return notify.error("Falta el nombre completo", false);
    }
    if (values.email.trim() === "") {
      return notify.error("Falta el correo electrónico", false);
    }
    if (values.username.trim() === "") {
      return notify.error("Falta el nombre de usuario", false);
    }
    if (values.username.trim().length < 4) {
      return notify.error("El usuario debe tener al menos 4 caracteres", false);
    }
    if (values.username.trim().length > 20) {
      return notify.error("El usuario no puede exceder 20 caracteres", false);
    }
    if (!values.username.trim().match(/^[a-z0-9_]+$/)) {
      return notify.error("El usuario debe contener solo letras minúsculas, números y guiones bajos", false);
    }

    if (!values.password.match(/[A-Z]/)) {
      return notify.error("La contraseña debe contener al menos una mayúscula", false);
    }
    if (!values.password.match(/[a-z]/)) {
      return notify.error("La contraseña debe contener al menos una minúscula", false);
    }
    if (!values.password.match(/[0-9]/)) {
      return notify.error("La contraseña debe contener al menos un número", false);
    }
    if (!values.password.match(/[^a-zA-Z0-9]/)) {
      return notify.error("La contraseña debe contener al menos un carácter especial", false);
    }
    if (!(values.password == values.confirmPassword)) {
      return notify.error("Las contraseñas no coinciden", false);
    }
    if (values.password.trim() === "") {
      return notify.error("Ingresa la nueva contraseña", false);
    }
    if (values.confirmPassword.trim() === "") {
      return notify.error("Confirma la nueva contraseña", false);
    }
    if (values.password.length < 8) {
      return notify.error("La contraseña debe tener al menos 8 caracteres", false);
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
              Nombre de usuario:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              placeholder={"Usuario del administrador..."}
              autoComplete="username"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </div>
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Registrar"} />
      </form>
    </>
  );
}
