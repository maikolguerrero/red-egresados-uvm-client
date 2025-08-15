import { Label } from "flowbite-react";
import notify from "../../../utils/notifications";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addForum, editForum } from "../../../services/forum/forumService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddForum({ forum, type }) {
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });

  useEffect(() => {
    if (forum === undefined) {
      return;
    } else {
      setValues({
        title: forum?.title,
        content: forum?.content,
        category: forum?.category,
        tags: forum?.tags,
      });
    }
  }, [forum]);

  const addTag = (e) => {
    if (tag.trim().length === 0) {
      return notify.error(
        "Falta la etiqueta",
        false
      );
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
    if (values.content.trim() === "") {
      return notify.error("Falta la descripción", false);
    }
    if (values.category.trim() === "") {
      return notify.error("Falta la categoría", false);
    }
    if (forum === undefined) {
      dispatch(addForum(values));
    } else {
      dispatch(editForum({
        threadId: forum?.id,
        data: values,
        type: type
      }))
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {forum === undefined ? "Agregar Hilo al Foro" : "Editar Hilo del Foro"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Título:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={values?.title}
              onChange={handleInputChange}
              placeholder="Título del hilo..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Contenido:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="content"
              value={values?.content}
              onChange={handleInputChange}
              placeholder="Descripción del hilo..."
            ></textarea>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Categoría:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="category"
              value={values?.category}
              onChange={handleInputChange}
              placeholder="Categoría del hilo..."
            >
              <option value="">Selecciona una categoría...</option>
              <option value="general">General</option>
              <option value="empleos">Empleos</option>
              <option value="eventos">Eventos</option>
              <option value="carreras">Carreras</option>
              <option value="proyectos">Proyectos</option>
            </select>
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
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ninguna etiqueta registrada...
                  </h6>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {values.tags.map((item, key) => (
                      <li key={key}>
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
          text={forum === undefined ? "Crear Hilo" : "Editar Hilo"}
        />
      </form>
    </>
  );
}
