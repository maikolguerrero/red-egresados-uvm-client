import { useEffect, useState } from "react";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { CardForum } from "../../Components/Card/CardForum";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddForum } from "../../Components/Forms/Forum/FormAddForum";
import { useDispatch, useSelector } from "react-redux";
import { searchForum } from "../../services/forum/forumService";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import FilterForums from "../../Components/Forms/Forum/FilterForums";
import { Loader } from "../../Components/Loader";

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700",
      span: "font-semibold text-gray-900",
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

function ForumsPersonals() {
  const pagination = useSelector((state) => state.forums.pagination);
  const forums = useSelector((state) => state.forums.forums);
  const loading = useSelector((state) => state.forums.loadingPage);
  const loader = useSelector((state) => state.forums.loading);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    dispatch(
      searchForum({
        page: 1,
        limit: 10,
        username: currentPath.split("/")[3]
      })
    );
  }, []);

  const onPageChange = (page) =>
    dispatch(
      searchForum({
        page: page,
        limit: pagination.limit,
        username: currentPath.split("/")[3]
      })
    );

  return (
    <>
      {loading ? (
        <section className="h-full flex justify-center items-center w-full">
          <Loader />
        </section>
      ) : (
        <>
          {loader ? (
            <>
              <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
                <div className="relative h-full w-full flex justify-center items-center">
                  <Loader />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {forums.length === 0 ? (
            <>
              {username === currentPath.split("/")[3] ? (
                <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                  No has creado foros todavía
                </h4>
              ) : (
                <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                  El usuario no ha creado foros todavía
                </h4>
              )}
            </>
          ) : (
            <>
              {username === currentPath.split("/")[3] ? (
                <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase mb-6">
                  Foros creados por ti
                </h4>
              ) : (
                <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase mb-6">
                  Foros creados por el usuario:{" "}
                  <span className="text-RojoC lowercase">
                    {currentPath.split("/")[3]}
                  </span>
                </h4>
              )}

              <div className="flex flex-col gap-8 w-full px-1 md:px-2 lg:px-6">
                {forums.map((item) => (
                  <CardForum forum={item} key={item.id} />
                ))}
              </div>

              {pagination.pages === 1 ? (
                <></>
              ) : (
                <ThemeProvider theme={customTheme}>
                  <Pagination
                    theme={customTheme}
                    className="border-verdeD"
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={onPageChange}
                  />
                </ThemeProvider>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default ForumsPersonals;
