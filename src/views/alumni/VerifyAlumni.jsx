// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyAlumni, resetAlumniVerification } from "../../services/alumni/alumniService";
// import { Loader } from "../../Components/Loader";
// import Button from "../../Components/Buttons/Button";

// function VerifyAlumni() {
//   const dispatch = useDispatch();
//   const { loading, alumniData, error } = useSelector((state) => state.alumni);
//   const [nacionalidad, setNacionalidad] = useState("V");
//   const [cedulaNum, setCedulaNum] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const cedula = `${nacionalidad}-${cedulaNum.trim()}`;
//     dispatch(verifyAlumni(cedula));
//   };

//   const handleReset = () => {
//     dispatch(resetAlumniVerification());
//     setCedulaNum("");
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Verificar Egresado</h2>

//       {!alumniData ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex gap-2">
//             <select
//               className="w-16 px-3 py-2 border border-gray-300 rounded-lg"
//               value={nacionalidad}
//               onChange={(e) => setNacionalidad(e.target.value)}
//             >
//               <option value="V">V</option>
//               <option value="E">E</option>
//             </select>
//             <input
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
//               type="text"
//               value={cedulaNum}
//               onChange={(e) => setCedulaNum(e.target.value)}
//               placeholder="Número de Cédula"
//               pattern="\d*"
//               required
//             />
//           </div>

//           <Button 
//             type="submit" 
//             className="w-full" 
//             disabled={loading}
//             text={loading ? "Verificando..." : "Verificar"}
//           />
//         </form>
//       ) : (
//         <div className="space-y-4">
//           {alumniData.esEgresado ? (
//             <>
//               <div className="p-4 bg-green-50 rounded-lg">
//                 <h3 className="font-bold text-green-800">¡Egresado verificado!</h3>
//                 <p className="mt-2"><span className="font-semibold">Cédula:</span> {alumniData.datos.cedula}</p>
//                 <p><span className="font-semibold">Nombre:</span> {alumniData.datos.nombreCompleto}</p>

//                 {alumniData.datos.carrerasPregrado?.length > 0 && (
//                   <div className="mt-3">
//                     <h4 className="font-semibold">Títulos de Pregrado:</h4>
//                     <ul className="list-disc pl-5">
//                       {alumniData.datos.carrerasPregrado.map((carrera, index) => (
//                         <li key={`pregrado-${index}`}>
//                           {carrera.carrera} - {new Date(carrera.fechaGrado).toLocaleDateString()}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {alumniData.datos.programasPostgrado?.length > 0 && (
//                   <div className="mt-3">
//                     <h4 className="font-semibold">Títulos de Postgrado:</h4>
//                     <ul className="list-disc pl-5">
//                       {alumniData.datos.programasPostgrado.map((programa, index) => (
//                         <li key={`postgrado-${index}`}>
//                           {programa.programa} - {new Date(programa.fechaGrado).toLocaleDateString()}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="p-4 bg-yellow-50 rounded-lg">
//               <p className="text-yellow-800">No se encontró un egresado con esta cédula.</p>
//             </div>
//           )}

//           <Button 
//             onClick={handleReset}
//             className="w-full"
//             text="Realizar otra verificación"
//           />
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyAlumni;


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyAlumni } from "../../services/alumni/alumniService";
// import { resetAlumniVerification } from "../../features/alumni/alumniSlice";
// import Footer from "../../Components/Footer";
// import NavLogin from "../../Components/NavLogin";
// import Button from "../../Components/Buttons/Button";
// import { Loader } from "../../Components/Loader";

// function VerifyAlumni() {
//     const dispatch = useDispatch();
//     const { loading, alumniData, error } = useSelector((state) => state.alumni);
//     const [nacionalidad, setNacionalidad] = useState("V");
//     const [cedulaNum, setCedulaNum] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const cedula = `${nacionalidad}-${cedulaNum.trim()}`;
//         dispatch(verifyAlumni(cedula));
//     };

//     const handleReset = () => {
//         dispatch(resetAlumniVerification());
//         setCedulaNum("");
//     };

//     return (
//         <>
//             <NavLogin />
//             <main className="bg-Blanco min-h-[100vh] py-10 flex items-center justify-center">
//                 <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6">
//                     <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">
//                         VERIFICACIÓN DE EGRESADO
//                     </h2>

//                     {!alumniData ? (
//                         <form onSubmit={handleSubmit} className="w-full space-y-4">
//                             <div className="flex gap-2 w-full">
//                                 <select
//                                     className="w-16 px-3 py-2 border border-gray-300 rounded-lg"
//                                     value={nacionalidad}
//                                     onChange={(e) => setNacionalidad(e.target.value)}
//                                 >
//                                     <option value="V">V</option>
//                                     <option value="E">E</option>
//                                 </select>
//                                 <input
//                                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
//                                     type="text"
//                                     value={cedulaNum}
//                                     onChange={(e) => setCedulaNum(e.target.value)}
//                                     placeholder="Número de Cédula"
//                                     pattern="\d*"
//                                     required
//                                 />
//                             </div>

