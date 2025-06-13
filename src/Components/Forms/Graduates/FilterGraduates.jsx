import { Button, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/users/usersService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterGraduates({ values, setValues }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector((state) => state.users.pagination);

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
      getUsers({
        page: pagination.page,
        limit: pagination.limit,
        query: values.query.trim() === "" ? null : values.query,
        location: values.location.trim() === "" ? null : values.location,
        degree: values.degree.trim() === "" ? null : values.degree,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Nombre o Apellido:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="query"
              value={values.query}
              onChange={handleInputChange}
              placeholder="Filtrar por nombre o apellido..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Ubicacion:
            </Label>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              placeholder="Filtrar por ubicacion..."
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Carrera:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="degree"
              value={values.degree}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              <option value="Licenciatura%20en%20Administraci%C3%B3n%20de%20Empresas">
                Licenciatura en Administración de Empresas
              </option>
              <option value="Licenciatura%20en%20Contadur%C3%ADa%20P%C3%BAblica">
                Licenciatura en Contaduría Pública
              </option>
              <option value="Ingenier%C3%ADa%20de%20Computaci%C3%B3n">
                Ingeniería de Computación
              </option>
              <option value="Ingenier%C3%ADa%20Industrial">
                Ingeniería Industrial
              </option>
              <option value="Derecho">Derecho</option>
              <option value="Ciencias%20Pol%C3%ADticas%20y%20Administrativas">
                Ciencias Políticas y Administrativas
              </option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="rounded-full flex gap-2 items-center px-6 py-2 text-xs font-barolw uppercase font-semibold bg-verdeA hover:bg-verdeD hover:text-Blanco transition-all duration-200"
          >
            <FaFilter /> Filtrar
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterGraduates;