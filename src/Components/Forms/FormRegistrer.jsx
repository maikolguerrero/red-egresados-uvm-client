import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { postData } from "../../services/usersService";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { actived } from "../../features/authSlice";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValues = {
  "idNumber": "",
  "studentId": "",
  "firstName": "",
  "lastName": "",
  "birthDate": "",
  "degree": "",
  "mention": "",
  "graduationDate": "",
  "email": "",
  "username": "",
  "password": "",
  "passwordConfirm": "",
  "location": ""
}

function FormRegister(props) {
  const dispatch = useDispatch()

  const [values, setValues] = useState({})

  useEffect(() => {
    setValues(defaultValues)
  }, [])

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
      dispatch(postData(values))
    } else {
      toast.error("Contraseñas no coinciden", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>DATOS PERSONALES</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Nombres"
              />
            </div>
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                placeholder="Apellidos"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="text"
                name="idNumber"
                value={values.idNumber}
                onChange={handleInputChange}
                placeholder="Cédula"
              />
              <input
                className={styles.input}
                type="date"
                name="birthDate"
                value={values.birthDate}
                onChange={handleInputChange}
                placeholder="Fecha de Nacimiento"
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
            <div className="w-full flex relative">
              <textarea
                className={styles.input}
                type="text"
                name="location"
                value={values.location}
                onChange={handleInputChange}
                placeholder="Ubicación"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>DATOS UNIVERSITARIOS</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="degree"
                value={values.degree}
                onChange={handleInputChange}
                placeholder="Facultad"
              />
            </div>
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="mention"
                value={values.mention}
                onChange={handleInputChange}
                placeholder="Mención"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="text"
                name="studentId"
                value={values.studentId}
                onChange={handleInputChange}
                placeholder="N° Expediente"
              />
              <input
                className={styles.input}
                type="date"
                name="graduationDate"
                value={values.graduationDate}
                onChange={handleInputChange}
                placeholder="Fecha de Grado"
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

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="text-verdeC">
              Inicia Sesión Aquí.
            </Link>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="REGISTRARME" />
        </div>
      </form>
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
