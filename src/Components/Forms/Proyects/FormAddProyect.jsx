import { Label } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { typeError, typeInfo } from "../../../models/alertModels";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addForum, editForum } from "../../../services/forum/forumService";
import { addProyect, editProyect } from "../../../services/proyects/proyectService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddProyect({proyect, type}) {
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

  useEffect(() => {
    if (proyect === undefined) {
      return;
    } else {
      setValues({
        title: proyect.title,
        description: proyect.description,
        startDate: proyect.startDate.split("T")[0],
        endDate: proyect.endDate.split("T")[0],
        isPublic: proyect.isPublic,
        status: proyect.status,
        tags: proyect.tags,
      });
    }
  }, [proyect]);

  const addTag = (e) => {
    if (tag.trim().length === 0) {
      return enqueueSnackbar(
        "No puedes agregar la etiqueta sin escribirla",
        typeError
      );
    }
    setValues({
      ...values,
      tags: [...values.tags, tag],
    });
    setTag("");
    enqueueSnackbar("Se agrego la etiqueta", typeInfo);
  };

  const deleteTag = (key) => {
    let newTags = values.tags.filter((item) => item !== key);
    setValues({
      ...values,
      tags: newTags,
    });
    enqueueSnackbar("Se elimino la etiqueta", typeInfo);
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
      return enqueueSnackbar("Debe tener titulo el proyecto", typeError);
    }
    if (values.description.trim() === "") {
      return enqueueSnackbar("Debe tener descripcion el proyecto", typeError);
    }
    if (values.startDate.trim() === "") {
      return enqueueSnackbar("Debe tener fecha de inicio el proyecto", typeError);
    }
    if (values.endDate.trim() === "") {
      return enqueueSnackbar("Debe tener fecha de finalizacion tentativa el proyecto", typeError);
    }
    if (values.endDate <= values.startDate) {
      return enqueueSnackbar("La fecha de finalizacion debe ser mayor a la fecha de inicio del proyecto", typeError);
    }
    
    if (proyect === undefined) {
      dispatch(addProyect(values));
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
        projectId: proyect.id,
        data: values,
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
              Titulo del Proyecto:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder="Titulo del proyecto..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Descripcion del Proyecto:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder="Descripcion del proyecto..."
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
                min={0}
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha de Finalizacion:
              </Label>
              <input
                className={styles.input}
                type="date"
                min={0}
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
                  <ul className="flex gap-2">
                    {values.tags.map((item, key) => (
                      <li>
                        <Skills key={key} text={item} onClick={deleteTag} />
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
