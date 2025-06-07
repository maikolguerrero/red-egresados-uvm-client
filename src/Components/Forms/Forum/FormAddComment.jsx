import { FileInput, Label } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { typeError, typeInfo } from "../../../models/alertModels";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addComment, addForum } from "../../../services/forum/forumService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddComment({ forum, comment }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    content: "",
  });
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0])
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.content.trim() === "") {
      return enqueueSnackbar("Debe tener contenido el comentario", typeError);
    }
    if (forum === undefined) {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("parentCommentId", comment.id);
      dispatch(
        addComment({
          id: comment.thread,
          data: formData,
          type: "replies"
        })
      );
    } else {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("parentCommentId", null);
      if (image) {
        formData.append("media", picture);
      }
      dispatch(
        addComment({
          id: forum.id,
          data: formData,
          type: "thread"
        })
      );
    }
    setImage(false);
    setPicture("");
    setValues({
      content: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {forum === undefined ? "RESPONDER COMENTARIO" : "AGREGAR COMENTARIO"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Contenido:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="content"
              value={values.content}
              onChange={handleInputChange}
              placeholder={forum === undefined ? "Respuesta del comentario..." : "Contenido del comentario..."}
            ></textarea>
          </div>

          {forum === undefined ? (
            <></>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <Label className="mb-2 block" htmlFor="small-file-upload">
                  Selecciona la foto (opcional):
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
                    <div className="w-full flex justify-center bg-Negro border border-verdeD">
                      <img src={image} alt="" className="w-auto h-auto" />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Comentar"} />
      </form>
    </>
  );
}
