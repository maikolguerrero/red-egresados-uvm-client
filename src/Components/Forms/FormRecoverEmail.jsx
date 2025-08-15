import { FaLock, FaUserCircle } from "react-icons/fa";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdEmail } from "react-icons/md";
import { changeEmailRecovery } from "../../services/auth/authServiceApiFetch";

let defaultValues = {
  emailOrUsername: "",
  "newEmail": "",
  "password": ""
}

function FormRecoverEmail(props) {
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
    dispatch(changeEmailRecovery(values))
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="text"
            name="emailOrUsername"
            value={values.emailOrUsername}
            onChange={handleInputChange}
            placeholder="Nombre de usuario o correo electrónico"
          />
          <FaUserCircle className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="email"
            name="newEmail"
            value={values.newEmail}
            onChange={handleInputChange}
            placeholder="Nuevo correo electrónico"
          />
          <MdEmail className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Escribe tu contraseña"
          />
          <FaLock className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="ENVIAR CODIGO" />
        </div>

        <div className="flex flex-col gap-2 mt-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            <Link to={"/login"} className="text-verdeC">
              Regresar a Iniciar Sesión.
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default FormRecoverEmail;
