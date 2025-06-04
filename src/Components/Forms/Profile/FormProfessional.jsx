
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Buttons/Button";
import { Label } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Skills } from "../../Skills";
import { ItemBabge } from "../../Babge/ItemBabge";
import { enqueueSnackbar } from "notistack";
import { typeError, typeInfo } from "../../../models/alertModels";
import { updateProfile } from "../../../services/users/usersService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

let defaultValues = {
  "summary": "",
  "skills" : "",
  "interests": "",
};

let defaultEd = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: 0,
  endYear: 0,
};

let defaultCr = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
  credentialID: "",
  credentialURL: "",
};

let defaultEx = {
  position: "",
  company: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

function FormProfessional() {
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);
  const [valuesEd, setValuesEd] = useState({});
  const [valuesCr, setValuesCr] = useState({});
  const [valuesEx, setValuesEx] = useState({});

  useEffect(() => {
    setValues(defaultValues);
    setValuesEd(defaultEd);
    setValuesCr(defaultCr);
    setValuesEx(defaultEx);
  }, []);

  useEffect(() => {
    setSkills(profile.profile.professional.skills);
    setInterests(profile.profile.professional.interests);
    setEducation(profile.profile.education);
    setCertifications(profile.profile.certifications);
    setExperience(profile.profile.experience);
    setValues({
      summary: profile.profile.professional.summary,
      skills: "",
      interests: "",
    });
  }, [profile]);

  const addSkill = (e) => {
    if (values.skills.trim().length === 0) {
      return enqueueSnackbar("No puedes agregar una habilidad sin escribirla", typeError)
    }
    setSkills([...skills, values.skills])
    setValues({
      ...values,
      "skills": "",
    });
    enqueueSnackbar("Se agrego la habilidad (debes guardar cambios)", typeInfo)
  }

  const addInterest = (e) => {
    if (values.interests.trim().length === 0) {
      return enqueueSnackbar("No puedes agregar un interes sin escribirlo", typeError)
    }
    setInterests([...interests, values.interests])
    setValues({
      ...values,
      "interests": "",
    });
    enqueueSnackbar("Se agrego el interes personal (debes guardar cambios)", typeInfo)
  }

  const addEducation = (e) => {
    if (valuesEd.institution.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de educacion", typeError)
    if (valuesEd.degree.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de educacion", typeError)
    if (valuesEd.fieldOfStudy.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de educacion", typeError)
    if (valuesEd.startYear === 0) return enqueueSnackbar("Tienes que llenar los campos de educacion", typeError)
    if (valuesEd.endYear === 0) return enqueueSnackbar("Tienes que llenar los campos de educacion", typeError)
    if (valuesEd.startYear > valuesEd.endYear) return enqueueSnackbar("No puedes escribir un año mayor al de finalizacion", typeError)
    
    setEducation([...education, valuesEd]);
    setValuesEd({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: 0,
      endYear: 0,
    });
    enqueueSnackbar("Se agrego el nivel de educacion (debes guardar cambios)", typeInfo)
  }

  const addCertification = (e) => {
    if (valuesCr.name.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de certicado", typeError)
    if (valuesCr.issuingOrganization.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de certicado", typeError)
    if (valuesCr.issueDate.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de certicado", typeError)
    if (valuesCr.credentialID.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de certicado", typeError)
    if (valuesCr.credentialURL.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de certicado", typeError)
      
    setCertifications([...certifications, valuesCr]);
    setValuesCr({
      name: "",
      issuingOrganization: "",
      issueDate: "",
      credentialID: "",
      credentialURL: "",
    });
    enqueueSnackbar("Se agrego el certificado (debes guardar cambios)", typeInfo)
  }

  const addExperiencie = (e) => {
    if (valuesEx.company.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de experiencia", typeError)
    if (valuesEx.position.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de experiencia", typeError)
    if (valuesEx.description.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de experiencia", typeError)
    if (valuesEx.startDate.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de experiencia", typeError)
    if (valuesEx.endDate.trim().length === 0) return enqueueSnackbar("Tienes que llenar los campos de experiencia", typeError)
    if (valuesEx.startDate > valuesEx.endDate) return enqueueSnackbar("No puede ser mayor la fecha de inicio que la fecha de finalizacion", typeError)
    
    setExperience([...experience, valuesEx]);
    setValuesEx({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    enqueueSnackbar("Se agrego la experiencia (debes guardar cambios)", typeInfo)
  }

  const deleteSkill = (key) => {
    let newSkills = skills.filter((item) => item !== key)
    setSkills(newSkills)
    enqueueSnackbar("Se elimino la habilidad (debes guardar cambios)", typeInfo)
  }

  const deleteInterest = (key) => {
    let newInterest = interests.filter((item) => item !== key)
    setInterests(newInterest)
    enqueueSnackbar("Se elimino el interes personal (debes guardar cambios)", typeInfo)
  }

  const deleteEducation = (key) => {
    let newEducation = education.filter((item) => item.degree !== key)
    setEducation(newEducation)
    enqueueSnackbar("Se elimino el nivel de educacion (debes guardar cambios)", typeInfo)
  }

  const deleteCertification = (key) => {
    let newCertification = certifications.filter((item) => item.name !== key)
    setCertifications(newCertification)
    enqueueSnackbar("Se elimino el certificado (debes guardar cambios)", typeInfo)
  }

  const deleteExperiencie = (key) => {
    let newExperiencie = experience.filter((item) => item.position !== key)
    setExperience(newExperiencie)
    enqueueSnackbar("Se elimino la experiencia laboral (debes guardar cambios)", typeInfo)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setValuesEd({
      ...valuesEd,
      [name]: value,
    });
  };

  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setValuesCr({
      ...valuesCr,
      [name]: value,
    });
  };

  const handleInputChange4 = (e) => {
    const { name, value } = e.target;
    setValuesEx({
      ...valuesEx,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      professional: {
        summary: values.summary,
        skills: skills,
        interests: interests,
      },
      experience: experience,
      education: education,
      certifications: certifications,
    };
    dispatch(updateProfile(data))
  };

  return (
    <>
      <form className="flex flex-col gap-8 w-full">
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
                name="summary"
                value={values.summary}
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
                  name="skills"
                  value={values.skills}
                  onChange={handleInputChange}
                  placeholder="habilidad..."
                />
                <button
                  type="button"
                  onClick={addSkill}
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
              {skills.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ninguna habilidad registrada...
                  </h6>
                </>
              ) : (
                <ul className="flex gap-2">
                  {skills.map((item, key) => (
                    <li>
                      <Skills key={key} text={item} onClick={deleteSkill} />
                    </li>
                  ))}
                </ul>
              )}
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
                  name="interests"
                  value={values.interests}
                  onChange={handleInputChange}
                  placeholder="interes..."
                />
                <button
                  type="button"
                  onClick={addInterest}
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
              {interests.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ningun interes registrado...
                  </h6>
                </>
              ) : (
                <ul className="flex gap-2">
                  {interests.map((item, key) => (
                    <li>
                      <Skills key={key} text={item} onClick={deleteInterest} />
                    </li>
                  ))}
                </ul>
              )}
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
                name="institution"
                value={valuesEd.institution}
                onChange={handleInputChange2}
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
                name="degree"
                value={valuesEd.degree}
                onChange={handleInputChange2}
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
                name="fieldOfStudy"
                value={valuesEd.fieldOfStudy}
                onChange={handleInputChange2}
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
                  type="number"
                  name="startYear"
                  min={0}
                  value={valuesEd.startYear}
                  onChange={handleInputChange2}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Año de Finalización:
                </Label>
                <input
                  className={styles.input}
                  type="number"
                  name="endYear"
                  value={valuesEd.endYear}
                  min={0}
                  onChange={handleInputChange2}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addEducation}
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
              {education.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ninguna educacion registrada...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  {education.map((item, key) => (
                    <li>
                      <ItemBabge
                        key={key}
                        text={item.degree}
                        onClick={deleteEducation}
                      />
                    </li>
                  ))}
                </ul>
              )}
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
                name="name"
                value={valuesCr.name}
                onChange={handleInputChange3}
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
                name="issuingOrganization"
                value={valuesCr.issuingOrganization}
                onChange={handleInputChange3}
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
                name="issueDate"
                value={valuesCr.issueDate}
                onChange={handleInputChange3}
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
                  name="credentialID"
                  value={valuesCr.credentialID}
                  onChange={handleInputChange3}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  URL de la Credencial:
                </Label>
                <input
                  className={styles.input}
                  type="text"
                  name="credentialURL"
                  value={valuesCr.credentialURL}
                  onChange={handleInputChange3}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addCertification}
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
              {certifications.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ningun certificado registrado...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  {certifications.map((item, key) => (
                    <li>
                      <ItemBabge
                        key={key}
                        text={item.name}
                        onClick={deleteCertification}
                      />
                    </li>
                  ))}
                </ul>
              )}
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
                name="company"
                value={valuesEx.company}
                onChange={handleInputChange4}
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
                name="position"
                value={valuesEx.position}
                onChange={handleInputChange4}
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
                name="description"
                value={valuesEx.description}
                onChange={handleInputChange4}
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
                  name="startDate"
                  value={valuesEx.startDate}
                  onChange={handleInputChange4}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Fecha de Finalización:
                </Label>
                <input
                  className={styles.input}
                  type="date"
                  name="endDate"
                  value={valuesEx.endDate}
                  onChange={handleInputChange4}
                />
              </div>
            </div>
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Sigo Actualmente:
              </Label>
              <select
                className={styles.input}
                name="current"
                value={valuesEx.current}
                onChange={handleInputChange4}
              >
                <option value="false">No</option>
                <option value="true">Si</option>
              </select>
            </div>
            <button
              type="button"
              onClick={addExperiencie}
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
              {experience.length === 0 ? (
                <>
                  <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                    No hay ninguna experiencia laboral registrada...
                  </h6>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  {experience.map((item, key) => (
                    <li>
                      <ItemBabge
                        key={key}
                        text={item.position}
                        onClick={deleteExperiencie}
                      />
                    </li>
                  ))}
                </ul>
              )}
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

export default FormProfessional;