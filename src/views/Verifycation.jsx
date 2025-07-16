import { useEffect } from "react";
import ButtonSmall from "../Components/Buttons/ButtonSmall";
import Footer from "../Components/Footer";
import NavLogin from "../Components/NavLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../services/auth/authService";
import Button from "../Components/Buttons/Button";

function Verifycation() {
  const dispatch = useDispatch();
  const VerifyEmail = useSelector((state) => state.auth.verifyEmail)
  const location = useLocation();
  const navigate = useNavigate();

  // `location.search` contendrá los parámetros de consulta, por ejemplo, "?param1=valor1&param2=valor2"
  const queryParams = location.search;

  // Puedes usar `new URLSearchParams()` para parsear los parámetros de consulta
  const params = new URLSearchParams(queryParams);

  useEffect(() => {
    dispatch(verifyEmail(params.get("token")))
  }, []);

  const handleLogin = (e) => {
    navigate("/login")
  }

  return (
    <>
      <NavLogin />
      <main className="bg-Blanco min-h-[100vh] py-10 flex flex-col items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6 mb-6">
          <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold text-center">
            VERIFICACIÓN DE USUARIO
          </h2>
          <p className="text-Negro text- md:text-base font-barlow-condensed font-medium text-center">
            Tu cuenta{" "}
            {VerifyEmail
              ? "se ha verificado correctamente"
              : "no se ha podido verificar"}{" "}
            <a className="text-RojoC">usuario</a>.
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
            <Button action={handleLogin} className={"w-full"} text="REGRESESAR A LOGIN" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Verifycation;
