import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import { CardProyect } from "../../Components/Card/CardProyect";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { useEffect, useState } from "react";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddProyect } from "../../Components/Forms/Proyects/FormAddProyect";
import { searchProyect } from "../../services/proyects/proyectService";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
import FilterProyect from "../../Components/Forms/Proyects/FilterProyect";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700",
      span: "font-semibold text-gray-900",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-verdeD bg-Gris py-2 leading-tight text-Negro enabled:hover:bg-white enabled:hover:text-verdeD",
      active: "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

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

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [values, setValues] = useState(defaultValues);

  const max = Math.ceil(data.length / perPage);

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
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-4 lg:px-6 gap-8 flex flex-col items-center h-[89.5vh]  overflow-y-scroll overflow-x-auto">
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
                  <div className="w-full gap-6 justify-center flex-wrap flex px-1 md:px-2 lg:px-6">
                    {proyects.map((item) => (
                      <CardProyect key={item.id} proyect={item} />
                    ))}
                  </div>

                  {pagination.pages == 1 ? (
                    <></>
                  ) : (
                    <div className="flex justify-center">
                      <ThemeProvider theme={customTheme}>
                        <Pagination
                          theme={customTheme}
                          className="border-verdeD"
                          currentPage={pagination.page}
                          totalPages={pagination.pages}
                          onPageChange={onPageChange}
                        />
                      </ThemeProvider>
                    </div>
                  )}
                </section>
              )}

              <div className="absolute right-8 bottom-6 flex flex-col gap-2">
                <ButtonAdd setOpenModal={setOpendAddProyect} />
                <ButtonMessages />
              </div>
            </>
          )}
        </div>
        <ModalNotHeader
          openModal={openAddProyect}
          setOpenModal={setOpendAddProyect}
          size={"3xl"}
          component={<FormAddProyect />}
        />
      </main>
    </>
  );
}

export default Proyects;
