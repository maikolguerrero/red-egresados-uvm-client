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
import { FormCarrouselHome } from "../../Components/Forms/admin/home/FormCarrouselHome";
import { getContentHome } from "../../services/admin/homeService";
import { FormTextSectionHome } from "../../Components/Forms/admin/home/FormTextSectionHome";
import PreviewF from "../../../public/PreviewF.png"
import PreviewG from "../../../public/PreviewG.png"

function CMHomePage() {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home.homeContent);
  const loader = useSelector((state) => state.home.loading);
  const loading = useSelector((state) => state.home.loadingPage);

  const [modalWelcomeS, setModalWelcolmeS] = useState(false);
  const [modalCarrousel, setModalCarrousel] = useState(false);
  const [featuredSections, setFeaturedSections] = useState(false);

  useEffect(() => {
    dispatch(getContentHome())
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
                    text={"Carrousel de Imágenes"}
                    className={"bg-verdeC hover:bg-RojoC w-full"}
                    action={(e) => setModalCarrousel(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img
                      className="rounded-md border border-verdeB"
                      src={PreviewF}
                    />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-3">
                  <ButtonBig
                    text={"Consejos de uso"}
                    className={"bg-verdeB hover:bg-RojoC w-full"}
                    action={(e) => setModalWelcolmeS(true)}
                  />
                  <div className="flex flex-col gap-2">
                    <h6 className="font-barlow-semi-condensed font-medium text-base w-full flex items-center justify-center">
                      Visualización Previa
                    </h6>
                    <img
                      className="rounded-md border border-verdeB"
                      src={PreviewG}
                    />
                  </div>
                </div>

                {/*<ButtonBig
                  text={"Sección de texto e imágenes"}
                  className={"bg-verdeC hover:bg-RojoC"}
                  action={(e) => setFeaturedSections(true)}
                />*/}
              </div>
            </div>

            <ModalNotHeader
              openModal={modalWelcomeS}
              setOpenModal={setModalWelcolmeS}
              size={"xl"}
              component={<FormTextSectionHome home={home} />}
            />

            <ModalNotHeader
              openModal={modalCarrousel}
              setOpenModal={setModalCarrousel}
              size={"xl"}
              component={<FormCarrouselHome home={home} />}
            />

            {/*<ModalNotHeader
              openModal={featuredSections}
              setOpenModal={setFeaturedSections}
              size={"xl"}
              component={<>a</>}
            /> */}

            <div className="absolute right-8 bottom-6">
              <ButtonMessages />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CMHomePage;
