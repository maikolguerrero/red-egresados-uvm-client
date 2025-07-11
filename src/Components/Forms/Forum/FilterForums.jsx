import { Label } from "flowbite-react";
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchForum } from "../../../services/forum/forumService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterForums({ values, setValues }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector((state) => state.forums.pagination);

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
      searchForum({
        page: pagination.page,
        limit: pagination.limit,
        category: values.category.trim() === "" ? null : values.category,
        search: values.search.trim() === "" ? null : values.search,
      })
    );
  };

  const handleReset = (e) => {
    if (values.category.trim() === "" && values.search.trim() === "") {
      e.preventDefault();
      return;
    }

    setValues({
      category: "",
      search: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Categoria del Foro:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            >
              <option value="">Todas las categorias</option>
              <option value="general">General</option>
              <option value="empleos">Empleos</option>
              <option value="eventos">Eventos</option>
              <option value="carreras">Carreras</option>
              <option value="proyectos">Proyectos</option>
            </select>
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Buscar Foro:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="search"
              value={values.search}
              onChange={handleInputChange}
              placeholder="Filtrar por titulo del foro..."
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

export default FilterForums;