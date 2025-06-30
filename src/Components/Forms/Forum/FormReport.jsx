import { FileInput, Label } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { typeError, typeInfo } from "../../../models/alertModels";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addComment, addForum, addReport } from "../../../services/forum/forumService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormReport({ threadId, idComment }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    description: "",
    reason: "spam"
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
    if (values.reason.trim() === "") {
      return enqueueSnackbar("Debe especificar el tipo de reporte", typeError);
    }
    if (values.description.trim() === "") {
      return enqueueSnackbar("Debe enviar la descripcion del reporte", typeError);
    }
    if (idComment === undefined) {
      dispatch(
        addReport({
          threadId: threadId,
          description: values.description,
          reason: values.reason,
        })
      );
    } else {
      dispatch(
        addReport({
          threadId: threadId,
          idComment: idComment,
          description: values.description,
          reason: values.reason,
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"GENERAR REPORTE"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Tipo de reporte:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="reason"
              value={values.reason}
              onChange={handleInputChange}
              placeholder={"Descripcion del reporte..."}
            >
              <option value="spam">Spam</option>
              <option value="inappropriate">Inapropiado</option>
              <option value="harassment">Acoso</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Descripcion:
            </Label>
            <textarea
              rows={6}
              className={styles.input}
              type="text"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder={"Descripcion del reporte..."}
            ></textarea>
          </div>
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Reportar"} />
      </form>
    </>
  );
}
