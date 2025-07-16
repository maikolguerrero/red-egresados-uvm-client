import { Badge, Button, Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { FormAddProyect } from "../Forms/Proyects/FormAddProyect";
import { cancelRequest, deleteProject, joinProyect, requestProyect } from "../../services/proyects/proyectService";
import perfil from "../../../public/Perfil.jpg"
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";

export function CardProyect({ proyect }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const [editProyect, setEditProyect] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);

  useEffect(() => {
    for (let i = 0; i < proyect.collaborators.length; i++) {
      if (proyect.collaborators[i].user.username === username) {
        setIsCollaborator(true)
      }
    }
  }, [])

  const handleDelete = (e) => {
    dispatch(
      deleteProject({
        projectId: proyect.id,
      })
    );
  };

  const handleCancelRequest = (e) => {
    dispatch(cancelRequest({
      projectId: proyect.id,
    }))
  }

  const handleRequest = (e) => {
    dispatch(requestProyect({ projectId: proyect.id }))
  }

  const handleJoin = (e) => {
    dispatch(joinProyect({ projectId: proyect.id }))
  }

  const searchProfile = (e) => {
    navigate(`/graduates/${proyect?.owner?.username}`);
  };

  return (
    // <Card className="w-[448px] border-[1.5px] border-verdeD bg-Gris">
    <Card className="w-full sm:w-[350px] md:w-[400px] lg:w-[448px] border-[1.5px] border-verdeD bg-Gris">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {proyect?.owner?.profilePicture?.url === null ? (
            // Si no hay foto de perfil, muestra la inicial del username
            <div className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-[14px] md:text-[14px] xl:text-[16px] font-bold">
                {proyect?.owner?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full object-cover"
              src={proyect.owner.profilePicture.url}
              alt={proyect?.owner?.username || 'Foto de Perfil del Propietario'} // Alt text para accesibilidad
            />
          )}
          <p onClick={searchProfile} className="cursor-pointer flex gap-2 font-semibold text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
            @{proyect?.owner?.username}
          </p>
        </div>

        {proyect?.owner?.username === username || role === "admin" || role === "superadmin" ? (
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
              {(role === "admin" || role === "superadmin") && !proyect?.owner?.username === username ? (
                <></>
              ) : (
                <DropdownItem>
                  <span
                    onClick={(e) => setEditProyect(true)}
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

            <ModalNotHeader
              openModal={editProyect}
              setOpenModal={setEditProyect}
              size={"3xl"}
              component={<FormAddProyect proyect={proyect} type={"edit"} />}
            />
          </>
        ) : (
          <></>
        )
        }
      </div >
      <h5 className="text-2xl font-bold tracking-tight text-Negro">
        {proyect?.title}
      </h5>
      <p className="font-normal text-Negro">{proyect?.description}</p>

      <div className="mt-6 flex flex-col gap-1">
        <p className="font-bold text-verdeD flex items-center gap-2">
          Visibilidad:{" "}
          <Badge
            color={proyect.isPublic ? "green" : "red"}
            className="uppercase"
          >
            {proyect?.isPublic ? (
              <span className="flex gap-1 items-center">
                Publico <BiWorld />
              </span>
            ) : (
              <span className="flex gap-1 items-center">
                Privado <RiGitRepositoryPrivateFill />
              </span>
            )}
          </Badge>
        </p>
        <p className="font-bold text-verdeD flex items-center gap-2">
          Estado del Proyecto:{" "}
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
                    : "Cancelado"
            }
          </Badge>
        </p>
        <p className="font-bold text-verdeD">Colaboradores:</p>
        <ul className="flex flex-wrap gap-1 py-2 h-12">
          {proyect?.collaborators.map((item, key) => (
            <li
              key={key}
              className={`text-RojoC font-medium text-sm left-${key === 0 ? 0 : key * 3
                }`}
            >
              {item?.user?.profilePicture?.url === null ? (
                // Si no hay foto de perfil, muestra la inicial
                <div onClick={(e) => {
                  navigate(`/graduates/${item?.user?.username}`);
                }} className="cursor-pointer w-5 h-5 lg:w-7 lg:h-7 rounded-full border-2 border-Gris bg-verdeA flex items-center justify-center overflow-hidden">
                  <span className="text-white text-[10px] lg:text-[12px] font-bold">
                    {item?.user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              ) : (
                // Si hay foto, muéstrala
                <img onClick={(e) => {
                  navigate(`/graduates/${item?.user?.username}`);
                }}
                  className="cursor-pointer w-5 h-5 lg:w-7 lg:h-7 rounded-full border-2 border-Gris object-cover"
                  src={item?.user?.profilePicture?.url}
                  alt={
                    item?.user?.username.charAt(0).toUpperCase() ||
                    "Colaborador"
                  }
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-2">
        <ButtonSmall
          action={(e) => {
            navigate(`/projects/${proyect.id}`);
          }}
          text={"Ver Detalles"}
          className={"bg-verdeC hover:bg-RojoC"}
        />
        {proyect?.owner?.username === username ? (
          <></>
        ) : proyect?.isCollaborator ? (
          <></>
        ) : proyect?.hasPendingRequest ? (
          <ButtonSmall
            action={handleCancelRequest}
            text={"Cancelar Union"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        ) : proyect?.isPublic ? (
          <ButtonSmall
            action={handleJoin}
            text={"Unirme"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        ) : (
          <ButtonSmall
            action={handleRequest}
            text={"Solicitar Unión"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        )}
      </div>
    </Card >
  );
}