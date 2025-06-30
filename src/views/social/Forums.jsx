import { useEffect, useState } from "react";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { CardForum } from "../../Components/Card/CardForum";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddForum } from "../../Components/Forms/Forum/FormAddForum";
import { useDispatch, useSelector } from "react-redux";
import { FormAddPicture } from "../../Components/Forms/Forum/FormAddPicture";
import { searchForum } from "../../services/forum/forumService";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import FilterForums from "../../Components/Forms/Forum/FilterForums";
import { Loader } from "../../Components/Loader";

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
  category: "",
  search: ""
};

function Forums() {
  const pagination = useSelector((state) => state.forums.pagination);
  const forums = useSelector((state) => state.forums.forums);
  const loading = useSelector((state) => state.forums.loadingPage);
  const dispatch = useDispatch();

  const [openAddForum, setOpendAddForum] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(defaultValues);
  }, []);

  useEffect(() => {
    dispatch(searchForum({
      page: pagination.page,
      limit: pagination.limit
    }))
  }, [])

  const onPageChange = (page) =>
    dispatch(
      searchForum({
        page: page,
        limit: pagination.limit,
        category: values.category.trim() === "" ? null : values.category,
        search: values.search.trim() === "" ? null : values.search,
      })
    );

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />

        <section className="w-full px-3 py-12 md:px-4 lg:px-6 gap-4 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <article className="w-full pb-8 border-b-2 border-verdeD mb-8">
            <h3 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
              Menu de filtrado
            </h3>
            <FilterForums values={values} setValues={setValues} />
          </article>

          {loading ? (
            <section className="h-full flex justify-center items-center w-full">
              <Loader />
            </section>
          ) : (
            <>
              {forums.length === 0 ? (
                <>
                  <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                    No se encontraron foros con ese filtrado
                  </h4>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-8 w-full px-1 md:px-2 lg:px-6">
                    {forums.map((item) => (
                      <CardForum forum={item} key={item.id} />
                    ))}
                  </div>

                  <ThemeProvider theme={customTheme}>
                    <Pagination
                      theme={customTheme}
                      className="border-verdeD"
                      currentPage={pagination.page}
                      totalPages={pagination.pages}
                      onPageChange={onPageChange}
                    />
                  </ThemeProvider>
                </>
              )}
            </>
          )}
        </section>

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          <ButtonAdd setOpenModal={setOpendAddForum} />
          <ButtonMessages />
        </div>

        <ModalNotHeader
          openModal={openAddForum}
          setOpenModal={setOpendAddForum}
          size={"3xl"}
          component={
            <FormAddForum />
          }
        />
      </main>
    </>
  );
}

export default Forums;
