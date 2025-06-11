import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaComments, FaEllipsisV, FaRegComments, FaShare } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteForum, likeThreads } from "../../services/forum/forumService";
import perfil from "../../../public/Perfil.jpg"
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { FormAddForum } from "../Forms/Forum/FormAddForum";

export function CardForum({ forum }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username)

  const [type, setType] = useState("");
  const [datePublic, setDatePublic] = useState(0);
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
  }, []);

  const handleLike = (e) => {
    dispatch(likeThreads({
      id: forum.id,
      type: "thread"
    }))
  }

  const handleView = (e) => {
    navigate(`/forums/${forum.id}`)
  }

  const handleDelete = (e) => {
    dispatch(deleteForum({
      threadId: forum.id
    }))
  }

  return (
    <article className="flex flex-col gap-1 w-full pb-8 border-b-2 border-verdeD">
      <div className="flex justify-between relative">
        <div className="flex gap-2 w-ful flex-wrap mb-3">
          <img
            className="rounded-full w-6 md:w-8 xl:w-10"
            src={
              forum.author.profilePicture.url === null
                ? perfil
                : forum.author.profilePicture.url
            }
            alt="Foto de Perfil"
          />
          <p className="flex gap-2 text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
            {forum.author.username}
            <FaCircle className="text-Negro text-[6px] md:text-[9px] xl:text-xs flex justify-center items-center h-full" />{" "}
            Hace {datePublic}
            {type === "horas" ? "h" : "d"}
          </p>
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
                <span onClick={(e) => setEditForum(true)} className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100">
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
        <h4 className="text-Negro font-barolw font-medium text-base md:text-lg xl:text-xl mb-1">
          {forum.title}
        </h4>

        <p className="text-xs md:text-sm">{forum.content}</p>
      </div>

      {forum.media.length === 0 ? (
        <></>
      ) : (
        <div className="w-full">
          <img
            className="rounded-md mb-2 border border-verdeC"
            src={forum.media[0].url}
            alt="Multimedia del foro"
          />
        </div>
      )}

      <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
        <li
          onClick={handleLike}
          className={`${
            forum.isLiked
              ? "text-Blanco bg-RojoC hover:text-Negro hover:bg-Gris"
              : "text-Negro bg-Gris hover:text-Blanco hover:bg-RojoC"
          } flex gap-2 items-center justify-center  py-1 px-4 rounded-full transition-all duration-300 hover:cursor-pointer`}
        >
          {forum.likeCount}{" "}
          <AiFillLike className={` text-base md:text-lg xl:text-xl`} />
        </li>
        <li
          onClick={handleView}
          className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer"
        >
          {forum.commentCount}{" "}
          <FaComments className="text-base md:text-lg xl:text-xl" />
        </li>
        <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer">
          Compartir <FaShare className="text-base md:text-lg xl:text-xl" />
        </li>
      </ul>

      <ModalNotHeader
        openModal={editForum}
        setOpenModal={setEditForum}
        size={"3xl"}
        component={<FormAddForum forum={forum} type={"edit"} />}
      />
    </article>
  );
}
