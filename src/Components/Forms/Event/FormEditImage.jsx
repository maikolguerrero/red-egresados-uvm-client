import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { addPictureEvent, deletePictureEvent } from "../../../services/events/eventsService";
import notify from "../../../utils/notifications";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormEditImage({ internal, event }) {
  const dispatch = useDispatch();

  const [picture, setPicture] = useState("");
  const [file, setFile] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
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
      dispatch(
        addPictureEvent({
          data: formData,
          eventId: event.id,
          internal: internal
        })
      );
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          IMÁGEN DEL EVENTO
        </h5>
        {!event.media[0] ? (
          <div className="flex flex-col gap-1">
            <Label className="mb-2 block" htmlFor="small-file-upload">
              Selecciona la imágen:
            </Label>
            <FileInput
              onChange={onImageChange}
              id="small-file-upload"
              sizing="sm"
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          {!event.media[0] ? (
            file ? (
              <div className="flex flex-col w-full h-auto justify-center items-center mt-6">
                <h6 className="w-full flex justify-start font-barlow-semi-condensed text-lg font-bold text-verdeD">
                  VISTA PREVIA:
                </h6>
                <img
                  src={file}
                  alt=""
                  className="w-auto h-auto border border-verdeD"
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="flex flex-col w-full h-auto justify-center items-center mt-6">
              <h6 className="w-full flex justify-start font-barlow-semi-condensed text-lg font-bold text-verdeD">
                VISTA PREVIA:
              </h6>
              <img
                src={event.media[0].url}
                alt=""
                className="w-auto h-auto border border-verdeD"
              />
            </div>
          )}
        </div>

        {!event.media[0] ? (
          <ButtonSmall
            action={handleSubmit}
            className={"bg-verdeA hover:bg-RojoC"}
            text={"AGREGAR IMÁGEN"}
          />
        ) : (
          <ButtonSmall
            action={(e) => {
              e.preventDefault();
              dispatch(deletePictureEvent({
                eventId: event.id,
                imageId: event.media[0].id,
                internal: internal
              }))
            }}
            className={"bg-verdeA hover:bg-RojoC"}
            text={"Eliminar"}
          />
        )}
      </form>
    </>
  );
}
