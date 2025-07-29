import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../../../../utils/notifications";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { addMediaCarrousel, deleteMediaCarrousel } from "../../../../services/admin/landingService";
import { ModalNotHeader } from "../../../Modals/ModalNotHeader";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormCarrousel({landing}) {
  const dispatch = useDispatch();

  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [urlMedia, setUrlMedia] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0])
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (picture === "") {
      notify.error("No se ha seleccionado una imagen para el carrousel", false);
    } else {
      const formData = new FormData();
      formData.append("file", picture);
      dispatch(addMediaCarrousel({
        data: formData
      }))
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-5 border-b-2 border-verdeD pb-8">
          <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
            Agregar Imagen al Carrousel
          </h5>
          <div className="flex flex-col gap-1">
            <Label className="mb-2 block" htmlFor="small-file-upload">
              Selecciona la imagen:
            </Label>
            <FileInput
              onChange={onImageChange}
              id="small-file-upload"
              sizing="sm"
              accept=".jpg, .jpeg, .png, .svg, .webp, .avif"
            />
          </div>
          <div>
            {image === false ? (
              <></>
            ) : (
              <div className="flex flex-col w-full h-auto justify-center items-center mt-6">
                <h6 className="w-full flex justify-start font-barlow-semi-condensed text-lg font-bold text-verdeD">
                  VISTA PREVIA:
                </h6>
                <img
                  src={image}
                  alt=""
                  className="w-auto h-auto border border-verdeD"
                />
              </div>
            )}
          </div>

          <ButtonSmall
            action={handleSubmit}
            className={"bg-verdeA hover:bg-RojoC"}
            text={"AGREGAR IMAGEN"}
          />
        </form>

        <div className="flex flex-col gap-3">
          <h6 className="w-full flex justify-start font-barlow-semi-condensed text-lg font-bold text-verdeD">
            LISTA DE IMÁGENES:
          </h6>

          {landing?.carouselItems?.length === 0 ? (
            <p className="px-2 font-barlow-semi-condensed text-RojoC font-medium">
              No hay ninguna imagen en el carrousel...
            </p>
          ) : (
            <ul className="px-2 flex flex-col gap-4">
              {landing?.carouselItems?.map((item, key) => (
                <li key={key} className="list-disc font-medium font-barolw uppercase flex items-center justify-between">
                  - Imagen {key + 1}
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-sm bg-blue-600 rounded-md text-white hover:bg-blue-800"
                      onClick={(e) => {
                        setModalImage(true);
                        setUrlMedia(item.url);
                      }}
                    >
                      VER
                    </button>
                    <button
                      onClick={(e) => {
                        for (let i = 0; i < landing?.carouselItems?.length; i++) {
                          if (item.id === landing?.carouselItems[i].id) {
                            dispatch(
                              deleteMediaCarrousel({
                                idItem: item.id,
                                index: i
                              })
                            );
                          }
                        }
                      }}
                      className="p-2 text-sm bg-red-600 rounded-md text-white hover:bg-red-800"
                    >
                      ELIMINAR
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <ModalNotHeader
            openModal={modalImage}
            setOpenModal={setModalImage}
            size={"xl"}
            component={
              <>
                <div className="flex flex-col gap-2">
                  <h6 className="text-lg font-semibold text-Negro font-barlow-semi-condensed uppercase">
                    Imagen seleccionada
                  </h6>
                  <img src={urlMedia} className="border-2 border-verdeD" />
                </div>
              </>
            }
          />
        </div>
      </div>
    </>
  );
}