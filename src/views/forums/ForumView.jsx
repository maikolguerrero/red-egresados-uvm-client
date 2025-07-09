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
import { Loader } from "../../Components/Loader";

function ForumView() {
  const forumSelect = useSelector((state) => state.forums.forumSelect);
  const loading = useSelector((state) => state.forums.loadingPage);
  const loader = useSelector((state) => state.forums.loading);
  const dispatch = useDispatch();

  const [openAddForum, setOpendAddForum] = useState(false);

  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    dispatch(getThreadsComments({ id: currentPath.split("/")[2] }));
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
            <>
              {loader ? (
                <>
                  <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
                    <div className="relative h-full w-full flex justify-center items-center">
                      <Loader />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-8 w-full">
                <InternalForum forum={forumSelect} />
              </div>
            </>
          )}
        </section>

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          <ButtonAdd setOpenModal={setOpendAddForum} />
          <ButtonMessages />
        </div>

        <ModalNotHeader
          openModal={openAddForum}
          setOpenModal={setOpendAddForum}
          size={"3xl"}
          component={<FormAddForum />}
        />
      </main>
    </>
  );
}

export default ForumView;