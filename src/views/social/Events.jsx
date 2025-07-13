import { useEffect, useState } from "react";
import { CardEvent } from "../../Components/Card/CardEvent";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { useDispatch, useSelector } from "react-redux";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddEvent } from "../../Components/Forms/Event/FormAddEvent";
import { FormAddPictureE } from "../../Components/Forms/Event/FormAddPictureE";
import { searchEvent } from "../../services/events/eventsService";
import FilterEvents from "../../Components/Forms/Event/FilterEvents";
import { Loader } from "../../Components/Loader";

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
      active:
        "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

let defaultValues = {
  type: "",
  search: "",
  upcoming: "",
};

function Events() {
  const role = useSelector((state) => state.auth.role);
  const passed = useSelector((state) => state.events.eventAdd.passed);
  const pagination = useSelector((state) => state.events.pagination);
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loadingPage);
  const dispatch = useDispatch();

  const [openAddEvent, setOpendAddEvent] = useState(false);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    dispatch(
      searchEvent({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const onPageChange = (page) => {
    dispatch(
      searchEvent({
        page: page,
        limit: pagination.limit,
        type: values.type.trim() === "" ? null : values.type,
        search: values.search.trim() === "" ? null : values.search,
        upcoming: values.upcoming.trim() === "" ? null : values.upcoming,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-4 lg:px-6 gap-14 flex flex-col h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <section className="w-full flex flex-col pb-8 border-b-2 border-verdeD">
            <h3 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
              Menu de filtrado
            </h3>
            <FilterEvents values={values} setValues={setValues} />
          </section>

          {loading ? (
            <section className="h-full flex justify-center items-center w-full">
              <Loader />
            </section>
          ) : (
            <>
              {events.length === 0 ? (
                <>
                  {" "}
                  <h4 className="font-barolw flex items-start h-full justify-center text-lg font-semibold px-2 text-RojoC uppercase">
                    No se encontraron eventos con ese filtrado
                  </h4>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-4 px-1 md:px-2 lg:px-6">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {events.map((item) => (
                        <CardEvent key={item.id} event={item} />
                      ))}
                    </section>

                    {pagination.pages == 1 ? (
                      <></>
                    ) : (
                      <div className="flex overflow-x-auto sm:justify-center">
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
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="absolute right-8 bottom-6 flex flex-col gap-2">
          {role === "egresado" ? (
            <></>
          ) : (
            <ButtonAdd setOpenModal={setOpendAddEvent} />
          )}
          <ButtonMessages />
        </div>

        <ModalNotHeader
          openModal={openAddEvent}
          setOpenModal={setOpendAddEvent}
          size={"3xl"}
          component={
            passed === 0 ? (
              <FormAddEvent />
            ) : (
              <FormAddPictureE setOpenModal={setOpendAddEvent} />
            )
          }
        />
      </main>
    </>
  );
}

export default Events;
