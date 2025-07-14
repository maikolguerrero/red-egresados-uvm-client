import { Label } from "flowbite-react";
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchEvent } from "../../../services/events/eventsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterEvents({ values, setValues }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector((state) => state.events.pagination);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      searchEvent({
        page: pagination.page,
        limit: pagination.limit,
        type: values.type.trim() === "" ? null : values.type,
        search: values.search.trim() === "" ? null : values.search,
        upcoming: values.upcoming.trim() === "" ? null : values.upcoming,
      })
    );
  };

  const handleReset = (e) => {
    if (values.type.trim() === "" && values.search.trim() === ""
      && values.upcoming.trim() === "") {
      e.preventDefault();
      return;
    }

    setValues({
      type: "",
      search: "",
      upcoming: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Tipo de Evento:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="type"
              value={values.type}
              onChange={handleInputChange}
            >
              <option value="">Todos los tipos</option>
              <option value="conferencia">Conferencia</option>
              <option value="taller">Taller</option>
              <option value="seminario">Seminario</option>
              <option value="social">Social</option>
              <option value="networking">Networking</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Título y Descripción:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="search"
              value={values.search}
              onChange={handleInputChange}
              placeholder="Filtrar por título o descripción..."
            />
          </div>

          {
            /*<div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Estado del Evento:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="upcoming"
              value={values.upcoming}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div>*/
          }
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-full flex gap-2 items-center px-6 py-2 text-xs font-barolw uppercase font-semibold bg-verdeA hover:bg-verdeD hover:text-Blanco transition-all duration-200"
          >
            <FaFilter /> Filtrar
          </button>
          <button
            onClick={(e) => {
              handleReset(e);
            }}
            className="rounded-full flex gap-2 items-center px-6 py-2 text-xs font-barolw uppercase font-semibold bg-verdeA hover:bg-verdeD hover:text-Blanco transition-all duration-200"
          >
            <GrPowerReset /> Limpiar
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterEvents;