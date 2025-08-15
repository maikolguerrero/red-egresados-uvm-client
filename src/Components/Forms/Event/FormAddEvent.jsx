import { useState } from "react";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useDispatch } from "react-redux";
import { Label } from "flowbite-react";
import { ItemBabge } from "../../Babge/ItemBabge";
import { IoIosAdd } from "react-icons/io";
import { addEvent, editEvent } from "../../../services/events/eventsService";
import { utcToLocalDateTime, parseLocalDateTimeToUTC } from "../../../utils/dateUtils";
import notify from "../../../utils/notifications";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAddEvent({ eventSelect, type }) {
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [specialGuest, setSpecialGuest] = useState("");
  const [values, setValues] = useState({
    title: eventSelect?.title || "",
    description: eventSelect?.description || "",
    eventType: eventSelect?.eventType || "",
    location: eventSelect?.location || "",
    capacity: eventSelect?.capacity || 0,
    virtualLink: eventSelect?.virtualLink || "",
    startDate: utcToLocalDateTime(eventSelect?.startDate || ""),
    endDate: utcToLocalDateTime(eventSelect?.endDate || ""),
    certificate: eventSelect?.certificate || false,
    organizers: eventSelect?.organizers || [],
    specialGuests: eventSelect?.specialGuests || [],
    tags: eventSelect?.tags || [],
    isActive: eventSelect?.isActive || true,
  });

  const validateDates = () => {
    const now = new Date().toISOString();
    const startDate = new Date(values.startDate).toISOString();
    const endDate = new Date(values.endDate).toISOString();

    // Validar que la fecha de inicio no sea pasada
    if (startDate < now) {
      notify.error("La fecha de inicio no puede ser una fecha pasada", false);
      return false;
    }

    // Validar que la fecha de fin no sea anterior a la de inicio
    if (endDate <= startDate) {
      notify.error("La fecha de fin no puede ser anterior a la de inicio", false);
      return false;
    }

    return true;
  };


  const toLocalDateTimeString = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    // Ajustar por el offset de la zona horaria
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  const parseLocalDateTime = (localDateTime) => {
    if (!localDateTime) return '';

    // Convertir la fecha local a un formato ISO que mantenga la hora local
    const [date, time] = localDateTime.split('T');
    return `${date}T${time}:00`;
  };

  const addTag = (e) => {
    if (tag.trim().length === 0) {
      return notify.error("Falta la etiqueta", false);
    }
    setValues({
      ...values,
      tags: [...values.tags, tag],
    });
    setTag("");
    notify.info("Agregada la etiqueta", false);
  };

  const deleteTag = (key) => {
    let newTags = values.tags.filter((item) => item !== key);
    setValues({
      ...values,
      tags: newTags,
    });
    notify.info("Eliminada la etiqueta", false);
  };

  const addOrganizer = (e) => {
    if (organizer.trim().length === 0) {
      return notify.error("No puedes agregar al organizador como un texto vacío", false);
    }
    setValues({
      ...values,
      organizers: [...values.organizers, organizer],
    });
    setOrganizer("");
    notify.info("Agregado al organizador", false);
  };

  const deleteOrganizer = (key) => {
    let newOrg = values.organizers.filter((item) => item !== key);
    setValues({
      ...values,
      organizers: newOrg,
    });
    notify.info("Eliminado al organizador", false);
  };

  const addEspecial = (e) => {
    if (specialGuest.trim().length === 0) {
      return notify.error(
        "No puedes agregar al invitado como un texto vacío",
        false
      );
    }
    setValues({
      ...values,
      specialGuests: [...values.specialGuests, specialGuest],
    });
    setSpecialGuest("");
    notify.info("Agregado al invitado especial", false);
  };

  const deleteEspecial = (key) => {
    let newEspecial = values.specialGuests.filter((item) => item !== key);
    setValues({
      ...values,
      specialGuests: newEspecial,
    });
    notify.info("Eliminado al invitado especial", false);
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
      return notify.error("Falta el título del evento", false);
    }
    if (values.description.trim() === "") {
      return notify.error("Falta la descripción del evento", false);
    }
    if (values.eventType.trim() === "") {
      return notify.error("Falta el tipo de evento", false);
    }
    // if (values.location.trim() === "") {
    //   return notify.error("Falta la ubicación del evento", false);
    // }
    // if (values.virtualLink.trim() === "") {
    //   return notify.error("Falta el link virtual del evento", false);
    // }
    if (values.capacity < 0) {
      return notify.error("Debes colocar una capacidad mínima de 0", false);
    }
    if (values.startDate.trim() === "") {
      return notify.error("Debes colocar una fecha de inicio", false);
    }
    if (values.endDate.trim() === "") {
      return notify.error("Debes colocar una fecha de finalización tentativa", false);
    }
    // Validación de fechas
    if (!validateDates()) {
      return;
    }
    if (values.organizers.length === 0) {
      return notify.error("Falta tener mínimo 1 organizador", false);
    }

    // Crear copia de values con las fechas formateadas
    const formData = {
      ...values,
      startDate: parseLocalDateTimeToUTC(values.startDate),
      endDate: parseLocalDateTimeToUTC(values.endDate),
    };

    // if (eventSelect === undefined) {
    //   dispatch(addEvent(values))
    // } else {
    //   dispatch(editEvent({
    //     eventId: eventSelect.id,
    //     data: values,
    //     type: type
    //   }))
    // }

    if (eventSelect === undefined) {
      dispatch(addEvent(formData));
    } else {
      dispatch(editEvent({
        eventId: eventSelect.id,
        data: formData,
        type: type
      }));
    }
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
              Título del evento:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder="Título del evento..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Descripción del evento:
            </Label>
            <textarea
              className={styles.input}
              type="text"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              placeholder={"Descripción del evento..."}
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
              Ubicación del evento (opcional):
            </Label>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              placeholder="Ubicación del evento..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Link virtual (opcional):
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

          {/* <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Estado del evento:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="isActive"
              value={values.isActive}
              onChange={handleInputChange}
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Capacidad (opcional dejar en 0):
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
                <option value={true}>Con certificación</option>
                <option value={false}>Sin certificación</option>
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
                // min={0}
                // min={new Date().toISOString().slice(0, 16)}
                min={toLocalDateTimeString(new Date().toISOString())}
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full flex flex-col relative">
              <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                Fecha y hora de finalización:
              </Label>
              <input
                className={styles.input}
                type="datetime-local"
                // min={values.startDate || new Date().toISOString().slice(0, 16)} // No puede ser anterior a startDate min={0}
                min={values.startDate || toLocalDateTimeString(new Date().toISOString())}
                name="endDate"
                value={values.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>ETIQUETAS (opcional)</h4>
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
                  <ul className="flex flex-col gap-2">
                    {values.tags.map((item, key) => (
                      <li key={key}>
                        <ItemBabge
                          key={key}
                          text={item}
                          onClick={deleteTag}
                        />
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
                      No hay ningún organizador registrado...
                    </h6>
                  </>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {values.organizers.map((item, key) => (
                      <li key={key}>
                        <ItemBabge
                          key={key}
                          text={item}
                          onClick={deleteOrganizer}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={styles.subtitle_form}>INVITADOS ESPECIALES (opcional)</h4>
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
                    placeholder="Invitado del evento..."
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
                      No hay ningún invitado especial...
                    </h6>
                  </>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {values.specialGuests.map((item, key) => (
                      <li key={key}>
                        <ItemBabge
                          key={key}
                          text={item}
                          onClick={deleteEspecial}
                        />
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
          text={eventSelect === undefined ? "Crear evento" : "Editar evento"}
        />
      </form>
    </>
  );
}
