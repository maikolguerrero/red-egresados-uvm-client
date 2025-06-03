
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Buttons/Button";
import { Label } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import { ItemBabge } from "../../Babge/ItemBabge";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValues = {
  "idNumber": "",
  "studentId": "",
  "firstName": "",
  "lastName": "",
  "birthDate": "",
  "degree": "",
  "mention": "",
  "graduationDate": "",
  "email": "",
  "username": "",
  "password": "",
  "passwordConfirm": "",
  "location": ""
}

function FormProfessional() {
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(defaultValues);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>PERFIL PROFESIONAL</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Descripción:
              </Label>
              <textarea
                cols={40}
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Descripción profesional..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>HABILIDADES</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Habilidad de Valor:
              </Label>
              <div className="flex gap-3">
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  placeholder="habilidad..."
                />
                <button
                  type="button"
                  className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                >
                  <IoIosAdd className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de Habilidades:
              </Label>
              <ul className="flex">
                <li>
                  <Skills text={"JavaScript"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>INTERESES</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Intereses Personales:
              </Label>
              <div className="flex gap-3">
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  placeholder="interes..."
                />
                <button
                  type="button"
                  className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                >
                  <IoIosAdd className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de Intereses:
              </Label>
              <ul className="flex">
                <li>
                  <Skills text={"Futbol"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>EDUCACIÓN</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Institucion:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Carrera:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Campo de Estudio:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Año de Inicio:
                </Label>
                <input
                  className={styles.input}
                  type="date"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Año de Finalización:
                </Label>
                <input
                  className={styles.input}
                  type="date"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className={
                "bg-verdeC text-Blanco px-7 py-1 font-barlow-condensed font-bold rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de Estudios:
              </Label>
              <ul className="flex flex-col gap-2">
                <li>
                  <ItemBabge text={"Ingenieria"} />
                </li>
                <li>
                  <ItemBabge text={"Ingenieria"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>CERTIFICADOS</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Nombre:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Organizacion:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha del Certificado:
              </Label>
              <input
                className={styles.input}
                type="date"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  ID de la Credencial:
                </Label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  URL de la Credencial:
                </Label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className={
                "bg-verdeC text-Blanco px-7 py-1 font-barlow-condensed font-bold rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de Certificados:
              </Label>
              <ul className="flex flex-col gap-2">
                <li>
                  <ItemBabge text={"Live Coding JS"} />
                </li>
                <li>
                  <ItemBabge text={"Live Coding PYTHON"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>EXPERIENCIA</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Compañía:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Cargo:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="..."
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Descripción:
              </Label>
              <textarea
                cols={40}
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Descripción profesional..."
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Fecha de Inicio:
                </Label>
                <input
                  className={styles.input}
                  type="date"
                  name="firstName"
                  value={values.firstName}
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
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className={
                "bg-verdeC text-Blanco px-7 py-1 font-barlow-condensed font-bold rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 "
              }
              style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
            >
              AGREGAR
            </button>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Lista de Experiencia Laboral:
              </Label>
              <ul className="flex flex-col gap-2">
                <li>
                  <ItemBabge text={"Ingenieria"} />
                </li>
                <li>
                  <ItemBabge text={"Ingenieria"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="GUARDAR CAMBIOS" />
        </div>
      </form>
    </>
  );
}

export default FormProfessional;