import { useEffect, useState } from "react";
import { CardGraduate } from "../../Components/Card/CardGraduate";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/users/usersService";
import { onChangePage } from "../../features/users/usersSlice";

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
      active:
        "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

function Graduates() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const total = useSelector((state) => state.users.pagination.total)
  const pages = useSelector((state) => state.users.pagination.pages)
  const page = useSelector((state) => state.users.pagination.page)
  const limit = useSelector((state) => state.users.pagination.limit)

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const max = Math.ceil(data.length / perPage);

  const onPageChange = (page) => dispatch(onChangePage(page));
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <div className="flex flex-col gap-6 items-center">
            <section className="flex gap-6 flex-wrap justify-center">
              {users
                .slice(
                  (page - 1) * limit,
                  (page - 1) * limit + limit
                )
                .map((item, key) => (
                  <CardGraduate user={item} key={item.id} />
                ))
              }
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
