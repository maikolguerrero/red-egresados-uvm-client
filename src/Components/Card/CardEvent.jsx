import { Card } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import { useNavigate } from "react-router-dom";

export function CardEvent({event}) {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    navigate(`/events/${event.id}`)
  }

  return (
    <div className="w-full bg-white border border-verdeD rounded-lg shadow-sm ">
      <a>
        {event.media.length === 0 ? (
          <img
            src={"https://www.losprincipios.org/images/default.jpg"}
            className="rounded-t-lg border-b border-verdeD w-full"
            alt="Multimedia Evento"
          />
        ) : (
          <img
            className="rounded-t-lg border-b border-verdeD w-full"
            src={event.media[0].url}
            alt="Multimedia Evento"
          />
        )}
      </a>

      <div className="p-5 font-barolw">
        <h5 className="mb-1 text-sm md:text-base xl:text-lg font-bold tracking-tight text-Negro uppercase">
          {event.title}
        </h5>
        <h6 className="text-RojoC mb-8 text-xs md:text-sm xl:text-base font-semibold">
          {event.startDate.split("T")[0]}. HORA:{" "}
          {event.startDate.split("T")[1].split(".")[0]}
        </h6>
        <p className="mb-3 font-medium text-Negro ">{event.description}</p>

        <div className="flex gap-3">
          <ButtonSmall
            action={handleNavigate}
            text={"Ver mas..."}
            className={"bg-verdeC hover:bg-RojoC"}
          />
          <ButtonSmall
            text={"Agendar"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        </div>
      </div>
    </div>
  );
}