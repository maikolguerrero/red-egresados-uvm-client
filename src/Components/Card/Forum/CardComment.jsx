import { FaCircle, FaComments, FaEllipsisV } from "react-icons/fa";
import perfil from "../../../../public/Perfil.jpg"
import { MdDelete, MdReportProblem } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, likeThreads } from "../../../services/forum/forumService";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddComment } from "../../Forms/Forum/FormAddComment";
import { CardReplie } from "./CardReplie";
import { FormReport } from "../../Forms/Forum/FormReport";
import { Dropdown, DropdownItem } from "flowbite-react";

export function CardComment({ forum, comment }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username)

  const [type, setType] = useState("");
  const [datePublic, setDatePublic] = useState(0);
  const [openReport, setOpenReport] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    function calcularDiferenciaFechas(fecha1, fecha2) {
      const diferenciaMilisegundos = fecha2.getTime() - fecha1.getTime();

      const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor(diferenciaMilisegundos / (1000 * 60));

      return { dias: dias, horas: horas, minutos: minutos };
    }

    let date = new Date();
    let date2 = new Date(comment.createdAt);

    let response = calcularDiferenciaFechas(date2, date);
    if (response.dias >= 1) {
      setDatePublic(response.dias);
      setType("d");
    } else {
      if (response.horas >= 1) {
        setDatePublic(response.horas);
        setType("h");
      } else {
        setDatePublic(response.minutos);
        setType("m");
      }
    }
  }, [comment]);

  const handleLike = (e) => {
    dispatch(likeThreads({
      id: comment.id,
      type: "comment"
    }))
  }

  const handleDelete = (e) => {
    dispatch(deleteComment({
      commentId: comment.id
    }))
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex gap-4 w-full flex-wrap mb-3 h-full">
          {comment?.author?.profilePicture?.url === null ? (
            // Si no hay foto de perfil, muestra la inicial del username
            <div className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-xs md:text-xs xl:text-sm font-bold uppercase">
                {comment?.author?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full object-cover"
              src={comment?.author?.profilePicture?.url}
              alt={comment?.author?.username || 'Foto de Perfil del Autor del Comentario'}
            />
          )}
          <div className="h-full flex items-center">
            <p className="flex gap-2 text-RojoC h-6 xl:h-8 font-barolw text-xs md:text-sm xl:text-base items-center">
              {comment?.author?.username}
              <FaCircle className="text-Negro text-[6px] md:text-[6px] xl:text-[8px] flex justify-center items-center h-full" />{" "}
              Hace {datePublic}
              {type}
            </p>
          </div>

          {comment.author.username === username ? (
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

        <div className="ml-4 xl:ml-6 px-2 py-2 border-verdeC border-l flex flex-col gap-2">
          <p>{comment?.content}</p>
          {comment?.media === undefined ? (
            <></>
          ) : (
            <div>
              <img src={comment?.media?.url} alt="" className="rounded-md" />
            </div>
          )}

          <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
            <li
              onClick={handleLike}
              className={`${comment.isLiked
                ? "text-Blanco bg-RojoC"
                : "text-Negro bg-Blanco"
                } flex gap-2 items-center justify-center text-sm  py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer`}
            >
              {comment.likeCount}{" "}
              <AiFillLike className={` text-sm md:text-base xl:text-lg`} />
            </li>
            <li
              onClick={(e) => setOpenComment(true)}
              className="flex gap-2 hover:cursor-pointer items-center justify-center bg-Blanco py-1 px-4 rounded-full transition-all duration-300"
            >
              {comment?.replies === undefined ? "0" : comment?.replies?.length}{" "}
              <FaComments className="text-sm md:text-base xl:text-lg" />
            </li>
            <li
              onClick={(e) => {
                setOpenReport(true);
              }}
              className="flex gap-2 items-center justify-center bg-Blanco py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer"
            >
              Reportar{" "}
              <MdReportProblem className="text-sm md:text-base xl:text-lg" />
            </li>
          </ul>

          {
            comment?.replies === undefined || comment?.replies?.length === 0 ? (
              <></>
            ) : (
              <ul className="mt-6 flex flex-col gap-4">
                {comment?.replies?.map((item) => (
                  <li key={item.id} className="flex flex-col">
                    <CardReplie forum={forum} comment={item} />
                  </li>
                ))}
              </ul>
            )
          }
        </div >

        <ModalNotHeader
          openModal={openComment}
          setOpenModal={setOpenComment}
          size={"3xl"}
          component={<FormAddComment comment={comment} />}
        />
        <ModalNotHeader
          openModal={openReport}
          setOpenModal={setOpenReport}
          size={"3xl"}
          component={<FormReport idComment={comment?.id} threadId={forum?.id} />}
        />
      </div >
    </>
  );
}
