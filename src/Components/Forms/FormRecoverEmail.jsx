import { FaLock, FaUserCircle, FaVoicemail } from "react-icons/fa";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserFetch } from "../../services/auth/authService";
import { MdEmail } from "react-icons/md";

let defaultValues = {
  "newEmail": "",
  "currentPassword": ""
}

function FormRecoverEmail(props) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="email"
            name="newEmail"
            value={values.newEmail}
            onChange={handleInputChange}
            placeholder="Nuevo correo electronico..."
          />
          <MdEmail className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>
        <div className="w-full flex relative">
          <input
            className="w-full px-3 pr-11 py-1 text-sm md:text-base font-barolw rounded-lg border border-verdeA border-b-2"
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleInputChange}
            placeholder="Escribe tu contraseña"
          />
          <FaLock className="absolute right-3 top-1 md:top-1.5 text-verdeA text-xl" />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="ENVIAR CODIGO" />
        </div>
      </form>
    </>
  );
}

export default FormRecoverEmail;
