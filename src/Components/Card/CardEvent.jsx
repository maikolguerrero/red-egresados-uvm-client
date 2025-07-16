import { Dropdown, DropdownItem } from "flowbite-react";
import { formatUTCDateToLocalAMPM } from "../../utils/dateUtils";
import ButtonSmall from "../Buttons/ButtonSmall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { addAgenda, deleteAgenda, deleteEvent } from "../../services/events/eventsService";
import { useEffect, useState } from "react";
import { FormAddEvent } from "../Forms/Event/FormAddEvent";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { IoIosCamera } from "react-icons/io";
import { FormEditImage } from "../Forms/Event/FormEditImage";
import logoUVM from "../../../public/LogoUVM.png"

export function CardEvent({event}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id);
  const events = useSelector((state) => state.events.events);

  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [active, setActive] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);

  useEffect(() => {
    let date = new Date();
    let date2 = new Date(event?.endDate)

    if (date <= date2) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [event])

  useEffect(() => {
    for (let i = 0; i < event.savedByUsers.length; i++) {
      if (event.savedByUsers[i] === id) {
        return setScheduled(true);
      }
    }
    return setScheduled(false) 
  }, [events])

  const handleNavigate = (e) => {
    navigate(`/events/${event.id}`)
  }

  const handleDelete = (e) => {
    dispatch(deleteEvent({ eventId: event.id }));
  }

  const handleAgendar = (e) => {
    dispatch(addAgenda({ eventId: event.id, userId: id }))
  }

  const handleDeleteAgendar = (e) => {
    dispatch(deleteAgenda({ eventId: event.id, userId: id }))
  }

  return (
    <div className="w-full bg-white border border-verdeD rounded-lg shadow-sm ">
      <a>
        {event.media.length === 0 ? (
          <div className="flex rounded-t-lg w-full h-[300px] justify-center items-center bg-slate-100 border-verdeD border-b">
            <img
              src={logoUVM}
              className="rounded-t-lg w-56"
              alt="Multimedia Evento"
            />
          </div>
        ) : (
          <img
            className="rounded-t-lg border-b border-verdeD w-full"
            src={event.media[0].url}
            alt="Multimedia Evento"
          />
        )}
      </a>

      <div className="p-5 font-barolw">
        <h5 className="mb-4 text-sm md:text-base xl:text-lg font-bold tracking-tight text-Negro uppercase">
          {event.title}
        </h5>
        <h6 className="text-RojoC text-xs md:text-sm xl:text-base font-semibold">
          <span className="text-verdeD">{active ? "INICIA: " : "INICIÓ: "}</span>
          {formatUTCDateToLocalAMPM(event?.startDate).date} A LAS{" "}
          {formatUTCDateToLocalAMPM(event?.startDate).time}
        </h6>
        <h6 className="text-RojoC mb-8 text-xs md:text-sm xl:text-base font-semibold">
          <span className="text-verdeD">
            {active ? "FINALIZA: " : "FINALIZÓ: "}
          </span>
          {formatUTCDateToLocalAMPM(event?.endDate).date} A LAS{" "}
          {formatUTCDateToLocalAMPM(event?.endDate).time}
        </h6>
        <p className="mb-3 font-medium text-Negro ">{event.description}</p>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <ButtonSmall
              action={handleNavigate}
              text={"Ver más..."}
              className={"bg-verdeC hover:bg-RojoC"}
            />
            {scheduled ? (
              <ButtonSmall
                action={handleDeleteAgendar}
                text={"Eliminar de Agenda"}
                className={"bg-verdeC hover:bg-RojoC"}
              />
            ) : active ? (
              <ButtonSmall
                action={handleAgendar}
                text={"Agendar"}
                className={"bg-verdeC hover:bg-RojoC"}
              />
            ) : (
              <></>
            )}
          </div>

          {role === "admin" || role === "superadmin" ? (
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
              <DropdownItem
                onClick={(e) => setOpenEditImage(true)}
                className="flex gap-2 items-center text-Negro"
              >
                <IoIosCamera /> Editar Imagen
              </DropdownItem>
              <DropdownItem
                onClick={handleDelete}
                className="flex gap-2 items-center text-Negro"
              >
                <MdDelete /> Eliminar Evento
              </DropdownItem>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ModalNotHeader
        openModal={openEditEvent}
        setOpenModal={setOpenEditEvent}
        size={"3xl"}
        component={<FormAddEvent eventSelect={event} type={"edit"} />}
      />
      <ModalNotHeader
        openModal={openEditImage}
        setOpenModal={setOpenEditImage}
        size={"3xl"}
        component={<FormEditImage internal={false} event={event} />}
      />
    </div>
  );
}