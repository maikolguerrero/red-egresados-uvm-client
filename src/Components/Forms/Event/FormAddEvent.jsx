import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { typeError, typeInfo } from "../../../models/alertModels";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { addComment } from "../../../services/forum/forumService";
import { Label } from "flowbite-react";
import { Skills } from "../../Skills";
import { IoIosAdd } from "react-icons/io";
import { addEvent } from "../../../services/events/eventsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddEvent({ eventSelect }) {
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [specialGuest, setSpecialGuest] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    eventType: "",
    location: "",
    capacity: 0,
    virtualLink: "",
    startDate: "",
    endDate: "",
    certificate: false,
    organizers: [],
    specialGuests: [],
    tags: [],
    isActive: true,
  });
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setPicture(event.target.files[0]);
    }
  };

  const addTag = (e) => {
    if (tag.trim().length === 0) {
      return enqueueSnackbar(
        "No puedes agregar la etiqueta sin escribirla",
        typeError
      );
    }
    setValues({
      ...values,
      tags: [...values.tags, tag],
    });
    setTag("");
    enqueueSnackbar("Se agrego la etiqueta", typeInfo);
  };

  const deleteTag = (key) => {
    let newTags = values.tags.filter((item) => item !== key);
    setValues({
      ...values,
      tags: newTags,
    });
    enqueueSnackbar("Se elimino la etiqueta", typeInfo);
  };

  const addOrganizer = (e) => {
    if (organizer.trim().length === 0) {
      return enqueueSnackbar(
        "No puedes agregar al organizador sin escribirlo",
        typeError
      );
    }
    setValues({
      ...values,
      organizers: [...values.organizers, organizer],
    });
    setTag("");
    enqueueSnackbar("Se agrego al organizador", typeInfo);
  };

  const deleteOrganizer = (key) => {
    let newOrg = values.organizers.filter((item) => item !== key);
    setValues({
      ...values,
      organizers: newOrg,
    });
    enqueueSnackbar("Se elimino al organizador", typeInfo);
  };

  const addEspecial = (e) => {
    if (specialGuest.trim().length === 0) {
      return enqueueSnackbar(
        "No puedes agregar al invitado especial sin escribirlo",
        typeError
      );
    }
    setValues({
      ...values,
      specialGuests: [...values.specialGuests, specialGuest],
    });
    setTag("");
    enqueueSnackbar("Se agrego al invitado especial", typeInfo);
  };

  const deleteEspecial = (key) => {
    let newEspecial = values.specialGuests.filter((item) => item !== key);
    setValues({
      ...values,
      specialGuests: newEspecial,
    });
    enqueueSnackbar("Se elimino al invitado especial", typeInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.title.trim() === "") {
        return enqueueSnackbar("Debe tener titulo el evento", typeError);
    }
    if (values.description.trim() === "") {
        return enqueueSnackbar("Debe tener descripcion el evento", typeError);
    }
    if (values.eventType.trim() === "") {
        return enqueueSnackbar("Debe especificar el tipo de evento", typeError);
    }
    if (values.location.trim() === "") {
        return enqueueSnackbar("Debe escribir la ubicacion de evento", typeError);
    }
    if (values.virtualLink.trim() === "") {
        return enqueueSnackbar("Debe escribir el link virtual del evento o (no tiene)", typeError);
    }
    if (values.capacity <= 0) {
        return enqueueSnackbar("Debes colocar una capacidad minima de 1 persona", typeError);
    }
    if (values.startDate.trim() === "") {
        return enqueueSnackbar("Debes colocar una fecha de inicio", typeError);
    }
    if (values.endDate.trim() === "") {
        return enqueueSnackbar("Debes colocar una fecha de finalizacion tentativa", typeError);
    }
    if (values.organizers.length === 0) {
        return enqueueSnackbar("Debes tener minimo 1 organizador", typeError);
    }

    dispatch(addEvent(values))
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {eventSelect === undefined ? "AGREGAR EVENTO" : "EDITAR EVENTO"}
        </h5>

        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Titulo del evento:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder="Titulo del evento..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Descripcion del evento:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder={"Descripcion del evento..."}
            ></textarea>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Tipo de evento:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="eventType"
              value={values.eventType}
              onChange={handleInputChange}
            >
              <option value="">Selecciona un tipo de evento...</option>
              <option value="conferencia">Conferencia</option>
              <option value="taller">Taller</option>
              <option value="seminario">Seminario</option>
              <option value="social">Social</option>
              <option value="networking">Networking</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Ubicacion del evento:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              placeholder="Ubicacion del evento..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Link virtual:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="virtualLink"
              value={values.virtualLink}
              onChange={handleInputChange}
              placeholder="Enlace virtual..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Capacidad:
              </Label>
              <input
                className={styles.input}
                type="number"
                min={0}
                name="capacity"
                value={values.capacity}
                onChange={handleInputChange}
                placeholder="Capacidad de aforo"
              />
            </div>

            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Certificado:
              </Label>
              <select
                className={styles.input}
                type="text"
                name="certificate"
                value={values.certificate}
                onChange={handleInputChange}
              >
                <option value={true}>Con certificacion</option>
                <option value={false}>Sin certificacion</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha y hora de inicio:
              </Label>
              <input
                className={styles.input}
                type="datetime-local"
                min={0}
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>

           <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha y hora de inicio:
              </Label>
              <input
                className={styles.input}
                type="datetime-local"
                min={0}
                name="endDate"
                value={values.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>ETIQUETAS</h4>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Etiqueta:
                </Label>
                <div className="flex gap-3">
                  <input
                    className={styles.input}
                    type="text"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Etiqueta..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                  >
                    <IoIosAdd className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Lista de Etiquetas:
                </Label>
                {values.tags.length === 0 ? (
                  <>
                    <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                      No hay ninguna etiqueta registrada...
                    </h6>
                  </>
                ) : (
                  <ul className="flex gap-2">
                    {values.tags.map((item, key) => (
                      <li>
                        <Skills key={key} text={item} onClick={deleteTag} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>ORGANIZADORES</h4>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Organizador:
                </Label>
                <div className="flex gap-3">
                  <input
                    className={styles.input}
                    type="text"
                    name="tag"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="Organizador del evento..."
                  />
                  <button
                    type="button"
                    onClick={addOrganizer}
                    className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                  >
                    <IoIosAdd className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Lista de Organizadores:
                </Label>
                {values.organizers.length === 0 ? (
                  <>
                    <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                      No hay ningun organizador registrado...
                    </h6>
                  </>
                ) : (
                  <ul className="flex gap-2">
                    {values.organizers.map((item, key) => (
                      <li>
                        <Skills key={key} text={item} onClick={deleteOrganizer} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>INVITADOS ESPECIALES</h4>
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col relative">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Invitado especial:
                </Label>
                <div className="flex gap-3">
                  <input
                    className={styles.input}
                    type="text"
                    name="specialGuest"
                    value={specialGuest}
                    onChange={(e) => setSpecialGuest(e.target.value)}
                    placeholder="Organizador del evento..."
                  />
                  <button
                    type="button"
                    onClick={addEspecial}
                    className="h-full w-auto p-2 rounded-md bg-verdeA hover:bg-RojoC hover:text-white flex items-end"
                  >
                    <IoIosAdd className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                  Lista de Invitados Especiales:
                </Label>
                {values.specialGuests.length === 0 ? (
                  <>
                    <h6 className="font-barlow-semi-condensed text-RojoC font-medium">
                      No hay ningun invitado especial...
                    </h6>
                  </>
                ) : (
                  <ul className="flex gap-2">
                    {values.specialGuests.map((item, key) => (
                      <li>
                        <Skills key={key} text={item} onClick={deleteEspecial} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Crear evento"}
        />
      </form>
    </>
  );
}
