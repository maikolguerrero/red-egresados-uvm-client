import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaCommentMedical, FaComments, FaRegComments, FaShare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import perfil from "../../../../public/Perfil.jpg"
import { likeThreads } from "../../../services/forum/forumService";
import BadgeNormal from "../../Buttons/BadgeNormal";
import { Badge } from "flowbite-react";
import { MdReportProblem } from "react-icons/md";
import { TbMessageReportFilled } from "react-icons/tb";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddComment } from "../../Forms/Forum/FormAddComment";
import { CardComment } from "./CardComment";

export function InternalForum({ forum }) {
  const dispatch = useDispatch();

  const [type, setType] = useState("")
  const [datePublic, setDatePublic] = useState(0);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    console.log(forum.comments)
  }, [])

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
    dispatch(likeThreads({
      id: forum.id,
      type: "thread"
    }))
  }

  return (
    <>
      {forum.id === undefined ? (
        <></>
      ) : (
        <>
          <article className="flex flex-col gap-1 w-full pb-8 border-b-2 border-verdeD">
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

            {forum.media.length === 0 ? (
              <></>
            ) : (
              <div className="w-full rounded-md border border-verdeC bg-Negro justify-center items-center flex">
                <img
                  className="rounded-md"
                  src={forum.media[0].url}
                  alt="Multimedia del foro"
                />
              </div>
            )}

            <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
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
              <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer">
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
                    {
                        forum.comments.map((item) => (
                            <li key={item.id}>
                                <CardComment comment={item} />
                            </li>
                        ))
                    }
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
        </>
      )}
    </>
  );
}
