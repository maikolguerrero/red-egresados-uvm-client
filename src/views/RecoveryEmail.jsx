import { Bounce, ToastContainer } from "react-toastify";
import Footer from "../Components/Footer";
import FormLogin from "../Components/Forms/FormLogin";
import NavLogin from "../Components/NavLogin";
import AcademicRequests from "../Components/AcademicRequests";
import FormRecoverEmail from "../Components/Forms/FormRecoverEmail";

function RecoveryEmail() {
  return (
    <>
      <NavLogin />
      <main className="bg-Blanco h-[100vh] flex flex-col items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-10 mb-6">
          <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">
            RECUPERAR CORREO
          </h2>
          <p className="text-Negro text- md:text-base font-barlow-condensed font-medium text-center">
            Ingresa tu <span className="text-RojoC">nombre de usuario</span> o <span className="text-RojoC">correo electrónico</span> para cambiar el correo de tu cuenta y verificarlo. (Aplica solo a los <span className="text-verdeB">usuarios que no han verificado su correo electrónico</span>)
          </p>
          <FormRecoverEmail />
        </section>

      <AcademicRequests />
    </main >

      <Footer />
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

export default RecoveryEmail;
