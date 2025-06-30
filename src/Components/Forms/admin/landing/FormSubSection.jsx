import { Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { updateContentLanding } from "../../../../services/admin/landingService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormSubSection({ landingContent, setLandingContent, position }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    subtitle: "",
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
    let newLandingContent = JSON.parse(JSON.stringify(landingContent))
    for (let i = 0; i < newLandingContent.featuredSections.length; i++) {
      if (i === position) {
        newLandingContent.featuredSections[i].subsections.push(values)
      }
    }
    setLandingContent(newLandingContent)
    dispatch(updateContentLanding(newLandingContent));
    setValues({
      subtitle: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"AGREGAR SUBTITULO"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Subtitulo:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="subtitle"
              value={values.subtitle}
              onChange={handleInputChange}
              placeholder={"Escribe el subtitulo"}
            />
          </div>
        </div>
        <ButtonSmall action={handleSubmit} className={"bg-verdeD hover:bg-RojoC"} text={"AGREGAR"} />
      </form>
    </>
  );
}
