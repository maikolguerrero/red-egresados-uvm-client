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
    severity: "medium",
    suspensionDuration: 0
  });
  const [time, setTime] = useState("s")
  const [timeSecons, setTimeSecons] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (values.action === "warning" || values.action === "deleted" || values.action === "no_action") {
      setValues({
      ...values,
      [name]: value,
      ["suspensionDuration"]: 0,
    });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
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
              <option value="banned_user">Banearlo</option>
            </select>
          </div>
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Mensaje:
            </Label>
            <textarea
              rows={6}
              className={
                "w-auto px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2"
              }
              type="text"
              name="message"
              value={values.message}
              onChange={handleInputChange}
              placeholder={"Mensaje de la solucion..."}
            ></textarea>
          </div>
          {values.action === "banned_user" ? (
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Tiempo del baneo:
              </Label>
              <div className="flex gap-2">
                <select
                  className={styles.input}
                  type="text"
                  name="time"
                  value={time}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setTime(value)
                    let milisecons = 0
                    if (value === "s") {
                      milisecons = timeSecons * 1000
                    }
                    if (value === "m") {
                      milisecons = timeSecons * 60000
                    }
                    if (value === "h") {
                      milisecons = timeSecons * 3.6e+6
                    }
                    if (value === "d") {
                      milisecons = timeSecons * 8.64e+7
                    }
                    setValues({
                      ...values,
                      ["suspensionDuration"]: milisecons,
                    });
                  }}
                  placeholder={"Accion tomada en el reporte..."}
                >
                  <option value="s">Segundos</option>
                  <option value="m">Minutos</option>
                  <option value="h">Horas</option>
                  <option value="d">Dias</option>
                </select>
                <input
                  className={styles.input}
                  min={0}
                  type="number"
                  name="timeSecons"
                  value={timeSecons}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setTimeSecons(value)
                    let milisecons = 0
                    if (time === "s") {
                      milisecons = value * 1000
                    }
                    if (time === "m") {
                      milisecons = value * 60000
                    }
                    if (time === "h") {
                      milisecons = value * 3.6e+6
                    }
                    if (time === "d") {
                      milisecons = value * 8.64e+7
                    }
                    setValues({
                      ...values,
                      ["suspensionDuration"]: milisecons,
                    });
                  }}
                  placeholder={"Tiempo de baneo..."}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <ButtonSmall className={"bg-verdeD hover:bg-RojoC"} text={"Resolver"} />
      </form>
    </>
  );
}