//                             <Button
//                                 type="submit"
//                                 className="w-full"
//                                 disabled={loading}
//                                 text={loading ? "Verificando..." : "Verificar"}
//                             />
//                         </form>
//                     ) : (
//                         <div className="w-full space-y-4">
//                             {alumniData.esEgresado ? (
//                                 <>
//                                     <div className="p-4 bg-green-50 rounded-lg">
//                                         <h3 className="font-bold text-green-800">¡Egresado verificado!</h3>
//                                         <p className="mt-2"><span className="font-semibold">Cédula:</span> {alumniData.datos.cedula}</p>
//                                         <p><span className="font-semibold">Nombre:</span> {alumniData.datos.nombreCompleto}</p>

//                                         {alumniData.datos.carrerasPregrado?.length > 0 && (
//                                             <div className="mt-3">
//                                                 <h4 className="font-semibold">Títulos de Pregrado:</h4>
//                                                 <ul className="list-disc pl-5">
//                                                     {alumniData.datos.carrerasPregrado.map((carrera, index) => (
//                                                         <li key={`pregrado-${index}`}>
//                                                             {carrera.carrera} - {new Date(carrera.fechaGrado).toLocaleDateString()}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         )}

//                                         {alumniData.datos.programasPostgrado?.length > 0 && (
//                                             <div className="mt-3">
//                                                 <h4 className="font-semibold">Títulos de Postgrado:</h4>
//                                                 <ul className="list-disc pl-5">
//                                                     {alumniData.datos.programasPostgrado.map((programa, index) => (
//                                                         <li key={`postgrado-${index}`}>
//                                                             {programa.programa} - {new Date(programa.fechaGrado).toLocaleDateString()}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="p-4 bg-yellow-50 rounded-lg">
//                                     <p className="text-yellow-800">No se encontró un egresado con esta cédula.</p>
//                                 </div>
//                             )}

//                             <Button
//                                 onClick={handleReset}
//                                 className="w-full"
//                                 text="Realizar otra verificación"
//                             />
//                         </div>
//                     )}

//                     {error && (
//                         <div className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
//                             {error}
//                         </div>
//                     )}
//                 </section>
//             </main>
//             <Footer />
//         </>
//     );
// }

// export default VerifyAlumni;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyAlumni } from "../../services/alumni/alumniService";
// import { resetAlumniVerification } from "../../features/alumni/alumniSlice";
// import Footer from "../../Components/Footer";
// import NavLogin from "../../Components/NavLogin";
// import Button from "../../Components/Buttons/Button";
// import { Loader } from "../../Components/Loader";

// function VerifyAlumni() {
//   const dispatch = useDispatch();
//   const { loading, alumniData, error } = useSelector((state) => state.alumni);
//   const [nacionalidad, setNacionalidad] = useState("V");
//   const [cedulaNum, setCedulaNum] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const cedula = `${nacionalidad}-${cedulaNum.trim()}`;
//     dispatch(verifyAlumni(cedula));
//   };

//   const handleReset = () => {
//     alert("Verificación reiniciada");
//     dispatch(resetAlumniVerification());
//     setCedulaNum("");
//     setNacionalidad("V");
//   };

//   return (
//     <>
//       <NavLogin />
//       <main className="bg-Blanco min-h-[100vh] py-10 flex items-center justify-center">
//         <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6">
//           <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl font-barlow-semi-condensed font-bold">
//             VERIFICACIÓN DE EGRESADO
//           </h2>

//           {!alumniData ? (
//             <form onSubmit={handleSubmit} className="w-full space-y-4">
//               <div className="flex gap-2 w-full">
//                 <select
//                   className="w-16 px-3 py-2 border border-gray-300 rounded-lg"
//                   value={nacionalidad}
//                   onChange={(e) => setNacionalidad(e.target.value)}
//                 >
//                   <option value="V">V</option>
//                   <option value="E">E</option>
//                 </select>
//                 <input
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
//                   type="text"
//                   value={cedulaNum}
//                   onChange={(e) => setCedulaNum(e.target.value)}
//                   placeholder="Número de Cédula"
//                   pattern="\d*"
//                   required
//                 />
//               </div>

//               <Button 
//                 type="submit" 
//                 className="w-full" 
//                 disabled={loading}
//                 text={loading ? "Verificando..." : "Verificar"}
//               />
//             </form>
//           ) : (
//             <div className="w-full space-y-4">
//               {alumniData.esEgresado ? (
//                 <>
//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <h3 className="font-bold text-green-800">¡Egresado verificado!</h3>
//                     <p className="mt-2"><span className="font-semibold">Cédula:</span> {alumniData.datos.cedula}</p>
//                     <p><span className="font-semibold">Nombre:</span> {alumniData.datos.nombreCompleto}</p>

