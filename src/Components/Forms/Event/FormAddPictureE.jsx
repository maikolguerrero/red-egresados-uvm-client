import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import notify from "../../../utils/notifications";
import { finishEventAdd } from "../../../features/events/eventsSlice";
import { addPictureEvent } from "../../../services/events/eventsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddPictureE({setOpenModal}) {
  const eventId = useSelector((state) => state.events.eventAdd.data.id);
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
      notify.error("No se ha seleccionado una imagen para el evento", false);
    } else {
      const formData = new FormData();
      formData.append("image", picture);
      dispatch(addPictureEvent({
        data: formData,
        eventId: eventId
      }));
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(finishEventAdd());
    setOpenModal(false);
  }

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          Agregar Imágen al evento
        </h5>
        <div className="flex flex-col gap-1">
          <Label className="mb-2 block" htmlFor="small-file-upload">
            Selecciona la imágen:
          </Label>
          <FileInput
            onChange={onImageChange}
            id="small-file-upload"
            sizing="sm"
            accept=".jpg, .jpeg, .png, .svg"
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
          text={"AGREGAR IMÁGEN"}
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
