import { Label } from "flowbite-react";
import notify from "../../../utils/notifications";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { ItemBabge } from "../../Babge/ItemBabge";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addProyect, editProyect } from "../../../services/proyects/proyectService";
import { getFormattedDateForInput } from "../../../utils/dateUtils";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddProyect({ proyect, type }) {
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isPublic: true,
    status: "not_started",
    tags: [],
  });

  const validateDates = () => {
    const now = new Date().toISOString();
    const startDate = new Date(values.startDate).toISOString();
    const endDate = new Date(values.endDate).toISOString();

    // Validar que la fecha de inicio no sea pasada
    // if (startDate < now) {
    //   notify.error("La fecha de inicio no puede ser una fecha pasada", false);
    //   return false;
    // }

    // Validar que la fecha de fin no sea anterior a la de inicio
    if (endDate < startDate) {
      notify.error("La fecha de fin no puede ser anterior a la de inicio", false);
      return false;
    }

    return true;
  };


  const toLocalDateTimeString = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    // Ajustar por el offset de la zona horaria
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  };

  const parseLocalDateTime = (localDateTime) => {
    if (!localDateTime) return '';

    // Convertir la fecha local a un formato ISO que mantenga la hora local
    const [date, time] = localDateTime.split('T');
    return `${date}`;
  };


  useEffect(() => {
    if (proyect === undefined) {
      return;
    } else {
      setValues({
        title: proyect?.title,
        description: proyect?.description,
        startDate: getFormattedDateForInput(proyect?.startDate),
        endDate: getFormattedDateForInput(proyect?.endDate),
        isPublic: proyect?.isPublic,
        status: proyect?.status,
        tags: proyect?.tags,
      });
    }
  }, [proyect]);

  const addTag = (e) => {
    if (tag.trim().length === 0) {
      return notify.error("Falta la etiqueta", false);
    }
    setValues({
      ...values,
      tags: [...values.tags, tag],
    });
    setTag("");
    notify.info("Agregada la etiqueta", false);
  };

  const deleteTag = (key) => {
    let newTags = values.tags.filter((item) => item !== key);
    setValues({
      ...values,
      tags: newTags,
    });
    notify.info("Eliminada la etiqueta", false);
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
    if (values.title.trim() === "") {
      return notify.error("Falta el título", false);
    }
    if (values.description.trim() === "") {
      return notify.error("Falta la descripción", false);
    }
    if (values.startDate.trim() === "") {
      return notify.error("Falta la fecha de inicio", false);
    }
    if (values.endDate.trim() === "") {
      return notify.error("Falta la fecha de finalización", false);
    }
    // Validación de fechas
    if (!validateDates()) {
      return;
    }
    if (values.endDate <= values.startDate) {
      return notify.error("La fecha de finalización debe ser mayor a la fecha de inicio", false);
    }

    // Crear copia de values con las fechas formateadas
    const formData = {
      ...values,
      startDate: parseLocalDateTime(values.startDate),
      endDate: parseLocalDateTime(values.endDate),
    };

    if (proyect === undefined) {
      dispatch(addProyect(formData));
      setValues({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        isPublic: true,
        status: "not_started",
        tags: [],
      });
    } else {
      dispatch(editProyect({
        projectId: proyect?.id,
        data: formData,
        type: type
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {proyect === undefined ? "Agregar Proyecto" : "Editar Proyecto"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Título del Proyecto:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder="Título del proyecto..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Descripción del Proyecto:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder="Descripción del proyecto..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha de Inicio:
              </Label>
              <input
                className={styles.input}
                type="date"
                // min={toLocalDateTimeString(new Date().toISOString())}
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha de Finalización:
              </Label>
              <input
                className={styles.input}
                type="date"
                // min={toLocalDateTimeString(new Date().toISOString())}
                name="endDate"
                value={values.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Estado del Proyecto:
              </Label>
              <select
                className={styles.input}
                type="datetime-local"
                min={0}
                name="status"
                value={values.status}
                onChange={handleInputChange}
              >
                <option value="not_started">Sin iniciar</option>
                <option value="in_progress">En progreso</option>
                <option value="paused">Pausado</option>
                <option value="cancelled">Cancelado</option>
                <option value="completed">Completado</option>
              </select>
            </div>

            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Privacidad:
              </Label>
              <select
                className={styles.input}
                type="datetime-local"
                min={0}
                name="isPublic"
                value={values.isPublic}
                onChange={handleInputChange}
              >
                <option value={true}>Publico</option>
                <option value={false}>Privado</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>ETIQUETAS</h4>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Etiqueta:
                </Label>
                <div className="flex gap-3">
                  <input
                    className={styles.input}
                    type="text"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Etiqueta..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                  >
                    <IoIosAdd className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Lista de Etiquetas:
                </Label>
                {values.tags.length === 0 ? (
                  <>
                    <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                      No hay ninguna etiqueta registrada...
                    </h6>
                  </>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {values.tags.map((item, key) => (
                      <li key={key}>
                        <ItemBabge
                          key={key}
                          text={item}
                          onClick={deleteTag}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={proyect === undefined ? "Crear Proyecto" : "Editar Proyecto"}
        />
      </form>
    </>
  );
}
