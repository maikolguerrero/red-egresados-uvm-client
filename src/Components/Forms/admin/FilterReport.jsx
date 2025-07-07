import { Button, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchForum } from "../../../services/forum/forumService";
import { searchReport } from "../../../services/reports/reportsService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FilterReport({values, setValues}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pagination = useSelector((state) => state.reports.pagination);

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
      searchReport({
        page: pagination.page,
        limit: pagination.limit,
        status: values.status.trim() === "" ? null : values.status,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-3 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Estado del reporte:
            </Label>
            <select
              className={styles.input}
              type="text"
              name="status"
              value={values.status}
              onChange={handleInputChange}
            >
              <option value="">Ambos Estados</option>
              <option value="resolved">Resuelto</option>
              <option value="pending">Pendiente</option>
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

export default FilterReport;