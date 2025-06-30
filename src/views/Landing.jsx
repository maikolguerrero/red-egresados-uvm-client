import Footer from "../Components/Footer";
import Header from "../Components/Header";
import professionals from "../../public/ProfesionalesUVM.png"
import { FaGraduationCap } from "react-icons/fa6";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getContentLanding } from "../services/admin/landingService";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, createTheme, ThemeProvider } from "flowbite-react";
import { Loader } from "../Components/Loader";

const customTheme = createTheme({
  "root": {
    "base": "relative h-full w-full",
    "leftControl": "absolute left-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden",
    "rightControl": "absolute right-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden"
  },
  "indicators": {
    "active": {
      "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      "on": "bg-verdeA dark:bg-gray-800"
    },
    "base": "h-3 w-3 rounded-full",
    "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
  },
  "item": {
    "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    "wrapper": {
      "off": "w-full shrink-0 transform cursor-default snap-center",
      "on": "w-full shrink-0 transform cursor-grab snap-center"
    }
  },
  "control": {
    "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70",
    "icon": "h-5 w-5 text-white sm:h-6 sm:w-6 dark:text-gray-800"
  },
  "scrollContainer": {
    "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-none",
    "snap": "snap-x"
  }
})

function Landing() {
  const dispatch = useDispatch();
  const landing = useSelector((state) => state.landing.landingContent);
  const loading = useSelector((state) => state.landing.loading);

  const [accordion, setAccordion] = useState(false)

  useEffect(() => {
    dispatch(getContentLanding());
  }, []);

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      {loading ? (
        <main className="min-h-[89.5vh] flex justify-center items-center">
          <Loader />
        </main>
      ) : (
        <></>
      )}

      {landing.carouselItems.length === 0 ? (
        <></>
      ) : (
        <div className="h-[200px] md:h-[400px] xl:h-[600px] 2xl:h-[650px]">
          <ThemeProvider theme={customTheme}>
            <Carousel theme={customTheme} slideInterval={5000}>
              {landing.carouselItems.map((item, key) => (
                <img src={item.url} alt="..." />
              ))}
            </Carousel>
          </ThemeProvider>
        </div>
      )}

      {landing.welcomeSections.length === 0 ? (
        <></>
      ) : (
        landing.welcomeSections.map((item, key) => (
          <section className="flex flex-col justify-center items-center gap-4 pt-16 pb-16 px-4">
            <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
              {item.title}
            </h3>
            <p className="w-5/6 lg:w-4/6 font-barolw text-center text-xs md:text-sm xl:text-base text-Negro">
              {item.description}
            </p>
          </section>
        ))
      )}

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

      {landing.featuredSections.length === 0 ? (
        <></>
      ) : (
        <>
          {landing.featuredSections.map((item) => (
            <section className="flex flex-col justify-center items-center gap-6 pt-16 pb-16 px-4">
              <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
                {item.mainTitle}
              </h3>
              {item.subsections.length === 0 ? (
                <></>
              ) : (
                <ul className="flex flex-wrap justify-center items-center gap-8 ">
                  {item.subsections.map((itemSubsection) => (
                    <>
                      <li className="relative ">
                        <img
                          src={
                            !itemSubsection.image
                              ? "''"
                              : itemSubsection.image.url
                          }
                          className={` w-[250px] h-[200px] bg-cover bg-center object-cover rounded-md border-2 border-verdeC`}
                        />
                        <p className="bg-Blanco absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase border-x-2 border-verdeC bg-opacity-75 text-sm w-full text-center py-6 font-barlow-semi-condensed font-semibold text-Negro">
                          {itemSubsection.subtitle}
                        </p>
                      </li>
                    </>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {landing.faqs.length === 0 ? (
        <></>
      ) : (
        <section className="flex flex-col justify-center items-center gap-6 pt-16 pb-16 px-4">
          <h3 className="font-barlow-semi-condensed font-bold text-lg lg:text-xl pb-2 border-b-2 border-RojoC w-[225px] text-Negro text-center">
            PREGUNTAS FRECUENTES
          </h3>
          <ul className="w-full px-4 flex flex-wrap justify-center gap-4">
            {landing.faqs.map((item, key) => (
              <li className="w-full lg:w-[48%] relative">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-semibold font-barolw rtl:text-right text-RojoC border bg-Gris hover:bg-gray-200 gap-3"
                    onClick={(e) => {
                      if (accordion === key) {
                        setAccordion(false);
                      } else {
                        setAccordion(key);
                      }
                    }}
                  >
                    <span className="uppercase">{item.question}</span>
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
                <div className={`${accordion === key ? "visible" : "hidden"}`}>
                  <div className="p-5 border border-Gris text-sm font-barlow-semi-condensed font-medium text-Negro">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </>
  );
}

export default Landing;
