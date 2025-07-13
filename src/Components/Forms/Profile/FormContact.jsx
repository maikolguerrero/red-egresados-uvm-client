
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Buttons/Button";
import { Label } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../../models/alertModels";
import { updatePictureProfile, updateProfile } from "../../../services/users/usersService";
import perfil from "../../../../public/Perfil.jpg"

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValuesPersonalData = {
  birthDate: null,
  location: "",
};

let defaultValues = {
  phone: "",
  alternateEmail: "",
  website: "",
};

let defaultSocialMedias = {
  instagram: "",
  facebook: "",
  linkedin: "",
  x: "",
  youtube: "",
  tiktok: "",
  whatsapp: "",
  telegram: "",
  github: "",
};

function FormContact() {
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const [valuesPersonalData, setValuesPersonalData] = useState(defaultValuesPersonalData)
  const [values, setValues] = useState(defaultValues)
  const [image, setImage] = useState(false);
  const [values2, setValues2] = useState(defaultSocialMedias)
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (profile?.profile?.personalData != undefined) {
      setValuesPersonalData(profile.profile.personalData)
    }
    if (profile?.profile?.contact != undefined) {
      setValues(profile.profile.contact)
    }
    if (profile?.profile?.socialMedia != undefined) {
      setValues2(profile.profile.socialMedia)
    }
  }, [profile])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0])
    }
  };

  const handleInputChangePersonalData = (e) => {
    const { name, value } = e.target;
    setValuesPersonalData({
      ...valuesPersonalData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setValues2({
      ...values2,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile({
      personalData: valuesPersonalData,
      contact: values,
      socialMedia: values2
    }))
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    if (picture === "") {
      enqueueSnackbar("No se ha seleccionado una foto nueva", typeError)
    } else {
      const formData = new FormData()
      formData.append("picture", picture);
      dispatch(updatePictureProfile(formData))
    }
  };

  return (
    <>
      <form className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>FOTO PERFIL</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3 items-center justify-center relative">
              <div className="flex relative">
                {image !== false ? (
                  // Si 'image' tiene un valor (es decir, el usuario ha seleccionado una imagen temporal)
                  <img
                    src={image}
                    alt="Foto Perfil"
                    className="h-[200px] w-[200px] border border-verdeD object-cover"
                  />
                ) : profile.user.profilePicture.url === null ? (
                  // Si no hay 'image' y la foto de perfil del usuario es null, muestra la inicial
                  <div className="h-[200px] w-[200px] border border-verdeD bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="text-white text-7xl font-bold uppercase">
                      {profile.user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  // Si no hay 'image' pero sí hay foto de perfil del usuario
                  <img
                    src={profile.user.profilePicture.url}
                    alt="Foto Perfil"
                    className="h-[200px] w-[200px] border border-verdeD object-cover"
                  />
                )}
                <div className="bg-verdeD h-10 w-10 absolute right-0 bottom-0 flex justify-center items-center">
                  <FaCamera className="text-white text-2xl" />
                </div>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="absolute w-full h-full hover:cursor-pointer opacity-0"
                />
              </div>
              <Button
                action={handleSubmitPicture}
                className={"w-auto"}
                text="ACTUALIZAR FOTO"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>DATOS PERSONALES</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha de Nacimiento:
              </Label>
              <input
                className={styles.input}
                type="date"
                name="birthDate"
                max={new Date().toISOString().split("T")[0].split("-")[0] - 18 + "-" + new Date().toISOString().split("T")[0].split("-")[1] + "-" + new Date().toISOString().split("T")[0].split("-")[2]} // Restar 18 años
                value={valuesPersonalData?.birthDate?.split("T")[0]}
                onChange={handleInputChangePersonalData}
                placeholder="Fecha de nacimiento"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Ubicación:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="location"
                value={valuesPersonalData.location}
                onChange={handleInputChangePersonalData}
                placeholder="Ubicación"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>CONTACTO</h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Teléfono:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={values.phone}
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
                name="alternateEmail"
                value={values.alternateEmail}
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
                type="text"
                name="website"
                value={values.website}
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
                name="instagram"
                value={values2.instagram}
                onChange={handleInputChange2}
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
                name="facebook"
                value={values2.facebook}
                onChange={handleInputChange2}
                placeholder="Url de tu perfil"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Linkedin:
              </Label>
              <input
                className={styles.input}
                type="text"
                name="linkedin"
                value={values2.linkedin}
                onChange={handleInputChange2}
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
                name="x"
                value={values2.x}
                onChange={handleInputChange2}
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
                name="youtube"
                value={values2.youtube}
                onChange={handleInputChange2}
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
                name="tiktok"
                value={values2.tiktok}
                onChange={handleInputChange2}
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
                name="whatsapp"
                value={values2.whatsapp}
                onChange={handleInputChange2}
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
                name="telegram"
                value={values2.telegram}
                onChange={handleInputChange2}
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
                name="github"
                value={values2.github}
                onChange={handleInputChange2}
                placeholder="Url de tu perfil"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button action={handleSubmit} className={"w-full"} text="GUARDAR CAMBIOS" />
        </div>
      </form>
    </>
  );
}

export default FormContact;