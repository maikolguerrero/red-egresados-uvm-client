import { Label } from "flowbite-react";
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { searchProyect } from "../../../services/proyects/proyectService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterProyect({ values, setValues }) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.proyects.pagination);

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
      searchProyect({
        page: pagination.page,
        limit: pagination.limit,
        status: values.status.trim() === "" ? null : values.status,
        search: values.search.trim() === "" ? null : values.search,
        username: values.username.trim() === "" ? null : values.username,
      })
    );
  };

  const handleReset = (e) => {
    if (values.status.trim() === "" && values.search.trim() === ""
      && values.username.trim() === "") {
      e.preventDefault();
      return;
    }

    setValues({
      status: "",
      search: "",
      username: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Estado:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="status"
              value={values.status}
              onChange={handleInputChange}
            >
              <option value="">Todos</option>
              <option value="not_started">Sin iniciar</option>
              <option value="in_progress">En progreso</option>
              <option value="paused">Pausado</option>
              <option value="cancelled">Cancelado</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Buscar por nombre:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="search"
              value={values.search}
              onChange={handleInputChange}
              placeholder="Filtrar por titulo del proyecto..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Creador o colaborador:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              placeholder="Filtrar por colaborador o creador..."
            />
          </div>
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

export default FilterProyect;