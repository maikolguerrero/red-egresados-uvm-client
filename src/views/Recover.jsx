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
      <main className="bg-Blanco h-[100vh] flex items-center justify-center">
        <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-10">
          <h2 className="text-verdeC text-center text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">
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
