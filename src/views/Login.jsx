import Footer from "../Components/Footer";
import FormLogin from "../Components/Forms/FormLogin";
import NavLogin from "../Components/NavLogin";

function Login() {
  return (
    <>
      <NavLogin />
      <main className="bg-Blanco h-[100vh] flex items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-10">
            <h2 className="text-verdeC text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">INICIO DE SESIÓN</h2>
            <FormLogin />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
