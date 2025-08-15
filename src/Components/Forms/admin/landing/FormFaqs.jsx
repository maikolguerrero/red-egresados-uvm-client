import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../../../../utils/notifications";
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

export function FormFaqs({landing}) {
  const dispatch = useDispatch();

  const [landingContent, setLandingContent] = useState({
    faqs: [],
  })
  const [values, setValues] = useState({
    question: "",
    answer: ""
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

  const addQuestion = (e) => {
      if (values.question.trim().length === 0) return notify.error("Falta la pregunta", false)
      if (values.answer.trim().length === 0) return notify.error("Falta la respuesta", false)

      setLandingContent({
        ...landingContent,
        ["faqs"]: [...landingContent.faqs, {
          question: values.question,
          answer: values.answer,
          order: getRandomInt(100)
        }],
      });
      setValues({
        question: "",
        answer: "",
      });
    notify.info("Agregada la pregunta frecuente (debes guardar cambios)", false)
  }

  const deleteQuestion = (key) => {
    let newFaq = landingContent.faqs.filter((item) => item.question !== key);
    setLandingContent({
      ...landingContent,
      ["faqs"]: newFaq,
    });
    notify.info("Eliminada la pregunta frecuente (debes guardar cambios)", false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContentLanding(landingContent))
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"Preguntas Frecuentes"}
        </h5>
        <div className="flex flex-col gap-6">
          <h6 className={styles.subtitle_form}>AGREGAR PREGUNTAS</h6>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Pregunta:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="question"
                value={values.question}
                onChange={handleInputChange}
                placeholder="Pregunta a realizar..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Respuesta:
              </Label>
              <textarea
                rows={6}
                className={styles.input}
                type="text"
                name="answer"
                value={values.answer}
                onChange={handleInputChange}
                placeholder="Respuesta de la pregunta..."
              />
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className={
                "bg-verdeD text-Blanco px-7 py-1 font-barlow-condensed font-medium rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR PREGUNTA
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de preguntas frecuentes:
              </Label>
              {landingContent.faqs.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium border-b-2 pb-3 mb-3 border-verdeD">
                    No hay ninguna prefunta frecuente registrada...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2 pb-3 mb-3 border-b-2 border-verdeD">
                  {landingContent.faqs.map((item, key) => (
                    <li key={key}>
                      <ItemBabge
                        key={key}
                        text={item.question}
                        onClick={deleteQuestion}
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
          text={"Actualizar Preguntas"}
        />
      </form>
    </>
  );
}