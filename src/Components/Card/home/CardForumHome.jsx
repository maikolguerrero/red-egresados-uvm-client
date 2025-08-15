import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCircle, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function CardForumHome({ forum }) {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [datePublic, setDatePublic] = useState(0);
  const truncatedText = forum.title.length > 50 ? forum.title.substring(0, 50) + "..." : forum.title;

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
    let date2 = new Date(forum.createdAt);

    let response = calcularDiferenciaFechas(date2, date);
    if (response.dias >= 1) {
      setDatePublic(response.dias);
      setType("dias");
    } else {
      setDatePublic(response.horas);
      setType("horas");
    }
  }, []);

  const handleView = (e) => {
    navigate(`/forum/${forum.id}`);
  };

  return (
    <article onClick={handleView} className="flex h-full items-center justify-center p-2 hover:cursor-pointer">
      <div className="flex flex-col w-full h-full bg-white rounded-md p-3 border border-verdeC hover:bg-slate-100">
        <div className="flex gap-2 w-full h-auto flex-wrap mb-3">
          {forum?.author?.profilePicture === undefined || forum?.author?.profilePicture?.url === null ? (
            // Si no hay foto de perfil, muestra la inicial del username
            <div className="w-4 h-4 md:w-5 md:h-5 xl:w-7 xl:h-7 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-[8px] md:text-[9px] xl:text-[12px] font-bold uppercase">
                {forum?.author?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              className="w-4 h-4 md:w-5 md:h-5 xl:w-7 xl:h-7 rounded-full object-cover"
              src={forum?.author?.profilePicture?.url}
              alt={forum?.author?.username || 'Foto de Perfil del Autor'}
            />
          )}
          <p className="flex gap-2 text-RojoC font-barolw text-xs items-center">
            {forum?.author?.username}
            <FaCircle className="text-Negro text-[6px] md:text-[9px] flex justify-center items-center h-full" />{" "}
            Hace {datePublic}
            {type === "horas" ? "h" : "d"}
          </p>
        </div>

        <div className="flex flex-col justify-between h-full">
          <h4 className="text-Negro font-barolw font-medium text-base mb-1 px-1">
            {truncatedText}
          </h4>

          <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg text-white">
            <li
              className={`flex gap-2 items-center text-sm justify-center bg-verdeD py-1 px-3 bg-opacity-90 rounded-md`}
            >
              {forum?.likeCount}
              <AiFillLike className={` text-base`} />
            </li>
            <li className="flex gap-2 items-center text-sm justify-center bg-verdeD py-1 px-3 bg-opacity-90 rounded-md">
              {forum?.commentCount}
              <FaComments className="text-base" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
