import { Link } from "react-router-dom";
import Button from "../Components/Buttons/Button";
import { FaExclamationTriangle } from "react-icons/fa";
import Footer from "../Components/Footer";
import NavLogin from "../Components/NavLogin";

function Error404() {
    return (
        <>
            <NavLogin />
            <main className="bg-Blanco min-h-[100vh] flex flex-col items-center justify-center">
                <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-10 mb-6">
                    {/* Icono de error */}
                    <div className="text-RojoC">
                        <FaExclamationTriangle className="w-16 h-16 mx-auto" />
                    </div>

                    {/* Título */}
                    <h1 className="text-5xl md:text-6xl font-bold font-barlow-condensed text-RojoC">
                        404
                    </h1>

                    {/* Subtítulo */}
                    <h2 className="text-2xl md:text-3xl font-semibold font-barlow-semi-condensed text-verdeD text-center">
                        Página no encontrada
                    </h2>

                    {/* Mensaje */}
                    <p className="text-lg font-barolw text-Negro text-center">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>

                    {/* Botón para volver al inicio */}
                    <Link to="/" className="w-full">
                    <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
                        <Button className={"w-full"} text="Volver al inicio" />
                    </div>
                    </Link>

                 
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Error404;