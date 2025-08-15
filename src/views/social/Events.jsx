import { useEffect, useState } from "react";
import { CardEvent } from "../../Components/Card/CardEvent";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { useDispatch, useSelector } from "react-redux";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddEvent } from "../../Components/Forms/Event/FormAddEvent";
import { FormAddPictureE } from "../../Components/Forms/Event/FormAddPictureE";
import { searchEvent } from "../../services/events/eventsService";
import FilterEvents from "../../Components/Forms/Event/FilterEvents";
import { Loader } from "../../Components/Loader";
import Paginations from "../../Components/Paginations";

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
              <div className="flex flex-col gap-4 px-1 md:px-2 lg:px-6 w-full">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                  {events.map((item) => (
                    <CardEvent key={item.id} event={item} />
                  ))}
                </section>

                {pagination.pages > 1 && (
                  <div className="flex overflow-x-auto sm:justify-center">
                    <Paginations
                      currentPage={pagination.page}
                      totalPages={pagination.pages}
                      onPageChange={onPageChange}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {role === "admin" || role === "superadmin" && (
        <div className="absolute flex flex-col gap-2 right-8 bottom-6 mb-16">
          <ButtonAdd setOpenModal={setOpendAddEvent} />
        </div>
      )}

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
    </>
  );
}

export default Events;
