import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InternalEvent } from "../../Components/Card/events/InternalEvent";
import { getEvent } from "../../services/events/eventsService";
import { Loader } from "../../Components/Loader";

function EventView() {
  const eventSelect = useSelector((state) => state.events.eventSelect);
  const loading = useSelector((state) => state.events.loadingPage);
  const dispatch = useDispatch();

  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    dispatch(getEvent({ id: currentPath.split("/")[2] }));
  }, []);

  return (
    <>
      {loading ? (
        <section className="h-full flex justify-center items-center w-full">
          <Loader />
        </section>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <InternalEvent event={eventSelect} />
        </div>
      )}
    </>
  );
}

export default EventView;