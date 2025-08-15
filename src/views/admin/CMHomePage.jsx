import ButtonBig from "../../Components/Buttons/ButtonBig";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { useDispatch, useSelector } from "react-redux";
import { getContentHome } from "../../services/admin/homeService";
import { FormCarrouselHome } from "../../Components/Forms/admin/home/FormCarrouselHome";
import { FormTextSectionHome } from "../../Components/Forms/admin/home/FormTextSectionHome";
import { Loader } from "../../Components/Loader";
import PreviewF from "../../assets/PreviewF.png"
import PreviewG from "../../assets/PreviewG.png"

function CMHomePage() {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home.homeContent);
  const loader = useSelector((state) => state.home.loading);
  const loading = useSelector((state) => state.home.loadingPage);

  const [modalWelcomeS, setModalWelcolmeS] = useState(false);
  const [modalCarrousel, setModalCarrousel] = useState(false);

  useEffect(() => {
    dispatch(getContentHome())
  }, []);

  return (
    <>
      {loading ? (
        <main className="min-h-[89.5vh] w-full flex justify-center items-center">
          <Loader />
        </main>
      ) : (
        <>
          {loader && (
            <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
              <div className="relative h-full w-full flex justify-center items-center">
                <Loader />
              </div>
            </div>
          )}

          <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase">
            Selecciona una opción de configuración
          </h4>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-[300px] flex flex-col gap-3 p-4 bg-Gris rounded-md border border-verdeC">
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

            <div className="w-[300px] flex flex-col gap-3 p-4 bg-Gris rounded-md border border-verdeC">
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
        </>
      )}
    </>
  );
}

export default CMHomePage;
