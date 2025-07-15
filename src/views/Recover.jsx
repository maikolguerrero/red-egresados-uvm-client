import { useState } from "react";
import Footer from "../Components/Footer";
import FormLogin from "../Components/Forms/FormLogin";
import FormRecoverA from "../Components/Forms/FormRecoverA";
import NavLogin from "../Components/NavLogin";
import FormRecoverB from "../Components/Forms/FormRecoverB";
import FormRecoverC from "../Components/Forms/FormRecoverC";
import FormRecoverD from "../Components/Forms/FormRecoverD";

function Recover() {
    const [form, setForm] = useState("A")
  return (
    <>
      <NavLogin />
      <main className="bg-Blanco min-h-[100vh] py-10 flex flex-col items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6 mb-6">
          <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold text-center">
            RECUPERAR CONTRASEÑA
          </h2>

          {form === "A" ? (
            <FormRecoverA setForm={setForm} />
          ) : form === "B" ? (
            <FormRecoverB setForm={setForm} />
          ) : (
            form === "C" ? (
                <FormRecoverC setForm={setForm} />
              ) : (
                <FormRecoverD setForm={setForm} />
              )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Recover;
