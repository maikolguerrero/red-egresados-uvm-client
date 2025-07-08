import { useEffect } from "react";
import ButtonSmall from "../Components/Buttons/ButtonSmall";
import Footer from "../Components/Footer";
import NavLogin from "../Components/NavLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../services/auth/changeEmailService";
import Button from "../Components/Buttons/Button";

function ChangeEmail() {
  const dispatch = useDispatch();
  const changeEmailNew = useSelector((state) => state.auth.changeEmail)
  const location = useLocation();
  const navigate = useNavigate();

  // `location.search` contendrá los parámetros de consulta, por ejemplo, "?param1=valor1&param2=valor2"
  const queryParams = location.search;

  // Puedes usar `new URLSearchParams()` para parsear los parámetros de consulta
  const params = new URLSearchParams(queryParams);

  useEffect(() => {
    dispatch(changeEmail(params.get("token")))
  }, []);

  const handleHome = (e) => {
    navigate("/home")
  }

  return (
    <>
      <NavLogin />
      <main className="bg-Blanco h-[100vh] flex items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-10">
          <h2 className="text-verdeC text-2xl text-center font-barlow-semi-condensed font-bold">
            CAMBIO DE CORREO DE RECUPERACION
          </h2>
          <p className="text-Negro text- md:text-base font-barlow-condensed font-medium text-center">
            Tu correo{" "}
            {changeEmailNew
              ? "se ha actualizado correctamente"
              : "no se ha podido actualizar"}{" "}
            <a className="text-RojoC">usuario</a>.
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
            <Button action={handleHome} className={"w-full"} text="REGRESESAR A HOME" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ChangeEmail;
