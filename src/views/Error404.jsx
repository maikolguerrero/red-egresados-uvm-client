// // src/views/Error404.jsx
// import { Link } from "react-router-dom";
// import { Button } from "flowbite-react";
// import { FaExclamationTriangle, FaHome } from "react-icons/fa";
// import Footer from "../Components/Footer";

// export default function Error404() {
//     return (
//         // <div className="min-h-screen flex flex-col items-center justify-center bg-Gris p-4">
//             <main className="bg-Blanco h-[100vh] flex flex-col items-center justify-center">

//                 <div className="text-center max-w-md md:max-w-2xl">
//                     {/* Icono de error */}
//                     <div className="mx-auto mb-6 text-RojoC">
//                         <FaExclamationTriangle className="w-20 h-20 mx-auto" />
//                     </div>

//                     {/* Título */}
//                     <h1 className="text-5xl md:text-6xl font-bold font-barlow-condensed text-RojoC mb-4">
//                         404
//                     </h1>

//                     {/* Subtítulo */}
//                     <h2 className="text-2xl md:text-3xl font-semibold font-barlow-semi-condensed text-verdeD mb-6">
//                         Página no encontrada
//                     </h2>

//                     {/* Mensaje */}
//                     <p className="text-lg font-barolw text-Negro mb-8">
//                         Lo sentimos, la página que estás buscando no existe o ha sido movida.
//                     </p>

//                     {/* Botón para volver al inicio con icono */}
//                     <Link to="/">
//                         <Button
//                             color="failure"
//                             className="bg-RojoB hover:bg-RojoC font-barolw px-6 py-3 flex items-center gap-2"
//                         >
//                             <FaHome className="w-5 h-5" />
//                             <span>Volver al inicio</span>
//                         </Button>
//                     </Link>
//                 </div>
//                 <Footer />
//             </main>
//     );
// }


// src/views/Error404.jsx
import { Link } from "react-router-dom";
import Button from "../Components/Buttons/Button";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
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