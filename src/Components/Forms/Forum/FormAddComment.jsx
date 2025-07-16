import { Label } from "flowbite-react";
import notify from "../../../utils/notifications";
import { useState } from "react";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addComment } from "../../../services/forum/forumService";

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
      return notify.error("Falta el contenido del comentario", false);
    }
    if (forum === undefined) {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("parentCommentId", comment.id);
      dispatch(
        addComment({
          id: comment?.thread,
          data: formData,
          type: "replies"
        })
      );
    } else {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("parentCommentId", null);
      dispatch(
        addComment({
          id: forum?.id,
          data: formData,
          type: "thread"
        })
      );
    }
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
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Comentar"} />
      </form>
    </>
  );
}
