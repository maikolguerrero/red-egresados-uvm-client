import { useEffect, useState } from "react";
import ButtonSmall from "../Components/Buttons/ButtonSmall";
import Footer from "../Components/Footer";
import NavLogin from "../Components/NavLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newPassword } from "../services/auth/authService";
import Button from "../Components/Buttons/Button";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import { Label } from "flowbite-react";
import { typeError } from "../models/alertModels";
import { enqueueSnackbar } from "notistack";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function ChangePassword() {
  const dispatch = useDispatch();
  const newPasswordUpdate = useSelector((state) => state.auth.newPassword)
  const location = useLocation();
  const navigate = useNavigate();

  // `location.search` contendrá los parámetros de consulta, por ejemplo, "?param1=valor1&param2=valor2"
  const queryParams = location.search;

  // Puedes usar `new URLSearchParams()` para parsear los parámetros de consulta
  const params = new URLSearchParams(queryParams);

  const [values, setValues] = useState({})

  useEffect(() => {
    setValues({
      "newPassword": "",
      "confirmNewPassword": "",
      "token": params.get("token")
    })
    //dispatch(changeEmail(params.get("token")))
  }, []);

  useEffect(() => {
    if (newPasswordUpdate) {
      navigate("/home")
    }
  }, [newPasswordUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(values.newPassword == values.confirmNewPassword)) {
      return enqueueSnackbar("Las contraseñas no coinciden", typeError);
    }
    if (values.newPassword.trim() === "") {
      return enqueueSnackbar("Debes colocar la nueva contraseña", typeError);
    }
    if (values.confirmNewPassword.trim() === "") {
      return enqueueSnackbar("Debes confimar la nueva contraseña", typeError);
    }
    dispatch(newPassword(values))
  };

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex">
        <Nav />
        <main className="w-full px-3 py-6 md:px-6 lg:px-10 gap-14 flex justify-center items-center h-[89.5vh] overflow-y-auto">
          <form className="flex flex-col gap-5 w-full md:w-[300px] bg-Gris rounded-md border-2 border-verdeD p-4">
            <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
              {"ACTUALIZAR CONTRASEÑA"}
            </h5>
            <div className="flex flex-col gap-2">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Nueva Contraseña:
                </Label>
                <input
                  className={styles.input}
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Confirmar Contraseña:
                </Label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmNewPassword"
                  value={values.confirmNewPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                />
              </div>
            </div>
            <ButtonSmall
              action={handleSubmit}
              className={"bg-verdeD hover:bg-RojoC"}
              text={"Actualizar"}
            />
          </form>
        </main>
      </div>
    </>
  );
}

export default ChangePassword;
