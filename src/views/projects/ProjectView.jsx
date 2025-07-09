import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import Nav from "../../Components/Nav";
import { InternalProject } from "../../Components/Card/projects/InternalProject";
import { getProyect } from "../../services/proyects/proyectService";
import { Spinner } from "flowbite-react";
import { Loader } from "../../Components/Loader";

function ProjectView() {
  const proyectSelect = useSelector((state) => state.proyects.proyectSelect);
  const loading = useSelector((state) => state.proyects.loadingPage);
  const loader = useSelector((state) => state.proyects.loading);
  const dispatch = useDispatch();

  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    dispatch(getProyect({ id: currentPath.split("/")[2] }));
  }, []);

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        {loading ? (
          <section className="h-[89.5vh] flex flex-col gap-2 justify-center items-center w-full">
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
            <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-4 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
              <div className="flex flex-col gap-8 w-full">
                <InternalProject proyect={proyectSelect} />
              </div>
            </section>
          </>
        )}

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default ProjectView;