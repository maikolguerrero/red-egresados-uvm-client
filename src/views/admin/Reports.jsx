import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchReport } from "../../services/reports/reportsService";
import { Loader } from "../../Components/Loader";
import CardReport from "../../Components/Card/CardReport";
import FilterReport from "../../Components/Forms/admin/FilterReport";
import Paginations from "../../Components/Paginations";

function Reports() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.reports.pagination);
  const reports = useSelector((state) => state.reports.reports);
  const loading = useSelector((state) => state.reports.loading);

  const [values, setValues] = useState({
    status: ""
  })

  useEffect(() => {
    dispatch(
      searchReport({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const onPageChange = (page) => {
    dispatch(
      searchReport({
        page: page,
        limit: pagination.limit,
        status: values.status.trim() === "" ? null : values.status,
      })
    );
  };

  return (
    <>
      <article className="w-full pb-8 border-b-2 border-verdeD mb-8">
        <h3 className="font-barolw text-lg font-semibold px-3 py-1 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
          Menu de filtrado
        </h3>
        <FilterReport values={values} setValues={setValues} />
      </article>

      {loading ? (
        <div className="w-full h-full items-center flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* sin notificaciones */}
          {reports.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <div className="bg-Gris p-4 rounded-lg shadow-sm">
                <p className="text-center font-barolw text-lg">
                  No hay reportes
                </p>
              </div>
            </div>
          ) : reports.length === 0 ? (
            <>
              <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                No se encontraron reportes con ese filtrado
              </h4>
            </>
          ) : (
            <>
              <div className="w-full gap-6 justify-center flex-col flex">
                {reports.map((item, key) => (
                  <CardReport key={key} item={item} />
                ))}
              </div>

              {pagination.pages === 1 ? (
                <></>
              ) : (
                <Paginations
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={onPageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Reports;