import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdReportProblem } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, likeThreads } from "../../../services/forum/forumService";
import { FormReport } from "../../Forms/Forum/FormReport";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { Dropdown, DropdownItem } from "flowbite-react";

export function CardReplie({ forum, comment, idComment }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username)
  const role = useSelector((state) => state.auth.role)

  const [type, setType] = useState("");
  const [openReport, setOpenReport] = useState(false);
  const [datePublic, setDatePublic] = useState(0);

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
    dispatch(
      likeThreads({
        id: comment.id,
        type: "comment",
        types: "replies",
      })
    );
  };

  const handleDelete = (e) => {
    dispatch(
      deleteComment({
        commentId: comment.id,
        idComment: idComment.id
      })
    );
  };

  return (
    <>
      <div className="flex gap-2 w-full flex-wrap mb-1 h-full items-center">
        {/* <img
          className="rounded-full w-4 h-4 md:w-4 xl:w-6 xl:h-6"
          src={
            comment.author.profilePicture.url === null
              ? perfil
              : comment.author.profilePicture.url
          }
          alt="Foto de Perfil"
        /> */}
        {comment?.author?.profilePicture?.url === null ? (
          // Si no hay foto de perfil, muestra la inicial del username
          <div className="w-4 h-4 md:w-4 md:h-4 xl:w-6 xl:h-6 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="text-white text-[8px] md:text-xs xl:text-xs font-bold uppercase">
              {comment?.author?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          // Si hay foto, muéstrala circular
          <img
            className="w-4 h-4 md:w-4 md:h-4 xl:w-6 xl:h-6 rounded-full object-cover"
            src={comment?.author?.profilePicture?.url}
            alt={
              comment?.author?.username ||
              "Foto de Perfil del Autor del Comentario"
            }
          />
        )}
        <div className="h-full flex items-center">
          <p className="flex gap-2 text-RojoC h-6 xl:h-8 font-barolw text-[9px] md:text-xs xl:text-sm items-center">
            {comment.author.username}
            <FaCircle className="text-Negro text-[5px] md:text-[5px] xl:text-[6px] flex justify-center items-center h-full" />{" "}
            Hace {datePublic}
            {type}
          </p>
        </div>

        {comment.author.username === username || role === "admin" || role === "superadmin" ? (
          <div>
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
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="px-4 flex flex-col gap-2">
        <p className="text-xs xl:text-sm">{comment.content}</p>
        <ul className="flex gap-1 md:gap-2 lg:gap-3 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
          <li
            onClick={handleLike}
            className={`${
              comment.isLiked ? "text-Blanco bg-RojoC" : "text-Negro bg-Blanco"
            } flex gap-2 items-center justify-center text-sm  py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer`}
          >
            {comment.likeCount}{" "}
            <AiFillLike className={` text-xs md:text-sm xl:text-base`} />
          </li>
          <li
            onClick={(e) => {
              setOpenReport(true);
            }}
            className="flex gap-2 items-center text-sm justify-center bg-Blanco py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer"
          >
            Reportar{" "}
            <MdReportProblem className="text-xs md:text-sm xl:text-base" />
          </li>
        </ul>
      </div>

      <ModalNotHeader
        openModal={openReport}
        setOpenModal={setOpenReport}
        size={"3xl"}
        component={<FormReport idComment={comment.id} threadId={forum.id} />}
      />
    </>
  );
}
