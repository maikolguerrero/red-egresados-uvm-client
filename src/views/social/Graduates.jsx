import { useEffect, useState } from "react";
import { CardGraduate } from "../../Components/Card/CardGraduate";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/users/usersService";
import FilterGraduates from "../../Components/Forms/Graduates/FilterGraduates";
import { Loader } from "../../Components/Loader";
import Paginations from "../../Components/Paginations";

let defaultValues = {
  query: "",
  location: "",
  degree: "",
  graduationYear: "",
};

function Graduates() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const pages = useSelector((state) => state.users.pagination.pages)
  const page = useSelector((state) => state.users.pagination.page)
  const limit = useSelector((state) => state.users.pagination.limit)
  const loading = useSelector((state) => state.users.loadingPage)

  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    dispatch(
      getUsers({
        page: 1,
        limit: 10,
      })
    );
  }, [])

  const onPageChange = (page) => {
    dispatch(
      getUsers({
        page: page,
        limit: limit,
        query: values.query.trim() === "" ? null : values.query,
        location: values.location.trim() === "" ? null : values.location,
        degree: values.degree.trim() === "" ? null : values.degree,
        graduationYear: values.graduationYear.trim() === "" ? null : values.graduationYear,
      })
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <section className="w-full pb-6 mb-8 border-b-2 border-verdeD">
        <h3 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
          Menu de filtrado
        </h3>
        <FilterGraduates values={values} setValues={setValues} />
      </section>

      {loading ? (
        <section className="h-full flex justify-center items-center w-full">
          <Loader />
        </section>
      ) : (
        <>
          {users.length === 0 ? (
            <>
              <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                No se encontraron egresados con ese filtrado
              </h4>
            </>
          ) : (
            <>
              <section className="flex gap-6 flex-wrap justify-center">
                {users.map((item) => (
                  <CardGraduate user={item} key={item.id} />
                ))}
              </section>

              {pages > 1 && (
                <div className="flex overflow-x-auto sm:justify-center">
                  <Paginations
                    currentPage={page}
                    totalPages={pages}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Graduates;
