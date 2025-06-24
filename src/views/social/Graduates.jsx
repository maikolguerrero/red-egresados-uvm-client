import { useEffect, useState } from "react";
import { CardGraduate } from "../../Components/Card/CardGraduate";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/users/usersService";
import { onChangePage } from "../../features/users/usersSlice";
import FilterGraduates from "../../Components/Forms/Graduates/FilterGraduates";
import { Loader } from "../../Components/Loader";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
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
      active: "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

let defaultValues = {
  query: "",
  location: "",
  degree: "",
};

function Graduates() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const pages = useSelector((state) => state.users.pagination.pages)
  const page = useSelector((state) => state.users.pagination.page)
  const limit = useSelector((state) => state.users.pagination.limit)
  const loading = useSelector((state) => state.users.loadingPage)

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(defaultValues);
  }, []);

  useEffect(() => {
    dispatch(getUsers({
      page: page,
      limit: limit
    }))
  }, [])

  const onPageChange = (page) => {
    dispatch(
      getUsers({
        page: page,
        limit: limit,
        query: values.query.trim() === "" ? null : values.query,
        location: values.location.trim() === "" ? null : values.location,
        degree: values.degree.trim() === "" ? null : values.degree,
      })
    );
  }
    

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
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
                      {users.map((item, key) => (
                        <CardGraduate user={item} key={item.id} />
                      ))}
                    </section>
                    <div className="flex overflow-x-auto sm:justify-center">
                      <ThemeProvider theme={customTheme}>
                        <Pagination
                          theme={customTheme}
                          className="border-verdeD"
                          currentPage={page}
                          totalPages={pages}
                          onPageChange={onPageChange}
                        />
                      </ThemeProvider>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default Graduates;
