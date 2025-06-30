import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaCommentMedical, FaComments, FaEllipsisV, FaRegComments, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import perfil from "../../../../public/Perfil.jpg"
import { deleteForum, likeThreads } from "../../../services/forum/forumService";
import BadgeNormal from "../../Buttons/BadgeNormal";
import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import { MdDelete, MdEdit, MdReportProblem } from "react-icons/md";
import { TbMessageReportFilled } from "react-icons/tb";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddComment } from "../../Forms/Forum/FormAddComment";
import { CardComment } from "./CardComment";
import { FormAddForum } from "../../Forms/Forum/FormAddForum";
import { FormReport } from "../../Forms/Forum/FormReport";

export function InternalForum({ forum }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username)

  const [type, setType] = useState("")
  const [datePublic, setDatePublic] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [editForum, setEditForum] = useState(false)

  useEffect(() => {
    function calcularDiferenciaFechas(fecha1, fecha2) {
      const diferenciaMilisegundos = fecha2.getTime() - fecha1.getTime();

      const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      return { dias: dias, horas: horas };
    }

    let date = new Date();
    let date2 = new Date(forum.createdAt)

    let response = calcularDiferenciaFechas(date2, date)
    if (response.horas >= 24) {
      setDatePublic(response.dias)
      setType("dias")
    } else {
      setDatePublic(response.horas)
      setType("horas")
    }
  }, [forum]);

  const handleLike = (e) => {
    dispatch(
      likeThreads({
        id: forum.id,
        type: "thread",
      })
    );
  };

  const handleDelete = (e) => {
    dispatch(
      deleteForum({
        threadId: forum.id,
      })
    );
  };

  return (
    <>
      {forum.id === undefined ? (
        <article className="flex flex-col gap-1 w-full pb-8">
          <h4 className="uppercase text-xl font-medium">Este foro ha sido eliminado</h4>
        </article>
      ) : (
        <>
          <article className="flex flex-col gap-1 w-full pb-8 border-b-2 border-verdeD">
            <div className="flex justify-between relative">
              <div className="flex gap-4 w-ful flex-wrap mb-3">
                <img
                  className="rounded-full w-8 md:w-10 xl:w-12"
                  src={
                    forum.author.profilePicture.url === null
                      ? perfil
                      : forum.author.profilePicture.url
                  }
                  alt="Foto de Perfil"
                />
                <div className="flex flex-col">
                  <p className="flex gap-2 text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
                    {forum.author.username}
                    <FaCircle className="text-Negro text-[6px] md:text-[6px] xl:text-[8px] flex justify-center items-center h-full" />{" "}
                    Hace {datePublic}
                    {type === "horas" ? "h" : "d"}
                  </p>
                  <p className="flex gap-2 text-Negro font-medium uppercase font-barolw text-xs md:text-sm xl:text-base items-center">
                    {forum.category}
                  </p>
                </div>
              </div>

              {forum.author.username === username ? (
                <>
                  <Dropdown
                    inline
                    dismissOnClick={false}
                    label={"a"}
                    renderTrigger={() => (
                      <div className="flex h-full justify-center items-center">
                        <FaEllipsisV className="hover:cursor-pointer" />
                      </div>
                    )}
                  >
                    <DropdownItem>
                      <span
                        onClick={(e) => setEditForum(true)}
                        className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                      >
                        <MdEdit /> Editar
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <span
                        onClick={handleDelete}
                        className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                      >
                        <MdDelete /> Eliminar
                      </span>
                    </DropdownItem>
                  </Dropdown>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col gap-1 px-1">
              <ul className="flex gap-2 mb-3">
                {forum.tags.map((item, key) => (
                  <li key={key}>
                    <Badge color="success">{item}</Badge>
                  </li>
                ))}
              </ul>
              <h4 className="text-Negro font-barolw font-medium text-base md:text-lg xl:text-xl mb-1">
                {forum.title}
              </h4>

              <p className="text-xs md:text-sm">{forum.content}</p>
            </div>

            <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg mt-4">
              <li
                onClick={handleLike}
                className={`${
                  forum.isLiked ? "text-Blanco bg-RojoC" : "text-Negro bg-Gris"
                } flex gap-2 items-center justify-center  py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer`}
              >
                {forum.likeCount}{" "}
                <AiFillLike className={` text-base md:text-lg xl:text-xl`} />
              </li>
              <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full transition-all duration-300">
                {forum.comments.length}{" "}
                <FaComments className="text-base md:text-lg xl:text-xl" />
              </li>
              <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer">
                Compartir{" "}
                <FaShare className="text-base md:text-lg xl:text-xl" />
              </li>
              <li onClick={(e) => {setOpenReport(true)}} className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer">
                Reportar{" "}
                <MdReportProblem className="text-base md:text-lg xl:text-xl" />
              </li>
            </ul>
          </article>

          <div>
            <button
              onClick={(e) => {
                setOpenComment(true);
              }}
              className="uppercase rounded-full bg-Gris py-2 px-6 flex gap-2 items-center hover:bg-verdeC hover:text-Blanco transition-all duration-200"
            >
              <span>responder</span>
              <FaCommentMedical className="text-xl" />
            </button>
          </div>

          <article className="flex flex-col w-full">
            {forum.comments.length === 0 ? (
              <>
                <h5 className="uppercase font-barolw font-semibold text-xl text-center">
                  No hay comentarios
                </h5>
              </>
            ) : (
              <>
                <ul className="p-5 rounded-md bg-Gris flex flex-col gap-8">
                  {forum.comments.map((item) => (
                    <li key={item.id}>
                      <CardComment forum={forum} comment={item} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          <ModalNotHeader
            openModal={openComment}
            setOpenModal={setOpenComment}
            size={"3xl"}
            component={<FormAddComment forum={forum} />}
          />
          <ModalNotHeader
            openModal={openReport}
            setOpenModal={setOpenReport}
            size={"3xl"}
            component={<FormReport threadId={forum.id} />}
          />
          <ModalNotHeader
            openModal={editForum}
            setOpenModal={setEditForum}
            size={"3xl"}
            component={<FormAddForum forum={forum} type={"internal"} />}
          />
        </>
      )}
    </>
  );
}
