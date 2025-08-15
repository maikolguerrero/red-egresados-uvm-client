import { Label } from "flowbite-react";
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../services/users/usersService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterGraduates({ values, setValues }) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.users.pagination);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReset = (e) => {
    if (values.query.trim() === "" && values.location.trim() === ""
      && values.degree.trim() === "" && values.graduationYear.trim() === "") {
      e.preventDefault();
      return;
    }

    setValues({
      query: "",
      location: "",
      degree: "",
      graduationYear: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getUsers({
        page: pagination.page,
        limit: pagination.limit,
        query: values.query.trim() === "" ? null : values.query,
        location: values.location.trim() === "" ? null : values.location,
        degree: values.degree.trim() === "" ? null : values.degree,
        graduationYear: values.graduationYear.trim() === "" ? null : values.graduationYear,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Nombre:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="query"
              value={values.query}
              onChange={handleInputChange}
              placeholder="Filtrar por nombre..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Ubicación:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              placeholder="Filtrar por ubicación..."
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              TÍtulo obtenido:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="degree"
              value={values.degree}
              onChange={handleInputChange}
              placeholder="Filtrar por título obtenido..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Año de graduación:
            </Label>
            <input
              className={styles.input}
              type="number"
              min={1997}
              max={new Date().getFullYear()}
              name="graduationYear"
              value={values.graduationYear}
              onChange={handleInputChange}
              placeholder="Filtrar por año de graduación..."
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

export default FilterGraduates;