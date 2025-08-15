import { useEffect, useState } from "react";
import ButtonSmall from "../Components/Buttons/ButtonSmall";
import Footer from "../Components/Footer";
import NavLogin from "../Components/NavLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newPassword } from "../services/auth/authService";
import Header from "../Components/Header";
import { Label } from "flowbite-react";
import notify from "../utils/notifications";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function ChangePassword() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)
  const location = useLocation();
  const navigate = useNavigate();

  // `location.search` contendrá los parámetros de consulta, por ejemplo, "?param1=valor1&param2=valor2"
  const queryParams = location.search;

  // Puedes usar `new URLSearchParams()` para parsear los parámetros de consulta
  const params = new URLSearchParams(queryParams);

  const token = params.get("token")

  const defaultValues = {
    "newPassword": "",
    "confirmNewPassword": "",
    "token": token ? token : ""
  }

  const [values, setValues] = useState(defaultValues)


  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    //dispatch(changeEmail(params.get("token")))
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
    if (!(values.newPassword == values.confirmNewPassword)) {
      return notify.error("Las contraseñas no coinciden", false);
    }
    if (values.newPassword.trim() === "") {
      return notify.error("Ingresa la nueva contraseña", false);
    }
    if (values.confirmNewPassword.trim() === "") {
      return notify.error("Confirma la nueva contraseña", false);
    }
    dispatch(newPassword(values));
    navigate("/login")
  };

  return (
    <>
      {token && (
        <>
          {role === "" ? (
            <NavLogin />
          ) : (
            <Header />
          )}
          <div className="flex">
            <main className="w-full px-3 py-6 md:px-6 lg:px-10 gap-14 flex justify-center items-center h-[100vh] overflow-y-auto">
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
          <Footer />
        </>
      )}
    </>
  );
}

export default ChangePassword;
