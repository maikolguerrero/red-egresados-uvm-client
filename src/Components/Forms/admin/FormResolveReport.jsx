import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { typeError } from "../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { resolveReport } from "../../../services/reports/reportsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormResolveReport({ reportId }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    action: "warning",
    message: "",
    severity: "medium"
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
    if (values.action.trim() === "") {
      return enqueueSnackbar("Debe seleccionar una accion a realizar", typeError);
    }
    if (values.message.trim() === "") {
      return enqueueSnackbar("Debe escribir un mensaje", typeError);
    }
    
    dispatch(resolveReport({
      data: values,
      reportId: reportId
    }))
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"RESOLVER REPORTE"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Accion realizada:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="action"
              value={values.action}
              onChange={handleInputChange}
              placeholder={"Accion tomada en el reporte..."}
            >
              <option value="warning">Advertencia</option>
              <option value="deleted">Eliminar</option>
              <option value="no_action">Sin Accion</option>
            </select>
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Mensaje:
            </Label>
            <textarea
              rows={6}
              className={styles.input}
              type="text"
              name="message"
              value={values.message}
              onChange={handleInputChange}
              placeholder={"Mensaje de la solucion..."}
            ></textarea>
          </div>
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Resolver"} />
      </form>
    </>
  );
}
