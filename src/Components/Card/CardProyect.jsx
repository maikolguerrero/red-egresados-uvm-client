import { Badge, Button, Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { FormAddProyect } from "../Forms/Proyects/FormAddProyect";
import { cancelRequest, deleteProject, requestProyect } from "../../services/proyects/proyectService";
import perfil from "../../../public/Perfil.jpg"

export function CardProyect({ proyect }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
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
    dispatch(requestProyect({projectId: proyect.id}))
  }

  return (
    <Card className="w-[448px] border-[1.5px] border-verdeD bg-Gris">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-6 md:w-6 xl:w-8"
            src={
              proyect.owner.profilePicture.url === null
                ? perfil
                : proyect.owner.profilePicture.url
            }
            alt="Foto de Perfil"
          />
          <p className="flex gap-2 font-semibold text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
            {proyect.owner.username}
          </p>
        </div>

        {proyect.owner.username === username ? (
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
                  onClick={(e) => setEditProyect(true)}
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

            <ModalNotHeader
              openModal={editProyect}
              setOpenModal={setEditProyect}
              size={"3xl"}
              component={<FormAddProyect proyect={proyect} type={"edit"} />}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-Negro">
        {proyect.title}
      </h5>
      <p className="font-normal text-Negro">{proyect.description}</p>

      <div className="mt-6">
        <p className="font-bold text-verdeD flex items-center gap-2">
          Estado del Proyecto:{" "}
          <Badge
            color={
              proyect.status === "not_started"
                ? "indigo"
                : proyect.status === "in_progress"
                ? "info"
                : proyect.status === "paused"
                ? "warning"
                : proyect.status === "completed"
                ? "success"
                : "failure"
            }
          >
            {proyect.status === "not_started"
              ? "Sin Iniciar"
              : proyect.status === "in_progress"
              ? "En Progreso"
              : proyect.status === "paused"
              ? "Pausado"
              : proyect.status === "completed"
              ? "Completado"
              : "Cancelado"}
          </Badge>
        </p>
        <p className="font-bold text-verdeD">Colaboradores:</p>
        <ul className="flex py-2 relative h-12">
          {proyect.collaborators.map((item, key) => (
            <li
              key={key}
              className={`text-RojoC font-medium text-sm absolute left-${
                key === 0 ? 0 : key * 3
              }`}
            >
              <img
                className="w-5 lg:w-7 rounded-full border-2 border-Gris"
                src={
                  item.user.profilePicture.url === null
                    ? perfil
                    : item.user.profilePicture.url
                }
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-2">
        <ButtonSmall
          action={(e) => {
            navigate(`/proyects/${proyect.id}`);
          }}
          text={"Ver Detalles"}
          className={"bg-verdeC hover:bg-RojoC"}
        />
        {proyect.owner.username === username ? (
          <></>
        ) : isCollaborator ? (
          <></>
        ) : proyect.hasPendingRequest ? (
          <ButtonSmall
            action={handleCancelRequest}
            text={"Cancelar Union"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        ) : (
          <ButtonSmall
            action={handleRequest}
            text={"Unirme"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        )}
      </div>
    </Card>
  );
}