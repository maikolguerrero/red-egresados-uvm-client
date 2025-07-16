import { FaLock, FaUserCircle } from "react-icons/fa";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserFetch } from "../../services/auth/authService";

let defaultValues = {
  "emailOrUsername": "",
  "password": ""
}

function FormLogin(props) {
  const dispatch = useDispatch()

  const [values, setValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserFetch(values));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="emailOrUsername"
            value={values.emailOrUsername}
            onChange={handleInputChange}
            placeholder="Nombre de usuario"
          />
          <FaUserCircle className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Contraseña"
          />
          <FaLock className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            ¿No tienes una cuenta?{" "}
            <Link to={"/register"} className="text-verdeC">
              Regístrate Aquí.
            </Link>
          </p>
          <p className="">
            ¿No has verificado tu cuenta?{" "}
            <Link to={"/recover/change-email"} className="text-verdeC">
              Verificala Aquí.
            </Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña?{" "}
            <Link to={"/recover-password"} className="text-verdeC">
              Recupérala Aquí.
            </Link>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="INICIAR SESIÓN" />
        </div>
      </form>
    </>
  );
}

export default FormLogin;
