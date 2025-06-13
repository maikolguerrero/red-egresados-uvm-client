import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddForum } from "../../Components/Forms/Forum/FormAddForum";
import { FormAddPicture } from "../../Components/Forms/Forum/FormAddPicture";
import Nav from "../../Components/Nav";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { getThreadsComments } from "../../services/forum/forumService";
import { InternalForum } from "../../Components/Card/Forum/InternalForum";
import { InternalEvent } from "../../Components/Card/events/InternalEvent";
import { getEvent } from "../../services/events/eventsService";

function EventView() {
  const eventSelect = useSelector((state) => state.events.eventSelect);
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
          <div className="flex flex-col gap-8 w-full">
            <InternalEvent event={eventSelect} />
          </div>
        </section>

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default EventView;