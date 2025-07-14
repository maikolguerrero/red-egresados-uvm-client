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
          <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase">
            Selecciona una opción de configuración
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            <ButtonBig
              text={"Carrousel de Imágenes"}
              className={"bg-verdeC hover:bg-RojoC w-[250px]"}
              action={(e) => setModalCarrousel(true)}
            />
            <ButtonBig
              text={"Sección de texto"}
              className={"bg-verdeB hover:bg-RojoC w-[250px]"}
              action={(e) => setModalWelcolmeS(true)}
            />
            <ButtonBig
              text={"Sección de texto e imágenes"}
              className={"bg-verdeC hover:bg-RojoC w-[250px]"}
              action={(e) => setFeaturedSections(true)}
            />
            <ButtonBig
              text={"Preguntas frecuentes"}
              className={"bg-verdeB hover:bg-RojoC w-[250px]"}
              action={(e) => setModalFaqs(true)}
            />
            <ButtonBig
              text={"Footer"}
              className={"bg-verdeC hover:bg-RojoC w-[250px]"}
              action={(e) => setModalFooter(true)}
            />
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
        </>
      )}
    </>
  );
}

export default CMLandingPage;
