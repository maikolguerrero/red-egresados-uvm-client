
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Buttons/Button";
import { Label } from "flowbite-react";
import { FaCamera } from "react-icons/fa";

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

function FormContact() {
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
          <h4 className={styles.subtitle_form}>FOTO PERFIL</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3 items-center justify-center relative">
              <div className="flex relative">
                <img
                  src={
                    profile.user.profilePicture.url === null
                      ? perfil
                      : profile.user.profilePicture.url
                  }
                  alt="Foto Perfil"
                  className="h-auto w-[200px] border border-verdeD"
                />
                <div className="bg-verdeD h-10 w-10 absolute right-0 bottom-0 flex justify-center items-center">
                  <FaCamera className="text-white text-2xl" />
                </div>
                <input type="file" className="absolute w-full h-full hover:cursor-pointer opacity-0" />
              </div>
              <Button className={"w-auto"} text="ACTUALIZAR FOTO" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>CONTACTOS</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Teléfono:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Teléfono"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Correo de Contacto:
              </Label>
              <input
                className={styles.input}
                type="email"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Correo de contacto"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Sitio Web:
              </Label>
              <input
                className={styles.input}
                type="email"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Sitio web"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>REDES SOCIALES</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Instagram:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Facebook:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Linkedinn:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                X:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Youtube:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                TikTok:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Whatsapp:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Telegram:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Github:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                placeholder="Url de tu perfil"
              />
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

export default FormContact;