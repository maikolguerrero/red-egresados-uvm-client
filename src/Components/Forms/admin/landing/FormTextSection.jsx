import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { typeError, typeInfo } from "../../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { ItemBabge } from "../../../Babge/ItemBabge";
import { updateContentLanding } from "../../../../services/admin/landingService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormTextSection({landing}) {
  const dispatch = useDispatch();

  const [landingContent, setLandingContent] = useState({
    welcomeSections: [],
  })
  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    setLandingContent(landing)
  }, [landing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const addWelcomeSection = (e) => {
      if (values.title.trim().length === 0) return enqueueSnackbar("Tienes que escribir el Título", typeError)
      if (values.description.trim().length === 0) return enqueueSnackbar("Tienes que escribir la descripción", typeError)

      setLandingContent({
        ...landingContent,
        ["welcomeSections"]: [...landingContent.welcomeSections, {
          title: values.title,
          description: values.description,
          order: getRandomInt(100)
        }]
      });
      setValues({
        title: "",
        description: "",
      });
    enqueueSnackbar("Se agregó la sección de bienvenida (debes guardar cambios)", typeInfo)
  }

  const deleteWelcomeSection = (key) => {
    let newWelcomeS = landingContent.welcomeSections.filter((item) => item.title !== key);
    setLandingContent({
      ...landingContent,
      ["welcomeSections"]: newWelcomeS,
    });
    enqueueSnackbar(
      "Se elimino la sección de bienvenida (debes guardar cambios)",
      typeInfo
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContentLanding(landingContent));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"Secciones de Bienvenida"}
        </h5>
        <div className="flex flex-col gap-6">
          <h6 className={styles.subtitle_form}>SECCIÓN DE BIENVENIDA</h6>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Titulo:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                placeholder="Titulo de la sección..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Descripción:
              </Label>
              <textarea
                className={styles.input}
                type="text"
                rows={10}
                name="description"
                value={values.description}
                onChange={handleInputChange}
                placeholder="Descripción de la sección..."
              />
            </div>
            <button
              type="button"
              onClick={addWelcomeSection}
              className={
                "bg-verdeD text-Blanco px-7 py-1 font-barlow-condensed font-medium rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR SECCIÓN
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de secciones de bienvenida:
              </Label>
              {landingContent.welcomeSections.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium border-b-2 pb-3 mb-3 border-verdeD">
                    No hay ninguna sección de bienvenida registrada...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2 pb-3 mb-3 border-b-2 border-verdeD">
                  {landingContent.welcomeSections.map((item, key) => (
                    <li>
                      <ItemBabge
                        key={key}
                        text={item.title}
                        onClick={deleteWelcomeSection}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Actualizar Sección de Bienvenida"}
        />
      </form>
    </>
  );
}