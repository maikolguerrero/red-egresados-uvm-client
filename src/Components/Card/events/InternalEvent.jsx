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

export function InternalEvent({ event }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const [openEditEvent, setOpenEditEvent] = useState(false);

  const handleDelete = (e) => {
    dispatch(deleteEvent({ eventId: event.id }));
  };

  return (
    <>
      {event.id === undefined ? (
        <article className="flex flex-col gap-1 w-full pb-8">
          <h4 className="uppercase text-xl font-medium">
            Este evento ha sido eliminado
          </h4>
        </article>
      ) : (
        <>
          <article className="flex flex-col gap-10 w-full font-barolw">
            <div className="h-full flex flex-col gap-2">
              <div className="flex gap-4 justify-between">
                <h4 className="text-base md:text-lg xl:text-xl font-bold tracking-tight text-Negro uppercase">
                  {event.title}
                </h4>
                {role === "egresado" ? (
                  <></>
                ) : (
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
                      <DropdownItem onClick={(e) => setOpenEditEvent(true)} className="flex gap-2 items-center text-Negro">
                        <MdEdit /> Editar Evento
                      </DropdownItem>
                      <DropdownItem className="flex gap-2 items-center text-Negro">
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
                )}
              </div>
              <h5 className="text-RojoC text-sm md:text-base xl:text-lg font-semibold h-full flex flex-col">
                <span>{event.startDate.split("T")[0]}</span>
                <span>
                  {" "}
                  HORA: {event.startDate.split("T")[1].split(".")[0]}
                </span>
              </h5>
              <h6 className="uppercase">
                <b>TIPO DE EVENTO:</b>{" "}
                <span className="text-verdeD font-medium font-barolw">
                  {event.eventType}
                </span>
              </h6>
            </div>

            <div>
              {event.tags.length === 0 ? (
                <></>
              ) : (
                <ul className="flex mb-2 gap-2">
                  {event.tags.map((item, key) => (
                    <li
                      className="py-1 px-3 rounded-full font-medium font-barolw bg-verdeA w-auto text-xs md:text-sm"
                      key={key}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {event.media.length === 0 ? (
                <img
                  src={"https://www.losprincipios.org/images/default.jpg"}
                  className="w-full rounded-lg border border-verdeC"
                />
              ) : (
                <img
                  src={event.media[0].url}
                  className="w-full rounded-lg border border-verdeC"
                />
              )}
            </div>

            <p className="text-base lg:text-xl font-medium text-Negro ">
              {event.description}
            </p>

            <div>
              <a
                target="_blank"
                href={event.virtualLink}
                className="uppercase text-sm py-2 px-4 bg-verdeB rounded-md font-medium text-Blanco hover:bg-verdeD transition-all duration-300"
              >
                Enlace virtual
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-Gris py-3 px-4 border border-verdeD rounded-md flex justify-between">
                <p className="font-barolw text-base">
                  <b>CAPACIDAD DE AFORO:</b> {event.capacity}
                </p>
                <FaPeopleRoof className="text-verdeC text-2xl" />
              </div>

              <div className="bg-Gris py-3 px-4 border border-verdeD rounded-md flex justify-between">
                <p className={`font-barolw text-base uppercase`}>
                  <b>ACTIVO:</b>{" "}
                  <span
                    className={`${
                      event.isActive ? "text-verdeB" : "text-RojoC"
                    } font-medium`}
                  >
                    {event.isActive ? "Activo" : "Inactivo"}
                  </span>
                </p>
                <GiDiploma className="text-verdeC text-2xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-Gris py-3 px-4 border border-verdeD rounded-md flex justify-between">
                <p className="font-barolw text-base">
                  <b>LUGAR:</b> {event.location}
                </p>
                <FaLocationDot className="text-verdeC text-2xl" />
              </div>

              <div className="bg-Gris py-3 px-4 border border-verdeD rounded-md flex justify-between">
                <p className="font-barolw text-base">
                  <b>CERTIFICADO:</b>{" "}
                  {event.certificate
                    ? "Si es certificado"
                    : "No es certificado"}
                </p>
                <GiDiploma className="text-verdeC text-2xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-Gris py-6 px-4 border border-verdeD rounded-md flex flex-col gap-6">
                <div className="flex justify-between">
                  <p className="font-barolw text-base">
                    <b>ORGANIZADORES DEL EVENTO</b>
                  </p>
                  <IoIosPeople className="text-verdeC text-2xl" />
                </div>

                {event.organizers.length === 0 ? (
                  <p className="text-sm font-barlow-condensed">
                    No hay organizadores en el evento
                  </p>
                ) : (
                  <ul className="list-decimal text-sm px-6 text-RojoC font-medium font-barolw">
                    {event.organizers.map((item, key) => (
                      <li className="uppercase" key={key}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-Gris py-6 px-4 border border-verdeD rounded-md flex flex-col gap-6">
                <div className="flex justify-between">
                  <p className="font-barolw text-base">
                    <b>INVITADOS ESPECIALES</b>
                  </p>
                  <FaPeopleGroup className="text-verdeC text-2xl" />
                </div>

                {event.specialGuests.length === 0 ? (
                  <p className="text-sm font-barlow px-4 uppercase font-medium text-RojoC">
                    No hay invitados especiales en el evento
                  </p>
                ) : (
                  <ul className="list-decimal text-sm px-6 text-RojoC font-medium font-barolw">
                    {event.specialGuests.map((item, key) => (
                      <li className="uppercase" key={key}>
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
    </>
  );
}
