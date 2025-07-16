import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../../../../utils/notifications";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { ItemBabge } from "../../../Babge/ItemBabge";
import { updateContentHome } from "../../../../services/admin/homeService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormTextSectionHome({home}) {
  const dispatch = useDispatch();

  const [homeContent, setHomeContent] = useState({
    welcomeSections: [],
  })
  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    setHomeContent(home)
  }, [home]);

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
      if (values.title.trim().length === 0) return notify.error("Falta el Título", false)
      if (values.description.trim().length === 0) return notify.error("Falta la descripción", false)

      setHomeContent({
        ...homeContent,
        ["welcomeSections"]: [...homeContent.welcomeSections, {
          title: values.title,
          description: values.description,
          order: getRandomInt(100)
        }]
      });
      setValues({
        title: "",
        description: "",
      });
    notify.info("Agregada la sección de bienvenida (debes guardar cambios)", false)
  }

  const deleteWelcomeSection = (key) => {
    let newWelcomeS = homeContent.welcomeSections.filter((item) => item.title !== key);
    setHomeContent({
      ...homeContent,
      ["welcomeSections"]: newWelcomeS,
    });
    notify.info("Eliminada la sección de bienvenida (debes guardar cambios)", false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContentHome(homeContent));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"Consejos de la red"}
        </h5>
        <div className="flex flex-col gap-6">
          <h6 className={styles.subtitle_form}>CONSEJO DE USO DE LA RED</h6>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Título:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                placeholder="Título del consejo..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Consejo:
              </Label>
              <textarea
                className={styles.input}
                type="text"
                rows={10}
                name="description"
                value={values.description}
                onChange={handleInputChange}
                placeholder="Consejo de uso de la red..."
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
              AGREGAR CONSEJO
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de consejos de la red:
              </Label>
              {homeContent?.welcomeSections?.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium border-b-2 pb-3 mb-3 border-verdeD">
                    No hay ningun consejo de uso de la red registrado...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2 pb-3 mb-3 border-b-2 border-verdeD">
                  {homeContent?.welcomeSections?.map((item, key) => (
                    <li key={key}>
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
          text={"Actualizar Consejos de la Red"}
        />
      </form>
    </>
  );
}