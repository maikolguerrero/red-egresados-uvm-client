import { useEffect, useState } from "react";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { CardForum } from "../../Components/Card/CardForum";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddForum } from "../../Components/Forms/Forum/FormAddForum";
import { useDispatch, useSelector } from "react-redux";
import { searchForum } from "../../services/forum/forumService";
import FilterForums from "../../Components/Forms/Forum/FilterForums";
import { Loader } from "../../Components/Loader";
import Paginations from "../../Components/Paginations";

let defaultValues = {
  category: "",
  search: ""
};

function Forums() {
  const pagination = useSelector((state) => state.forums.pagination);
  const forums = useSelector((state) => state.forums.forums);
  const loading = useSelector((state) => state.forums.loadingPage);
  const loader = useSelector((state) => state.forums.loading);
  const dispatch = useDispatch();

  const [openAddForum, setOpendAddForum] = useState(false);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    dispatch(
      searchForum({
        page: 1,
        limit: 10,
      })
    );
  }, []);

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
              <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                No se encontraron hilos en el foro con ese filtrado
              </h4>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-8 w-full px-1 md:px-2 lg:px-6">
                {forums.map((item) => (
                  <CardForum forum={item} key={item.id} />
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

      <div className="absolute flex flex-col gap-2 right-8 bottom-6 mb-16">
        <ButtonAdd setOpenModal={setOpendAddForum} />
      </div>

      <ModalNotHeader
        openModal={openAddForum}
        setOpenModal={setOpendAddForum}
        size={"3xl"}
        component={<FormAddForum />}
      />
    </>
  );
}

export default Forums;
