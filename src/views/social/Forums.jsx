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

function Forums() {
  const passed = useSelector((state) => state.forums.forumAdd.passed);
  const pagination = useSelector((state) => state.forums.pagination);
  const forums = useSelector((state) => state.forums.forums)
  const dispatch = useDispatch();

  const [openAddForum, setOpendAddForum] = useState(false);

  useEffect(() => {
    dispatch(searchForum({
      page: pagination.page,
      limit: pagination.limit
    }))
  }, [])

  const onPageChange = (page) => dispatch(searchForum({
    page: page,
    limit: pagination.limit
  }));

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-4 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <div className="flex flex-col gap-8">
            {forums
              .slice((pagination.page - 1) * pagination.limit, (pagination.page - 1) * pagination.limit + pagination.limit)
              .map((item) => (
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
            passed === 0 ? (
              <FormAddForum />
            ) : (
              <FormAddPicture setOpenModal={setOpendAddForum} />
            )
          }
        />
      </main>
    </>
  );
}

export default Forums;
