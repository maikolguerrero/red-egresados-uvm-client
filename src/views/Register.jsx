import Footer from "../Components/Footer";
import FormLogin from "../Components/Forms/FormLogin";
import FormRegister from "../Components/Forms/FormRegistrer";
import NavLogin from "../Components/NavLogin";

function Register() {
  return (
    <>
      <NavLogin />
      <main className="bg-Blanco h-auto py-10 flex items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6">
          <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">
            REGISTRO
          </h2>
          
          <FormRegister />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Register;
