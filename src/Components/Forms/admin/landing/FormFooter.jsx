import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { typeError } from "../../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { updateContentLanding } from "../../../../services/admin/landingService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormFooter({landing}) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    footerText: "",
  });

  useEffect(() => {
    if (landing.footerText === undefined) {
      return;
    } else {
      setValues(landing);
    }
  }, [landing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.footerText.trim() === "") {
      return enqueueSnackbar("No puedes actualizar un footer vacío", typeError);
    }

    dispatch(updateContentLanding(values));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"Configuración del footer"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Footer
            </Label>
            <textarea
            rows={10}
              className={styles.input}
              type="text"
              name="footerText"
              value={values.footerText}
              onChange={handleInputChange}
              placeholder="Footer de la red de egresados..."
            />
          </div>
        </div>
        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Actualizar Footer"}
        />
      </form>
    </>
  );
}