import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import FormRegister from "../Components/Forms/FormRegistrer";
import NavLogin from "../Components/NavLogin";
import FormEmailVerify from "../Components/Forms/FormEmailVerify";
import AcademicRequests from "../Components/AcademicRequests";

function Register() {
  const auth = useSelector((state) => state.auth.value)

  return (
    <>
      <NavLogin />
      <main className="bg-Blanco min-h-[100vh] py-10 flex flex-col items-center justify-center">
          <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6 mb-6">
            <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold text-center">
              {auth === "Verification" ? "ACTIVACIÓN" : "REGISTRO"}
            </h2>

            {auth === "Verification" ? <FormEmailVerify /> : <FormRegister />}
          </section>

          <AcademicRequests />
        </main>
        <Footer />
      </>
      );
}

      export default Register;
