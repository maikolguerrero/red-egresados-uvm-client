import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer } from 'react-toastify';
import { typeError } from "../../models/alertModels";
import { useDispatch } from "react-redux";
import { postData } from "../../services/auth/authService";
import { enqueueSnackbar } from "notistack";
let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  input_select:
    "w-16 px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValues = {
  "cedula": "",
  "nacionalidad": "V",
  "cedulaNum": "",
  "nombreCompleto": "",
  "email": "",
  "username": "",
  "password": "",
  "passwordConfirm": ""
}

function FormRegister(props) {
  const dispatch = useDispatch()

  const [values, setValues] = useState(defaultValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password === values.passwordConfirm) {
      values.cedula = `${values.nacionalidad}-${values.cedulaNum.trim()}`;
      values.nombreCompleto = values.nombreCompleto.trim();
      values.email = values.email.trim();
      values.username = values.username.trim();
      values.password = values.password.trim();
      values.passwordConfirm = values.passwordConfirm.trim();

      dispatch(postData(values))
    } else {
      enqueueSnackbar("Contraseñas no coinciden", typeError);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>DATOS PERSONALES</h4>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2"> {/* Usamos 'gap-2' para un pequeño espacio entre ellos */}
              <select
                name="nacionalidad"
                value={values.nacionalidad}
                onChange={handleInputChange}
                // className="w-16 h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-verdeD focus:border-verdeD" // Ajusta estos estilos a tu 'styles.input' si es posible
                className={styles.input_select}
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </select>
              <input
                className={styles.input} // Aplicamos los estilos existentes para el input de texto
                type="text"
                name="cedulaNum"
                value={values.cedulaNum}
                onChange={handleInputChange}
                placeholder="Número de Cédula (12345678)"
              />
            </div>

            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="nombreCompleto"
                value={values.nombreCompleto}
                onChange={handleInputChange}
                placeholder="Nombres y Apellidos (en ese orden)"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>DATOS DE USUARIO</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                placeholder="Usuario"
              />
            </div>
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
              />
              <input
                className={styles.input}
                type="password"
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleInputChange}
                placeholder="Confirmar Contraseña"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="REGISTRARTE" />
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="text-verdeC">
              Inicia Sesión Aquí.
            </Link>
          </p>
        </div>
      </form >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default FormRegister;
