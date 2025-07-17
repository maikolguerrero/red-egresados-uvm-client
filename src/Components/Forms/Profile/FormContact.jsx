import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Buttons/Button";
import { Checkbox, Label } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import notify from "../../../utils/notifications";
import {
  updatePictureProfile,
  updateProfile,
} from "../../../services/users/usersService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValuesPersonalData = {
  birthDate: {
    value: null,
    isPublic: false,
  },
  location: {
    value: "",
    isPublic: false,
  },
};

let defaultValues = {
  phone: {
    value: "",
    isPublic: false,
  },
  alternateEmail: {
    value: "",
    isPublic: false,
  },
  website: {
    value: "",
    isPublic: false,
  },
};

let defaultSocialMedias = {
  instagram: {
    value: "",
    isPublic: false,
  },
  facebook: {
    value: "",
    isPublic: false,
  },
  linkedin: {
    value: "",
    isPublic: false,
  },
  x: {
    value: "",
    isPublic: false,
  },
  youtube: {
    value: "",
    isPublic: false,
  },
  tiktok: {
    value: "",
    isPublic: false,
  },
  whatsapp: {
    value: "",
    isPublic: false,
  },
  telegram: {
    value: "",
    isPublic: false,
  },
  github: {
    value: "",
    isPublic: false,
  },
};

function FormContact() {
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const [valuesPersonalData, setValuesPersonalData] = useState(
    defaultValuesPersonalData
  );
  const [values, setValues] = useState(defaultValues);
  const [image, setImage] = useState(false);
  const [values2, setValues2] = useState(defaultSocialMedias);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (profile?.profile?.personalData != undefined) {
      setValuesPersonalData(profile.profile.personalData);
    }
    if (profile?.profile?.contact != undefined) {
      setValues(profile.profile.contact);
    }
    if (profile?.profile?.socialMedia != undefined) {
      setValues2(profile.profile.socialMedia);
    }
  }, [profile]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0]);
    }
  };

  const handleInputChangePersonalData = (e) => {
    const { name, value } = e.target;
    setValuesPersonalData({
      ...valuesPersonalData,
      [name]: {
        ...valuesPersonalData[name],
        value: value,
      },
    });
  };

  const handleCheckChangePersonalData = (name, value) => {
    setValuesPersonalData({
      ...valuesPersonalData,
      [name]: {
        ...valuesPersonalData[name],
        isPublic: value,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        value: value,
      },
    });
  };

  const handleCheckChange = (name, value) => {
    setValues({
      ...values,
      [name]: {
        ...values[name],
        isPublic: value,
      },
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setValues2({
      ...values2,
      [name]: {
        ...values2[name],
        value: value,
      },
    });
  };

  const handleCheckChange2 = (name, value) => {
    setValues2({
      ...values2,
      [name]: {
        ...values2[name],
        isPublic: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        personalData: valuesPersonalData,
        contact: values,
        socialMedia: values2,
      })
    );
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    if (picture === "") {
      notify.error("No se ha seleccionado una imagen nueva", false);
    } else {
      const formData = new FormData();
      formData.append("picture", picture);
      dispatch(updatePictureProfile(formData));
    }
  };

  return (
    <>
      <form className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>FOTO DE PERFIL</h4>
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
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <p className="px-4 py-2 bg-slate-300 font-barlow-condensed rounded-md text-xs flex text-center justify-center w-auto">
                El checkbox ☑️ que se ubica a la derecha de cada campo, funciona para hacer público ese campo a todos los usuarios de la red.
              </p>
            </div>
            <h4 className={styles.subtitle_form}>DATOS PERSONALES</h4>

          </div>
          <div className="flex flex-col gap-3">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha de Nacimiento:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="date"
                  name="birthDate"
                  max={
                    new Date().toISOString().split("T")[0].split("-")[0] -
                    18 +
                    "-" +
                    new Date().toISOString().split("T")[0].split("-")[1] +
                    "-" +
                    new Date().toISOString().split("T")[0].split("-")[2]
                  } // Restar 18 años
                  value={
                    valuesPersonalData?.birthDate.value === null || valuesPersonalData?.birthDate.value === undefined
                      ? ""
                      : valuesPersonalData?.birthDate.value.split("T")[0]
                  }
                  onChange={handleInputChangePersonalData}
                  placeholder="Fecha de nacimiento"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={valuesPersonalData?.birthDate.isPublic}
                  onChange={(e) => {
                    handleCheckChangePersonalData(
                      "birthDate",
                      !valuesPersonalData?.birthDate.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Ubicación:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="location"
                  value={valuesPersonalData.location.value}
                  onChange={handleInputChangePersonalData}
                  placeholder="Ubicación"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={valuesPersonalData?.location.isPublic}
                  onChange={(e) => {
                    handleCheckChangePersonalData(
                      "location",
                      !valuesPersonalData?.location.isPublic
                    );
                  }}
                />
              </div>
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
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="phone"
                  value={values.phone.value}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values?.phone.isPublic}
                  onChange={(e) => {
                    handleCheckChange(
                      "phone",
                      !values?.phone.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Correo de Contacto:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="email"
                  name="alternateEmail"
                  value={values.alternateEmail.value}
                  onChange={handleInputChange}
                  placeholder="Correo de contacto"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values?.alternateEmail.isPublic}
                  onChange={(e) => {
                    handleCheckChange(
                      "alternateEmail",
                      !values?.alternateEmail.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Sitio Web:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="website"
                  value={values.website.value}
                  onChange={handleInputChange}
                  placeholder="Sitio web"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values?.website.isPublic}
                  onChange={(e) => {
                    handleCheckChange(
                      "website",
                      !values?.website.isPublic
                    );
                  }}
                />
              </div>
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
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="instagram"
                  value={values2.instagram.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.instagram.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "instagram",
                      !values2?.instagram.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Facebook:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="facebook"
                  value={values2.facebook.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.facebook.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "facebook",
                      !values2?.facebook.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Linkedin:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="linkedin"
                  value={values2.linkedin.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.linkedin.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "linkedin",
                      !values2?.linkedin.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                X:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="x"
                  value={values2.x.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.x.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "x",
                      !values2?.x.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Youtube:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="youtube"
                  value={values2.youtube.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.youtube.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "youtube",
                      !values2?.youtube.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                TikTok:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="tiktok"
                  value={values2.tiktok.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.tiktok.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "tiktok",
                      !values2?.tiktok.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Whatsapp:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="whatsapp"
                  value={values2.whatsapp.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.whatsapp.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "whatsapp",
                      !values2?.whatsapp.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Telegram:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="telegram"
                  value={values2.telegram.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.telegram.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "telegram",
                      !values2?.telegram.isPublic
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Github:
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  className={styles.input}
                  type="text"
                  name="github"
                  value={values2.github.value}
                  onChange={handleInputChange2}
                  placeholder="Url de tu perfil"
                />
                <Checkbox
                  className="w-6 h-6 bg-slate-200 focus:ring-1 focus:ring-verdeD checked:bg-verdeD"
                  checked={values2?.github.isPublic}
                  onChange={(e) => {
                    handleCheckChange2(
                      "github",
                      !values2?.github.isPublic
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button
            action={handleSubmit}
            className={"w-full"}
            text="GUARDAR CAMBIOS"
          />
        </div>
      </form>
    </>
  );
}

export default FormContact;
