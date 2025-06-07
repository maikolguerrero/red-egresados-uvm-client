import { FaCircle, FaComments } from "react-icons/fa";
import perfil from "../../../../public/Perfil.jpg"
import { MdReportProblem } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeThreads } from "../../../services/forum/forumService";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddComment } from "../../Forms/Forum/FormAddComment";
import { CardReplie } from "./CardReplie";

export function CardComment({ comment }) {
  const dispatch = useDispatch();
    
  const [type, setType] = useState("");
  const [datePublic, setDatePublic] = useState(0);
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
    if (response.horas >= 24) {
      setDatePublic(response.dias);
      setType("d");
    } else {
      if (response.minutos >= 60) {
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

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex gap-4 w-full flex-wrap mb-3 h-full">
          <img
            className="rounded-full w-6 md:w-6 xl:w-8"
            src={
              comment.author.profilePicture.url === null
                ? perfil
                : comment.author.profilePicture.url
            }
            alt="Foto de Perfil"
          />
          <div className="h-full flex items-center">
            <p className="flex gap-2 text-RojoC h-6 xl:h-8 font-barolw text-xs md:text-sm xl:text-base items-center">
              {comment.author.username}
              <FaCircle className="text-Negro text-[6px] md:text-[6px] xl:text-[8px] flex justify-center items-center h-full" />{" "}
              Hace {datePublic}
              {type}
            </p>
          </div>
        </div>

        <div className="ml-4 xl:ml-6 px-2 py-2 border-verdeC border-l flex flex-col gap-2">
          <p>{comment.content}</p>
          {comment.media === undefined ? (
            <></>
          ) : (
            <div>
              <img src={comment.media.url} alt="" className="rounded-md" />
            </div>
          )}

          <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
            <li
              onClick={handleLike}
              className={`${
                comment.isLiked
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
              {comment.replies.length}{" "}
              <FaComments className="text-sm md:text-base xl:text-lg" />
            </li>
            <li className="flex gap-2 items-center justify-center bg-Blanco py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer">
              Reportar{" "}
              <MdReportProblem className="text-sm md:text-base xl:text-lg" />
            </li>
          </ul>

          {comment.replies.length === 0 ? (
            <></>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {comment.replies.map((item) => (
                <li key={item.id} className="flex flex-col">
                  <CardReplie comment={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <ModalNotHeader
          openModal={openComment}
          setOpenModal={setOpenComment}
          size={"3xl"}
          component={<FormAddComment comment={comment} />}
        />
      </div>
    </>
  );
}