//                     {alumniData.datos.carrerasPregrado?.length > 0 || alumniData.datos.programasPostgrado?.length > 0 ? (
//                       <div className="mt-3">
//                         <h4 className="font-semibold">Títulos Obtenidos:</h4>
//                         <ul className="list-disc pl-5">
//                           {/* Mostrar todos los títulos de pregrado */}
//                           {alumniData.datos.carrerasPregrado?.map((carrera, index) => (
//                             <li key={`titulo-${index}`}>
//                               {carrera.carrera} - {new Date(carrera.fechaGrado).toLocaleDateString()}
//                             </li>
//                           ))}
//                           {/* Mostrar todos los títulos de postgrado */}
//                           {alumniData.datos.programasPostgrado?.map((programa, index) => (
//                             <li key={`titulo-${index + (alumniData.datos.carrerasPregrado?.length || 0)}`}>
//                               {programa.programa} - {new Date(programa.fechaGrado).toLocaleDateString()}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="mt-2">No se encontraron títulos registrados.</p>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="p-4 bg-yellow-50 rounded-lg">
//                   <p className="text-yellow-800">No se encontró un egresado con esta cédula.</p>
//                 </div>
//               )}

//                 <Button 
//                   onClick={handleReset()}
//                   className="w-full mt-4"
//                   text="Realizar otra verificación"
//                 />
//             </div>
//           )}

//           {error && (
//             <div className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default VerifyAlumni;



import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAlumni } from "../../services/alumni/alumniService";
import { resetAlumniVerification } from "../../features/alumni/alumniSlice";
import Footer from "../../Components/Footer";
import NavLogin from "../../Components/NavLogin";
import Button from "../../Components/Buttons/Button";
import AcademicRequests from "../../Components/AcademicRequests";

function VerifyAlumni() {
    const dispatch = useDispatch();
    const { loading, alumniData, error } = useSelector((state) => state.alumni);
    const [nacionalidad, setNacionalidad] = useState("V");
    const [cedulaNum, setCedulaNum] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const cedula = `${nacionalidad}-${cedulaNum.trim()}`;
        dispatch(verifyAlumni(cedula));
    };

    const handleReset = () => {
        dispatch(resetAlumniVerification());
        setCedulaNum("");
        setNacionalidad("V");
    };

    let styles = {
        input:
            "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
        input_select:
            "w-16 px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
    };

    return (
        <>
            <NavLogin />
            <main className="bg-Blanco min-h-[100vh] py-10 flex flex-col items-center justify-center">
                <section className="bg-Gris w-[80%] md:w-[60%] lg:w-[40%] h-auto rounded-xl border-verdeC border-2 py-8 px-6 flex flex-col items-center gap-6 mb-6">
                    <h2 className="text-verdeC text-2xl md:text-3xl lg:text-4xl text-center font-barlow-semi-condensed font-bold">
                        VERIFICACIÓN DE EGRESADO
                    </h2>

                    {!alumniData ? (
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <div className="flex gap-2 w-full">
                                <select
                                    className={styles.input_select}
                                    value={nacionalidad}
                                    onChange={(e) => setNacionalidad(e.target.value)}
                                >
                                    <option value="V">V</option>
                                    <option value="E">E</option>
                                </select>
                                <input
                                    className={styles.input}
                                    type="text"
                                    value={cedulaNum}
                                    onChange={(e) => setCedulaNum(e.target.value)}
                                    placeholder="Número de Cédula (12345678)"
                                    pattern="\d*"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                                text={loading ? "Verificando..." : "Verificar"}
                            />
                        </form>
                    ) : (
                        <div className="w-full space-y-4">
                            {alumniData.esEgresado ? (
                                <>
                                    <div className="p-4 bg-white rounded-lg">
                                        <h3 className="font-bold text-verdeC">Egresado verificado</h3>
                                        <p className="mt-2"><span className="font-semibold">Cédula:</span> {alumniData.datos.cedula}</p>
                                        <p><span className="font-semibold">Nombre:</span> {alumniData.datos.nombreCompleto}</p>

                                        {alumniData.datos.carrerasPregrado?.length > 0 || alumniData.datos.programasPostgrado?.length > 0 ? (
                                            <div className="mt-3">
                                                <h4 className="font-semibold">Títulos Obtenidos:</h4>
                                                <ul className="list-disc pl-5">
                                                    {alumniData.datos.carrerasPregrado?.map((carrera, index) => (
                                                        <li key={`titulo-pre-${index}`}>
                                                            {carrera.carrera} - {new Date(carrera.fechaGrado).toLocaleDateString()}
                                                        </li>
                                                    ))}
                                                    {alumniData.datos.programasPostgrado?.map((programa, index) => (
                                                        <li key={`titulo-post-${index}`}>
                                                            {programa.programa} - {new Date(programa.fechaGrado).toLocaleDateString()}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="mt-2">No se encontraron títulos registrados.</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 bg-RojoA rounded-lg">
                                    <p className="text-Blanco">No se encontró un egresado con esta cédula.</p>
                                </div>
                            )}

                            <Button
                                action={handleReset}
                                className="w-full mt-4"
                                text="Realizar otra verificación"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                </section>

            <AcademicRequests />

            </main>
            <Footer />
        </>
    );
}

export default VerifyAlumni;