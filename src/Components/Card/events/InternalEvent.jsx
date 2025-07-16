import { FaLocationDot, FaPeopleGroup, FaPeopleRoof } from "react-icons/fa6";
import { GiDiploma } from "react-icons/gi";
import { IoIosCamera, IoIosPeople } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../../services/events/eventsService";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddEvent } from "../../Forms/Event/FormAddEvent";
import { useState } from "react";
import { formatUTCDateToLocalAMPM } from "../../../utils/dateUtils";
import { FaCalendar } from "react-icons/fa6";
import { FormEditImage } from "../../Forms/Event/FormEditImage";
import EntityNotFound from "../../EntityNotFound";

export function InternalEvent({ event }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);

  const handleDelete = (e) => {
    dispatch(deleteEvent({ eventId: event.id }));
  };

  return (
    <>
      {event?.id === undefined ? (
        <>
          <EntityNotFound entity="Evento" entityPath="/events" />
        </>
      ) : (
        <>
          <article className="flex flex-col gap-10 w-full font-barolw">
            <div className="h-full flex flex-col gap-2">
              <div className="flex gap-4 justify-between">
                <h4 className="text-base md:text-lg xl:text-xl font-bold tracking-tight text-Negro uppercase">
                  {event?.title}
                </h4>
                {role === "admin" || role === "superadmin" ? (
                  <>
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <div className="flex h-full justify-center items-center">
                          <FaEllipsisV className="hover:cursor-pointer" />
                        </div>
                      )}
                    >
                      <DropdownItem
                        onClick={(e) => setOpenEditEvent(true)}
                        className="flex gap-2 items-center text-Negro"
                      >
                        <MdEdit /> Editar Evento
                      </DropdownItem>
                      <DropdownItem onClick={(e) => setOpenEditImage(true)} className="flex gap-2 items-center text-Negro">
                        <IoIosCamera /> Editar Imagen
                      </DropdownItem>
                      <DropdownItem
                        onClick={handleDelete}
                        className="flex gap-2 items-center text-Negro"
                      >
                        <MdDelete /> Eliminar Evento
                      </DropdownItem>
                    </Dropdown>
                    <ModalNotHeader
                      openModal={openEditEvent}
                      setOpenModal={setOpenEditEvent}
                      size={"3xl"}
                      component={
                        <FormAddEvent eventSelect={event} type={"internal"} />
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <h5 className="text-RojoC text-sm md:text-base xl:text-lg font-semibold h-full flex flex-col">
                <span>{formatUTCDateToLocalAMPM(event?.startDate).date}</span>
                <span>
                  {" "}
                  HORA: {formatUTCDateToLocalAMPM(event?.startDate).time}
                </span>
              </h5>
              <h6 className="uppercase">
                <b>TIPO DE EVENTO:</b>{" "}
                <span className="text-verdeD font-medium font-barolw">
                  {event?.eventType}
                </span>
              </h6>
            </div>

            <div>
              {event?.tags?.length > 0 && (
                <ul className="flex flex-wrap mb-2 gap-2 overflow-x-auto pb-1">
                  {event?.tags?.map((item, key) => (
                    <li
                      className="py-1 px-3 rounded-full font-medium font-barolw bg-verdeA text-white whitespace-nowrap text-xs sm:text-sm"
                      key={key}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* {event.media.length === 0 ? (
                <img
                  src={"https://www.losprincipios.org/images/default.jpg"}
                  className="w-full rounded-lg border border-verdeC"
                />
              ) : (
                <img
                  src={event.media[0].url}
                  className="w-full rounded-lg border border-verdeC"
                />
              )} */}
              {event?.media?.length > 0 && (
                <img
                  src={event.media[0].url}
                  className="w-full rounded-lg border border-verdeC"
                />
              )}
            </div>

            <div>
              <h6 className="text-base lg:text-xl uppercase font-semibold">
                Descripción:
              </h6>
              <p className="text-base lg:text-xl font-medium text-Negro ">
                {event?.description}
              </p>
            </div>

            {event?.virtualLink && (
              <div>
                <a
                  target="_blank"
                  href={event.virtualLink}
                  className="uppercase text-sm py-2 px-4 bg-verdeB rounded-md font-medium text-Blanco hover:bg-verdeD transition-all duration-300"
                >
                  Enlace virtual
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estado del Evento */}
              <div className="bg-Gris p-3 border border-verdeD rounded-md flex justify-between items-start">
                <div className="flex-1 break-words pr-2">
                  <p className="font-barolw text-sm md:text-base uppercase">
                    <b>Estado:</b>{" "}
                    <span className={`${(event?.startDate >= new Date() && event?.endDate <= new Date()) ? "text-verdeB" : "text-RojoC"} font-medium`}>
                      {(event?.startDate >= new Date() && event?.endDate <= new Date()) ? "Activo" : "Inactivo"}
                    </span>
                  </p>
                </div>
                <FaCalendar className="text-verdeC text-xl md:text-2xl flex-shrink-0 mt-1" />
              </div>

              {/* Capacidad de Aforo */}
              {event?.capacity && (
                <div className="bg-Gris p-3 border border-verdeD rounded-md flex justify-between items-start">
                  <div className="flex-1 break-words pr-2">
                    <p className="font-barolw text-sm md:text-base">
                      <b>Capacidad:</b> {event?.capacity}
                    </p>
                  </div>
                  <FaPeopleRoof className="text-verdeC text-xl md:text-2xl flex-shrink-0 mt-1" />
                </div>
              )}

              {/* Ubicación */}
              {event?.location && (
                <div className="bg-Gris p-3 border border-verdeD rounded-md flex justify-between items-start">
                  <div className="flex-1 break-words pr-2">
                    <p className="font-barolw text-sm md:text-base">
                      <b>Lugar:</b> {event?.location}
                    </p>
                  </div>
                  <FaLocationDot className="text-verdeC text-xl md:text-2xl flex-shrink-0 mt-1" />
                </div>
              )}

              {/* Certificado */}
              {event?.certificate && (
                <div className="bg-Gris p-3 border border-verdeD rounded-md flex justify-between items-start">
                  <div className="flex-1 break-words pr-2">
                    <p className="font-barolw text-sm md:text-base">
                      <b>Certificado</b> por participar
                    </p>
                  </div>
                  <GiDiploma className="text-verdeC text-xl md:text-2xl flex-shrink-0 mt-1" />
                </div>
              )}

              {/* Organizadores */}
              <div className="bg-Gris p-4 border border-verdeD rounded-md md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-barolw text-sm md:text-base">
                    <b>Organizadores del evento</b>
                  </p>
                  <IoIosPeople className="text-verdeC text-xl md:text-2xl" />
                </div>
                {event?.organizers?.length === 0 ? (
                  <p className="text-xs md:text-sm font-barlow-condensed">
                    No hay organizadores en el evento
                  </p>
                ) : (
                  <ul className="list-decimal text-xs md:text-sm px-6 text-RojoC font-medium font-barolw space-y-2">
                    {event?.organizers?.map((item, key) => (
                      <li className="uppercase break-words" key={key}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Invitados Especiales */}
              <div className="bg-Gris p-4 border border-verdeD rounded-md md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-barolw text-sm md:text-base">
                    <b>Invitados especiales</b>
                  </p>
                  <FaPeopleGroup className="text-verdeC text-xl md:text-2xl" />
                </div>
                {event?.specialGuests?.length === 0 ? (
                  <p className="text-xs md:text-sm font-barlow uppercase font-medium text-RojoC">
                    No hay invitados especiales en el evento
                  </p>
                ) : (
                  <ul className="list-decimal text-xs md:text-sm px-6 text-RojoC font-medium font-barolw space-y-2">
                    {event?.specialGuests?.map((item, key) => (
                      <li className="uppercase break-words" key={key}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        </>
      )}

      <ModalNotHeader
        openModal={openEditImage}
        setOpenModal={setOpenEditImage}
        size={"3xl"}
        component={<FormEditImage internal={true} event={event} />}
      />
    </>
  );
}
