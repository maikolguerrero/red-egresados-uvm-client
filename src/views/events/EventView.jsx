import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import Nav from "../../Components/Nav";
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
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-4 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          {loading ? (
            <section className="h-full flex justify-center items-center w-full">
              <Loader />
            </section>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              <InternalEvent event={eventSelect} />
            </div>
          )}
        </section>

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default EventView;