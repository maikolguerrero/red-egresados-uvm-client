import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import perfil from "../../../../public/Perfil.jpg"
import { Badge } from "flowbite-react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";

export function CardProyectHome({ proyect }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const [isCollaborator, setIsCollaborator] = useState(false);
  const truncatedTitle =
    proyect.title.length > 50
      ? proyect.title.substring(0, 50) + "..."
      : proyect.title;

  useEffect(() => {
    for (let i = 0; i < proyect.collaborators.length; i++) {
      if (proyect.collaborators[i].user.username === username) {
        setIsCollaborator(true)
      }
    }
  }, [])

  return (
    <article onClick={(e) => {
      navigate(`/proyects/${proyect.id}`)
    }} className="flex h-full items-center justify-center p-2 hover:cursor-pointer">
      <div className="w-full h-full flex flex-col gap-2 bg-white hover:bg-slate-100 rounded-md p-3 border border-verdeC">
        <div className="flex gap-2 w-full h-auto flex-wrap mb-1">
          {proyect?.owner?.profilePicture === undefined || proyect?.owner?.profilePicture?.url === null ? (
            // Si no hay foto de perfil, muestra la inicial del username
            <div className="w-4 h-4 md:w-5 md:h-5 xl:w-7 xl:h-7 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-[10px] md:text-xs xl:text-sm font-bold uppercase">
                {proyect?.owner?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              className="w-4 h-4 md:w-5 md:h-5 xl:w-7 xl:h-7 rounded-full object-cover"
              src={proyect?.owner?.profilePicture?.url}
              alt={proyect?.owner?.username || 'Foto de Perfil del Propietario'}
            />
          )}
          <p className="flex gap-2 text-RojoC font-barolw text-xs items-center">
            {proyect?.owner?.username}
          </p>
        </div>

        <div className="flex flex-col justify-between h-full">
          <h4 className="text-Negro font-barolw font-medium text-base mb-1 px-1">
            {truncatedTitle}
          </h4>
          <div className="flex gap-2 flex-wrap">
            <Badge
              color={proyect?.isPublic ? "green" : "red"}
              className="uppercase"
              size="xs"
            >
              {proyect?.isPublic ? (
                <span className="flex gap-1 text-xs items-center">
                  Publico <BiWorld className="text-xs" />
                </span>
              ) : (
                <span className="flex gap-1 text-xs items-center">
                  Privado <RiGitRepositoryPrivateFill className="text-xs" />
                </span>
              )}
            </Badge>

            <Badge
              color={
                proyect?.status === "not_started"
                  ? "indigo"
                  : proyect?.status === "in_progress"
                    ? "info"
                    : proyect?.status === "paused"
                      ? "warning"
                      : proyect?.status === "completed"
                        ? "success"
                        : "failure"
              }
            >
              {proyect?.status === "not_started"
                ? "Sin Iniciar"
                : proyect?.status === "in_progress"
                  ? "En Progreso"
                  : proyect?.status === "paused"
                    ? "Pausado"
                    : proyect?.status === "completed"
                      ? "Completado"
                      : "Cancelado"}
            </Badge>

            <Badge
              color={'light'}
            >
              {proyect?.collaborators?.length} Miembros
            </Badge>
          </div>
        </div>
      </div>
    </article>
  );
}