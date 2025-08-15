import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import notify from "../../../utils/notifications";
import { addPictureForum } from "../../../services/forum/forumService";
import { finish } from "../../../features/forums/forumsSlice";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddPicture({setOpenModal}) {
  const threadId = useSelector((state) => state.forums.forumAdd.data.id);
  const dispatch = useDispatch();

  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0])
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (picture === "") {
      notify.error("No se ha seleccionado una imagen para el Hilo", false);
    } else {
      const formData = new FormData();
      formData.append("image", picture);
      dispatch(addPictureForum({
        data: formData,
        threadId: threadId
      }));
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(finish());
    setOpenModal(false);
  }

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          Agregar Imagen al Hilo
        </h5>
        <div className="flex flex-col gap-1">
          <Label className="mb-2 block" htmlFor="small-file-upload">
            Selecciona la imagen:
          </Label>
          <FileInput
            onChange={onImageChange}
            id="small-file-upload"
            sizing="sm"
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
                alt="Imagen del Hilo"
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
        <ButtonSmall
          action={handleClose}
          className={"bg-verdeD hover:bg-RojoC"}
          text={"CERRAR"}
        />
      </form>
    </>
  );
}
