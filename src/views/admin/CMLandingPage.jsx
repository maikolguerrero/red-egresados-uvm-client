import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import ButtonBig from "../../Components/Buttons/ButtonBig";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormFooter } from "../../Components/Forms/admin/landing/FormFooter";
import { FormFaqs } from "../../Components/Forms/admin/landing/FormFaqs";
import { FormTextSection } from "../../Components/Forms/admin/landing/FormTextSection";
import { useDispatch, useSelector } from "react-redux";
import { getContentLanding } from "../../services/admin/landingService";
import { FormCarrousel } from "../../Components/Forms/admin/landing/FormCarrousel";
import { FormFeatureSection } from "../../Components/Forms/admin/landing/FormFeatureSection";
import { Loader } from "../../Components/Loader";
import PreviewA from "../../../public/PreviewA.png"
import PreviewB from "../../../public/PreviewB.png"
import PreviewC from "../../../public/PreviewC.png"
import PreviewD from "../../../public/PreviewD.png"
import PreviewE from "../../../public/PreviewE.png"

function CMLandingPage() {
  const dispatch = useDispatch();
  const landing = useSelector((state) => state.landing.landingContent);
  const loader = useSelector((state) => state.landing.loading);
  const loading = useSelector((state) => state.landing.loadingPage);

  const [modalFooter, setModalFooter] = useState(false);
  const [modalFaqs, setModalFaqs] = useState(false);
  const [modalWelcomeS, setModalWelcolmeS] = useState(false);
  const [modalCarrousel, setModalCarrousel] = useState(false);
  const [featuredSections, setFeaturedSections] = useState(false);

  useEffect(() => {
    dispatch(getContentLanding())
  }, []);

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex relative">
        <Nav />
        {loading ? (
          <main className="min-h-[89.5vh] w-full flex justify-center items-center">
            <Loader />
          </main>
        ) : (
          <>
            {loader ? (
              <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
                <div className="relative h-full w-full flex justify-center items-center">
                  <Loader />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
              <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase">
                Selecciona una opción de configuración
              </h4>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Galería de Imágenes"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setModalCarrousel(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img className="rounded-md border border-verdeB" src={PreviewA} />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Sección de texto"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setModalWelcolmeS(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img className="rounded-md border border-verdeB" src={PreviewB} />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Sección de texto e imágenes"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setFeaturedSections(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img className="rounded-md border border-verdeB" src={PreviewC} />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Preguntas frecuentes"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setModalFaqs(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img className="rounded-md border border-verdeB" src={PreviewD} />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Pie de página"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setModalFooter(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img className="rounded-md border border-verdeB" src={PreviewE} />
                  </div>
                </div>
              </div>
            </div>

            <ModalNotHeader
              openModal={modalFooter}
              setOpenModal={setModalFooter}
              size={"xl"}
              component={<FormFooter landing={landing} />}
            />

            <ModalNotHeader
              openModal={modalFaqs}
              setOpenModal={setModalFaqs}
              size={"xl"}
              component={<FormFaqs landing={landing} />}
            />

            <ModalNotHeader
              openModal={modalWelcomeS}
              setOpenModal={setModalWelcolmeS}
              size={"xl"}
              component={<FormTextSection landing={landing} />}
            />

            <ModalNotHeader
              openModal={modalCarrousel}
              setOpenModal={setModalCarrousel}
              size={"xl"}
              component={<FormCarrousel landing={landing} />}
            />

            <ModalNotHeader
              openModal={featuredSections}
              setOpenModal={setFeaturedSections}
              size={"xl"}
              component={<FormFeatureSection landing={landing} />}
            />

            <div className="absolute right-8 bottom-6">
              <ButtonMessages />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CMLandingPage;
