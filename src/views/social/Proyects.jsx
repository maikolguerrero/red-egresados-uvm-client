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

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
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

function Proyects() {
  const pagination = useSelector((state) => state.proyects.pagination);
  const proyects = useSelector((state) => state.proyects.proyects);
  const loading = useSelector((state) => state.proyects.loadingPage);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const max = Math.ceil(data.length / perPage);

  const [openAddProyect, setOpendAddProyect] = useState(false);

  useEffect(() => {
    dispatch(
      searchProyect({
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, []);

  const onPageChange = (page) => setCurrentPage(page);
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        {loading ? (
          <section className="h-[89.5vh] flex justify-center items-center w-full">
            <Loader />
          </section>
        ) : (
          <>
            <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-8 flex flex-col items-center h-[89.5vh]  overflow-y-scroll overflow-x-auto">
              <div className="w-full gap-6 justify-center flex-wrap flex">
                {proyects.map((item) => (
                  <CardProyect key={item.id} proyect={item} />
                ))}
              </div>
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
            </section>

            <div className="absolute right-8 bottom-6 flex flex-col gap-2">
              <ButtonAdd setOpenModal={setOpendAddProyect} />
              <ButtonMessages />
            </div>
          </>
        )}

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
