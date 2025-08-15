import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatForUserLocale } from "../../../utils/dateUtils";

export function CardEventHome({event}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [active, setActive] = useState(false);

  const handleNavigate = (e) => {
    navigate(`/events/${event.id}`)
  }

  return (
    <article
      onClick={handleNavigate}
      className="flex h-full items-center justify-center p-2 hover:cursor-pointer"
    >
      <div className="w-full h-full flex flex-col justify-center items-start bg-white rounded-md p-3 border border-verdeC hover:bg-slate-100">
        <h5 className="mb-3 text-sm font-bold tracking-tight text-Negro uppercase">
          {event.title}
        </h5>
        <div className="flex flex-col">
          <h6 className="text-RojoC text-xs font-semibold">
            <span className="text-verdeD">INICIA: </span>
            {formatForUserLocale(event.startDate)}
          </h6>
          <h6 className="text-RojoC text-xs font-semibold">
            <span className="text-verdeD">
              {active ? "FINALIZA: " : "FINALIZO: "}
            </span>
            {formatForUserLocale(event.endDate)}
          </h6>
          <h6 className="text-RojoC text-xs font-semibold">
            <span className="text-verdeD">
              LUGAR:{" "}
            </span>
            {event.location}
          </h6>
          <h6 className="text-RojoC text-xs font-semibold">
            <span className="text-verdeD">
              TIPO:{" "}
            </span>
            {event.eventType}
          </h6>
        </div>
      </div>
    </article>
  );
}