import Footer from "../Components/Footer";
import Header from "../Components/Header";
import professionals from "../../public/ProfesionalesUVM.png"
import { FaGraduationCap } from "react-icons/fa6";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { useState } from "react";

function Landing() {
  const [accordion, setAccordion] = useState(false)
  const [accordion2, setAccordion2] = useState(false)
  const [accordion3, setAccordion3] = useState(false)
  const [accordion4, setAccordion4] = useState(false)
  const [accordion5, setAccordion5] = useState(false)
  const [accordion6, setAccordion6] = useState(false)
  const [accordion7, setAccordion7] = useState(false)
  const [accordion8, setAccordion8] = useState(false)
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <figure className="w-full h-[200px] md:h-[250px] xl:h-[350px] bg-cover bg-center bg-no-repeat bg-[url('../../public/ProfesionalesUVM.png')]"></figure>

      <section className="flex flex-col justify-center items-center gap-4 pt-16 pb-16 px-4">
        <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
          RED DE EGRESADOS
        </h3>
        <p className="w-5/6 lg:w-4/6 font-barolw text-center text-xs md:text-sm xl:text-base text-Negro">
          La red de engreados de la Univesidad Valle del Momboy, es un espacio
          profesional para todos nuestros egresados donde pueden establecer
          nuevas redes de colaboracion con diversos egresados de nuestras
          facultades, ampliando su capital social y permitiendo un crecimiento
          en el campo laboral gracias a foros y eventos realizados por la red.
        </p>
      </section>

      <section className="flex gap-6 px-4 md:px-6 lg:px-10 pt-16 pb-16 justify-center items-center flex-wrap">
        <div className="flex flex-col items-center justify-center w-[200px]">
          <figure className="text-RojoC">
            <FaGraduationCap className="text-5xl" />
          </figure>
          <h5 className="text-RojoC font-barlow-semi-condensed font-bold text-base">
            ESTUDIANTES EGRESADOS
          </h5>
          <p className="text-verdeD font-barlow-semi-condensed font-bold text-xl">
            14.596
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-[200px]">
          <figure className="text-RojoC">
            <FaUsers className="text-5xl" />
          </figure>
          <h5 className="text-RojoC font-barlow-semi-condensed font-bold text-base">
            EGRESADOS EN LÍNEA
          </h5>
          <p className="text-verdeD font-barlow-semi-condensed font-bold text-xl">
            568
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-[200px]">
          <figure className="text-RojoC">
            <FaUserPlus className="text-5xl" />
          </figure>
          <h5 className="text-RojoC font-barlow-semi-condensed font-bold text-base">
            EGRESADOS REGISTRADOS
          </h5>
          <p className="text-verdeD font-barlow-semi-condensed font-bold text-xl">
            2.435
          </p>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-6 pt-16 pb-16 px-4">
        <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
          ¿CÓMO INTERACTUAR?
        </h3>
        <ul className="flex flex-wrap justify-center items-center gap-8">
          <li className="bg-[url('../../public/proyectos.jpg')] w-[250px] h-[200px] bg-cover bg-center rounded-md border-2 border-verdeC flex justify-center items-center">
            <p className="bg-Blanco bg-opacity-75 text-sm w-full text-center py-6 font-barlow-semi-condensed font-semibold text-Negro">
              EN PROYECTOS
            </p>
          </li>
          <li className="bg-[url('../../public/eventos.jpg')] w-[250px] h-[200px] bg-cover bg-center rounded-md border-2 border-RojoC flex justify-center items-center">
            <p className="bg-Blanco bg-opacity-75 text-sm w-full text-center py-6 font-barlow-semi-condensed font-semibold text-Negro">
              EN EVENTOS
            </p>
          </li>
          <li className="bg-[url('../../public/foros.jpg')] w-[250px] h-[200px] bg-cover bg-center rounded-md border-2 border-verdeC flex justify-center items-center">
            <p className="bg-Blanco bg-opacity-75 text-sm w-full text-center py-6 font-barlow-semi-condensed font-semibold text-Negro">
              EN FOROS
            </p>
          </li>
          <li className="bg-[url('../../public/colaborando.jpg')] w-[250px] h-[200px] bg-cover bg-center rounded-md border-2 border-RojoC flex justify-center items-center">
            <p className="bg-Blanco bg-opacity-75 text-sm w-full text-center py-6 font-barlow-semi-condensed font-semibold text-Negro">
              COLABORANDO
            </p>
          </li>
        </ul>
      </section>

      <section className="flex flex-col justify-center items-center gap-6 pt-16 pb-16 px-4">
        <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
          PREGUNTAS FRECUENTES
        </h3>
        <ul className="w-full px-4 flex flex-wrap justify-center gap-4">
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion(!accordion)}
              >
                <span>¿PUEDO PUBLICAR PROYECTOS?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion2(!accordion2)}
              >
                <span>¿CRECERE PROFESIONALMENTE?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion2 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion3(!accordion3)}
              >
                <span>¿CÓMO ADENTRARME AL CAMPO LABORAL?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion3 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion4(!accordion4)}
              >
                <span>¿CÓMO MEJORAR MI NIVEL DE ESTUDIOS?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion4 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion5(!accordion5)}
              >
                <span>¿TENEMOS PROFESIONALES EXPERIMENTADOS?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion5 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion6(!accordion6)}
              >
                <span>¿CONTAMOS CON COLABORADORES?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion6 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion7(!accordion7)}
              >
                <span>¿EXISTEN NO PROFESIONALES EN LA RED?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion7 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
          <li className="w-full lg:w-[48%] relative">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                onClick={(e) => setAccordion8(!accordion8)}
              >
                <span>¿PUEDO IR A LAS SEDES?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${accordion8 ? "visible" : "hidden"}`}
            >
              <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                <p className="mb-2">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <Footer />
    </>
  );
}

export default Landing;
