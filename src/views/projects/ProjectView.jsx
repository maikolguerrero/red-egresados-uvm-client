import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InternalProject } from "../../Components/Card/projects/InternalProject";
import { getProyect } from "../../services/proyects/proyectService";
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

          <div className="flex flex-col gap-8 w-full">
            <InternalProject proyect={proyectSelect} />
          </div>
        </>
      )}
    </>
  );
}

export default ProjectView;