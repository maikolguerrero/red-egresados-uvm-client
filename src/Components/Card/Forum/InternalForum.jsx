import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaCommentMedical, FaComments, FaEllipsisV, FaRegComments, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteForum, likeThreads } from "../../../services/forum/forumService";
import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import { MdDelete, MdEdit, MdReportProblem } from "react-icons/md";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { FormAddComment } from "../../Forms/Forum/FormAddComment";
import { CardComment } from "./CardComment";
import { FormAddForum } from "../../Forms/Forum/FormAddForum";
import { FormReport } from "../../Forms/Forum/FormReport";
import { URL_FRONTEND } from "../../../config";
import { useNavigate } from "react-router-dom";
import EntityNotFound from "../../EntityNotFound";
import logger from "../../../utils/logger";
import notify from "../../../utils/notifications";

export function InternalForum({ forum }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username)
  const role = useSelector((state) => state.auth.role)

  const [type, setType] = useState("")
  const [datePublic, setDatePublic] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [editForum, setEditForum] = useState(false)

  useEffect(() => {
    function calcularDiferenciaFechas(fecha1, fecha2) {
      const diferenciaMilisegundos = fecha2.getTime() - fecha1.getTime();

      const semanas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 7));
      const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor(diferenciaMilisegundos / (1000 * 60));

      return { semanas: semanas, dias: dias, horas: horas, minutos: minutos };
    }

    let date = new Date();
    let date2 = new Date(forum?.createdAt);

    let response = calcularDiferenciaFechas(date2, date);
    if (response.semanas >= 1) {
      setDatePublic(response.semanas);
      setType("s");
    } else {
      if (response.dias >= 1) {
        setDatePublic(response.dias);
        setType("d");
      } else {
        if (response.horas >= 1) {
          setDatePublic(response.horas);
          setType("h");
        } else {
          setDatePublic(response.minutos);
          setType("min");
        }
      }
    }
  }, [forum]);

  const handleLike = (e) => {
    dispatch(
      likeThreads({
        id: forum?.id,
        type: "thread",
      })
    );
  };

  const handleDelete = (e) => {
    dispatch(
      deleteForum({
        threadId: forum?.id,
      })
    );
  };

  // Función para compartir el hilo
  const handleShare = async () => { // Hacemos la función asíncrona
    if (!navigator.clipboard) {
      // Fallback para navegadores antiguos o contextos no seguros
      notify.error("Tu navegador no soporta la función para copiar el enlace.", false);
      return;
    }
    try {
      await navigator.clipboard.writeText(`${URL_FRONTEND}/forum/${forum?.id}`);
      notify.success("Enlace copiado", false);
    } catch (err) {
      logger.error('Error al copiar el texto: ', err);
      notify.error("Error al copiar el mensaje.", false);
    }
  };

  const searchProfile = (e) => {
    navigate(`/graduates/${forum?.author?.username}`);
  };

  return (
    <>
      {forum?.id === undefined ? (
        <>
          <EntityNotFound entity="Hilo" entityPath="/forums" />
        </>
      ) : (
        <>
          <article className="flex flex-col gap-1 w-full pb-8 border-b-2 border-verdeD">
            <div className="flex justify-between relative">
              <div className="flex gap-4 w-ful flex-wrap mb-3">
                {forum?.author?.profilePicture?.url === null ? (
                  // Si no hay foto de perfil, muestra la inicial del username
                  <div className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="text-white text-base md:text-lg xl:text-xl font-bold uppercase">
                      {forum?.author?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  // Si hay foto, muéstrala circular
                  <img
                    className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full object-cover"
                    src={forum?.author?.profilePicture?.url}
                    alt={forum?.author?.username || "Foto de Perfil del Autor"}
                  />
                )}
                <div className="flex flex-col">
                  <p onClick={searchProfile} className="cursor-pointer flex gap-2 text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
                    @{forum?.author?.username}
                    <FaCircle className="text-Negro text-[6px] md:text-[6px] xl:text-[8px] flex justify-center items-center h-full" />{" "}
                    Hace {datePublic}{" "}
                    {type}
                  </p>
                  <p className="flex gap-2 text-Negro font-medium uppercase font-barolw text-xs md:text-sm xl:text-base items-center">
                    {forum?.category}
                  </p>
                </div>
              </div>

              {forum?.author?.username === username || role === "admin" || role === "superadmin" ? (
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
                    {(role === "admin" || role === "superadmin") && forum?.author?.username !== username ? (
                      <></>
                    ) : (
                      <DropdownItem>
                        <span
                          onClick={(e) => setEditForum(true)}
                          className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                        >
                          <MdEdit /> Editar
                        </span>
                      </DropdownItem>
                    )}
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

            <div className="flex flex-col gap-1">
              <ul className="flex gap-2 mb-3">
                {forum?.tags?.length > 0 && (
                  <ul className="flex flex-wrap mb-2 gap-2 overflow-x-auto pb-1">
                    {forum?.tags?.map((item, key) => (
                      <li
                        className="py-1 px-3 rounded-full font-medium font-barolw bg-verdeC text-Blanco whitespace-nowrap text-xs sm:text-sm"
                        key={key}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
              <h4 className="text-Negro font-barolw font-medium text-base md:text-lg xl:text-xl mb-1">
                {forum?.title}
              </h4>

              <p className="text-xs md:text-sm">{forum?.content}</p>
            </div>

            <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg mt-4">
              <li
                onClick={handleLike}
                className={`${forum?.isLiked
                  ? "text-Blanco bg-RojoC hover:text-Negro hover:bg-RojoA"
                  : "text-Negro bg-Gris hover:text-Blanco hover:bg-RojoC"
                  } flex gap-2 items-center justify-center py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer`}
              >
                {forum?.likeCount}{" "}
                <AiFillLike className={` text-base md:text-lg xl:text-xl`} />
              </li>
              <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full transition-all duration-300">
                {forum?.comments?.length}{" "}
                <FaComments className="text-base md:text-lg xl:text-xl" />
              </li>
              <li
                onClick={handleShare}
                className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer"
              >
                Compartir{" "}
                <FaShare className="text-base md:text-lg xl:text-xl" />
              </li>
              <li
                onClick={(e) => {
                  setOpenReport(true);
                }}
                className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer"
              >
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
            {forum?.comments?.length === 0 ? (
              <>
                <h5 className="uppercase font-barolw font-semibold text-xl text-center">
                  No hay comentarios
                </h5>
              </>
            ) : (
              <>
                <ul className="p-5 rounded-md bg-Gris flex flex-col gap-8">
                  {forum?.comments?.map((item) => (
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
