import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { typeError, typeInfo } from "../../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { ItemBabge } from "../../../Babge/ItemBabge";
import { updateContentLanding } from "../../../../services/admin/landingService";
import { ModalNotHeader } from "../../../Modals/ModalNotHeader";
import { FormSubSection } from "./FormSubSection";
import { FormAddPictureSubSection } from "./FormAddPictureSubSection";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormFeatureSection({ landing }) {
  const dispatch = useDispatch();

  const [landingContent, setLandingContent] = useState({
    featuredSections: [],
  })
  const [values, setValues] = useState({
    mainTitle: "",
    subsections: []
  });
  const [modalSubSection, setModalSubSection] = useState(false);
  const [modalSubSectionPicture, setModalSubSectionPicture] = useState(false);
  const [onKeyPosition, setOnKeyPosition] = useState(false)
  const [subsectionIndex, setSubsectionIndex] = useState(false)
  const [onImage, setOnImage] = useState(null)

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

  const addFeaturedSections = (e) => {
    if (values.mainTitle.trim().length === 0) return enqueueSnackbar("Tienes que escribir el Título", typeError)

    setLandingContent({
      ...landingContent,
      ["featuredSections"]: [...landingContent.featuredSections, {
        mainTitle: values.mainTitle,
        subsections: values.subsections,
        order: getRandomInt(100)
      }]
    });
    setValues({
      mainTitle: "",
      subsections: [],
    });
    enqueueSnackbar("Se agregó la sección con imagenes (debes guardar cambios)", typeInfo)
  }

  const deleteSubSection = (key, keySection, keySubSection) => {
    let newSubSections = landingContent.featuredSections[keySection].subsections.filter((item, keyPosition) => keyPosition !== keySubSection);
    let newLandingContent = JSON.parse(JSON.stringify(landingContent))
    for (let i = 0; i < newLandingContent.featuredSections.length; i++) {
      if (i === keySection) {
        newLandingContent.featuredSections[i].subsections = newSubSections
      }
    }
    setLandingContent(newLandingContent);
    enqueueSnackbar(
      "Se elimino el subtitulo de la sección (debes guardar cambios)",
      typeInfo
    );
  };

  const deleteFeaturedSections = (keySectionPosition) => {
    let newFeatureS = landingContent.featuredSections.filter((item, keySection) => keySection !== keySectionPosition);
    setLandingContent({
      ...landingContent,
      ["featuredSections"]: newFeatureS,
    });
    enqueueSnackbar(
      "Se elimino la sección de imágenes (debes guardar cambios)",
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
          {"Secciones de IMAGENES"}
        </h5>
        <div className="flex flex-col gap-6">
          <h6 className={styles.subtitle_form}>SECCIÓN DE IMAGENES</h6>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Titulo:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="mainTitle"
                value={values.mainTitle}
                onChange={handleInputChange}
                placeholder="Titulo de la sección..."
              />
            </div>
            <button
              type="button"
              onClick={addFeaturedSections}
              className={
                "bg-verdeD text-Blanco px-7 py-1 font-barlow-condensed font-medium rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR SECCIÓN
            </button>

            <div className="w-full flex flex-col relative">
              <Label className="font-barlow-semi-condensed text-Negro text-sm">
                Lista de secciones de imagenes:
              </Label>
              {landingContent?.featuredSections?.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium border-b-2 pb-3 mb-3 border-verdeD">
                    No hay ninguna sección de imagenes registrada...
                  </h6>
                </>
              ) : (
                <div className="flex flex-col gap-2 pb-3 mb-3 border-b-2 border-verdeD">
                  {landingContent?.featuredSections?.map((item, keySection) => (
                    <article key={keySection} className="flex flex-col p-2 text-white bg-verdeB rounded-md text-xs font-medium font-barolw uppercase">
                      <div className="flex justify-between items-center gap-2">
                        {item.mainTitle}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              setModalSubSection(true);
                              setOnKeyPosition(keySection);
                            }}
                            className="p-2 text-xs bg-blue-600 rounded-md text-white hover:bg-blue-800"
                          >
                            Agregar Subtitulo
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              deleteFeaturedSections(keySection);
                            }}
                            className="p-2 text-xs bg-red-600 rounded-md text-white hover:bg-red-800"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {item.subsections?.length === 0 ? (
                        <></>
                      ) : (
                        <ul className="py-4 px-2 flex flex-col gap-3">
                          {item.subsections?.map((item, key) => (
                            <li key={key} className="flex justify-between p-2 bg-verdeD rounded-md items-center">
                              {item.subtitle}
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    setModalSubSectionPicture(true)
                                    setSubsectionIndex(key)
                                    setOnKeyPosition(keySection)
                                    setOnImage(item.image)
                                  }}
                                  className="p-2 text-[11px] bg-blue-600 rounded-md text-white hover:bg-blue-800"
                                >
                                  Ver Imágen
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    deleteSubSection(
                                      item.subtitle,
                                      keySection,
                                      key
                                    );
                                  }}
                                  className="p-2 text-[11px] bg-red-600 rounded-md text-white hover:bg-red-800"
                                >
                                  Eliminar
                                </button>
                              </div>

                              <ModalNotHeader
                                openModal={modalSubSectionPicture}
                                setOpenModal={setModalSubSectionPicture}
                                size={"xl"}
                                component={
                                  <FormAddPictureSubSection setModalSubSectionPicture={setModalSubSectionPicture} sectionIndex={onKeyPosition} subsectionIndex={subsectionIndex} image={onImage} />
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      <ModalNotHeader
                        openModal={modalSubSection}
                        setOpenModal={setModalSubSection}
                        size={"xl"}
                        component={
                          <FormSubSection
                            landingContent={landingContent}
                            setLandingContent={setLandingContent}
                            position={onKeyPosition}
                          />
                        }
                      />
                    </article>

                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Actualizar Sección de Imagenes"}
        />
      </form>
    </>
  );
}