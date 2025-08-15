import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../../../../utils/notifications";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { addMediaSubSection, deleteMediaSubSection } from "../../../../services/admin/landingService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddPictureSubSection({ sectionIndex, subsectionIndex, image, setModalSubSectionPicture }) {
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
      notify.error("No se ha seleccionado una imagen para la subsección", false);
    } else {
      const formData = new FormData();
      formData.append("file", picture);
      dispatch(
        addMediaSubSection({
          sectionIndex: sectionIndex,
          subsectionIndex: subsectionIndex,
          data: formData
        })
      );
      setModalSubSectionPicture(false)
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          Agregar Imagen al Subtítulo
        </h5>
        {!image ? (
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
        ) : (
          <></>
        )}
        <div>
          {!image ? (
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
                src={image.url}
                alt=""
                className="w-auto h-auto border border-verdeD"
              />
            </div>
          )}
        </div>

        {!image ? (
          <ButtonSmall
            action={handleSubmit}
            className={"bg-verdeA hover:bg-RojoC"}
            text={"AGREGAR IMAGEN"}
          />
        ) : (
          <ButtonSmall
            action={(e) => {
              e.preventDefault();
              dispatch(
                deleteMediaSubSection({
                  sectionIndex: sectionIndex,
                  subsectionIndex: subsectionIndex,
                })
              );
              setModalSubSectionPicture(false)
            }}
            className={"bg-verdeA hover:bg-RojoC"}
            text={"Eliminar"}
          />
        )}
      </form>
    </>
  );
}
