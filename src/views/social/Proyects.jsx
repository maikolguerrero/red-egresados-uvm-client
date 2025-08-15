import { CardProyect } from "../../Components/Card/CardProyect";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddProyect } from "../../Components/Forms/Proyects/FormAddProyect";
import { searchProyect } from "../../services/proyects/proyectService";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
import FilterProyect from "../../Components/Forms/Proyects/FilterProyect";
import Paginations from "../../Components/Paginations";

let defaultValues = {
  status: "",
  search: "",
  username: "",
};

function Proyects() {
  const pagination = useSelector((state) => state.proyects.pagination);
  const proyects = useSelector((state) => state.proyects.proyects);
  const loading = useSelector((state) => state.proyects.loadingPage);
  const loader = useSelector((state) => state.proyects.loading);
  const dispatch = useDispatch();

  const [values, setValues] = useState(defaultValues);

  const [openAddProyect, setOpendAddProyect] = useState(false);

  useEffect(() => {
    dispatch(
      searchProyect({
        page: 1,
        limit: 8,
      })
    );
  }, []);

  const onPageChange = (page) => {
    dispatch(
      searchProyect({
        page: page,
        limit: pagination.limit,
        status: values.status.trim() === "" ? null : values.status,
        search: values.search.trim() === "" ? null : values.search,
        username: values.username.trim() === "" ? null : values.username,
      })
    );
  };
  return (
    <>
      <section className="w-full pb-8 border-b-2 border-verdeD">
        <h3 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
          Menu de filtrado
        </h3>
        <FilterProyect values={values} setValues={setValues} />
      </section>
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
          {proyects.length === 0 ? (
            <>
              {" "}
              <h4 className="font-barolw flex items-start h-full justify-center text-lg font-semibold px-2 text-RojoC uppercase">
                No se encontraron proyectos con ese filtrado
              </h4>
            </>
          ) : (
            <section className="flex flex-col gap-6">
              {/* <div className="w-full gap-6 justify-center flex-wrap flex px-1 md:px-2 lg:px-6">
                {proyects.map((item) => (
                  <CardProyect key={item.id} proyect={item} />
                ))}
              </div> */}
              <div className="w-full gap-6 justify-center flex-wrap flex px-1 md:px-2 lg:px-6">
                {proyects.map((item) => (
                  <CardProyect key={item.id} proyect={item} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="flex justify-center">
                  <Paginations
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </section>
          )}

          <div className="absolute right-8 bottom-6 flex flex-col gap-2 mb-16">
            <ButtonAdd setOpenModal={setOpendAddProyect} />
          </div>
        </>
      )}
      <ModalNotHeader
        openModal={openAddProyect}
        setOpenModal={setOpendAddProyect}
        size={"3xl"}
        component={<FormAddProyect />}
      />
    </>
  );
}

export default Proyects;
