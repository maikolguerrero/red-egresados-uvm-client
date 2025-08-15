import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaCalendarCheck, FaCalendarDay, FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit, MdPersonRemove } from "react-icons/md";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { useState, useEffect } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FormAddProyect } from "../../Forms/Proyects/FormAddProyect";
import { cancelRequest, deleteProject, expelCollaborator, getRequestProyect, joinProyect, leaveProyect, requestProyect } from "../../../services/proyects/proyectService";
import { IoEnter } from "react-icons/io5";
import { CardRequest } from "./CardRequest";
import { Loader } from "../../Loader";
import { FormEditRole } from "../../Forms/Proyects/FormEditRole";
import { useNavigate } from "react-router-dom";
import EntityNotFound from "../../EntityNotFound";
import { forEach } from "lodash";

export function InternalProject({ proyect }) {
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role);
  const loading = useSelector((state) => state.proyects.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editProyect, setEditProyect] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    proyect?.collaborators?.forEach((item) => {
      if (item?.user?.username === username) {
        if (item.role === "admin") {
          setIsAdmin(true);
        }
      }
    });
  }, [proyect]);

  const handleDelete = (e) => {
    dispatch(
      deleteProject({
        projectId: proyect.id,
      })
    );
  };

  const handleViewRequest = (e) => {
    dispatch(
      getRequestProyect({
        projectId: proyect.id,
      })
    );
    setOpenRequest(true);
  };

  const handleRequest = (e) => {
    dispatch(requestProyect({ projectId: proyect.id }));
  };

  const handleJoin = (e) => {
    dispatch(joinProyect({ projectId: proyect.id }));
  };

  const handleCancelRequest = (e) => {
    dispatch(cancelRequest({
      projectId: proyect.id,
    }))
  }

  const handleLeaveProyect = (e) => {
    dispatch(leaveProyect({
      projectId: proyect.id,
      username: username
    }))
  }

  const searchProfile = (e) => {
    navigate(`/graduates/${proyect?.owner?.username}`);
  };

  return (
    <>
      {proyect?.id === undefined ? (
        <>
          <EntityNotFound entity="Proyecto" entityPath="/projects" />
        </>
      ) : (
        <>
          <article className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {proyect?.owner?.profilePicture?.url === null ? (
                  // Si no hay foto de perfil, muestra la inicial del username
                  <div className="w-8 h-8 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="text-white text-base md:text-base xl:text-lg font-bold uppercase">
                      {proyect?.owner?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  // Si hay foto, muéstrala circular
                  <img
                    className="w-8 h-8 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full object-cover"
                    src={proyect?.owner?.profilePicture?.url}
                    alt={
                      proyect?.owner?.username ||
                      "Foto de Perfil del Propietario"
                    }
                  />
                )}

                <p
                  onClick={searchProfile}
                  className="cursor-pointer flex gap-2 font-semibold text-RojoC font-barolw text-sm md:text-base xl:text-lg items-center"
                >
                  @{proyect?.owner?.username}
                </p>
              </div>

              {proyect.owner.username === username ||
                role === "admin" ||
                role === "superadmin" ||
                isAdmin === true ? (
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
                    {isAdmin && proyect.isPublic === false ? (
                      <>
                        <DropdownItem>
                          <span
                            onClick={handleViewRequest}
                            className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                          >
                            <IoEnter /> Solicitudes
                          </span>
                        </DropdownItem>
                      </>
                    ) : (
                      <>
                        {role === "admin" || role === "superadmin" ? (
                          <></>
                        ) : (
                          <>
                            <DropdownItem>
                              <span
                                onClick={(e) => setEditProyect(true)}
                                className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                              >
                                <MdEdit /> Editar
                              </span>
                            </DropdownItem>
                            {proyect.isPublic === false ? (
                              <>
                                <DropdownItem>
                                  <span
                                    onClick={handleViewRequest}
                                    className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                                  >
                                    <IoEnter /> Solicitudes
                                  </span>
                                </DropdownItem>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                        <DropdownItem>
                          <span
                            onClick={handleDelete}
                            className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                          >
                            <MdDelete /> Eliminar
                          </span>
                        </DropdownItem>
                      </>
                    )}
                  </Dropdown>

                  <ModalNotHeader
                    openModal={editProyect}
                    setOpenModal={setEditProyect}
                    size={"3xl"}
                    component={
                      <FormAddProyect proyect={proyect} type={"internal"} />
                    }
                  />

                  <ModalNotHeader
                    openModal={openRequest}
                    setOpenModal={setOpenRequest}
                    size={"3xl"}
                    component={
                      loading ? (
                        <article className="w-full h-full flex justify-center items-center">
                          <Loader />
                        </article>
                      ) : (
                        <article className="flex flex-col gap-6">
                          <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
                            Solicitudes de unión
                          </h5>

                          {proyect?.request === undefined ? (
                            <></>
                          ) : proyect?.request?.length === 0 ? (
                            <>
                              <h6 className="text-sm font-barolw font-semibold text-RojoC uppercase">
                                No hay solicitudes de unión actualmente
                              </h6>
                            </>
                          ) : (
                            <>
                              {proyect?.request?.map((item, key) => (
                                <CardRequest request={item} project={proyect} key={key} />
                              ))}
                            </>
                          )}
                        </article>
                      )
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <ul className="flex gap-2 mb-3">
                {proyect?.tags?.length > 0 && (
                  <ul className="flex flex-wrap mb-2 gap-2 overflow-x-auto pb-1">
                    {proyect?.tags?.map((item, key) => (
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
              <h5 className="text-2xl font-bold tracking-tight text-Negro">
                {proyect?.title}
              </h5>
              <p className="font-normal text-lg text-Negro">
                {proyect?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-8">
              <div className="bg-gris border border-verdeD px-5 py-3 rounded-md flex justify-between items-center">
                <p className="font-bold text-verdeD">
                  Fecha de Inicio:{" "}
                  <span className="text-Negro font-medium">
                    {proyect?.startDate?.split("T")[0]}
                  </span>
                </p>

                <FaCalendarDay className="text-verdeD text-xl" />
              </div>

              <div className="bg-gris border border-verdeD px-5 py-3 rounded-md flex justify-between items-center">
                {" "}
                <p className="font-bold text-verdeD">
                  Fecha de Finalización:{" "}
                  <span className="text-Negro font-medium">
                    {proyect?.endDate?.split("T")[0]}
                  </span>
                </p>
                <FaCalendarCheck className="text-verdeD text-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-8">
              <div className="bg-gris border border-verdeD px-5 py-3 rounded-md flex justify-between items-center">
                <p className="font-bold text-verdeD">
                  Estado:{" "}
                  <span className="text-Negro font-medium">
                    {proyect?.status === "not_started"
                      ? "Sin Iniciar"
                      : proyect?.status === "in_progress"
                        ? "En Progreso"
                        : proyect?.status === "paused"
                          ? "Pausado"
                          : proyect?.status === "completed"
                            ? "Completado"
                            : "Cancelado"}
                  </span>
                </p>

                <HiOutlineStatusOnline className="text-verdeD text-xl" />
              </div>

              <div className="bg-gris border border-verdeD px-5 py-3 rounded-md flex justify-between items-center">
                {" "}
                <p className="font-bold text-verdeD">
                  Visibilidad:{" "}
                  <span className="text-Negro font-medium">
                    {proyect.isPublic ? "Público" : "Privado"}
                  </span>
                </p>
                {proyect.isPublic ? (
                  <BiWorld className="text-verdeD text-xl" />
                ) : (
                  <RiGitRepositoryPrivateFill className="text-verdeD text-xl" />
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {proyect.owner.username === username ? (
                <></>
              ) : proyect.isCollaborator ? (
                <button
                  onClick={handleLeaveProyect}
                  className="text-xs px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 font-barlow-semi-condensed font-medium uppercase"
                >
                  Salir del proyecto
                </button>
              ) : proyect.hasPendingRequest ? (
                <button
                  onClick={handleCancelRequest}
                  className="text-xs px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-800 font-barlow-semi-condensed font-medium uppercase"
                >
                  Cancelar Unión
                </button>
              ) : proyect.isPublic ? (
                <button
                  onClick={handleJoin}
                  className="text-xs px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 font-barlow-semi-condensed font-medium uppercase"
                >
                  Unirme al proyecto
                </button>
              ) : (
                <button
                  onClick={handleRequest}
                  className="text-xs px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 font-barlow-semi-condensed font-medium uppercase"
                >
                  Solicitud de unión al proyecto
                </button>
              )}
            </div>

            {proyect?.collaborators?.length === 0 ? null : (
              <div className="bg-gris border w-full border-verdeD px-4 py-3 rounded-md flex flex-col gap-4">
                <h5 className="text-base lg:text-lg border-b border-RojoC w-full font-barlow-semi-condensed font-medium uppercase">
                  Colaboradores
                </h5>
                <ul className="flex flex-col gap-3">
                  {proyect?.collaborators?.map((item, key) => (
                    <li key={key} className="text-RojoC font-medium text-sm flex justify-between items-center">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {item?.user?.profilePicture?.url === null ? (
                          <div
                            onClick={() => navigate(`/graduates/${item?.user?.username}`)}
                            className="cursor-pointer w-7 h-7 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0"
                          >
                            <span className="text-white text-sm font-bold uppercase">
                              {item?.user?.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ) : (
                          <img
                            className="w-7 h-7 rounded-full object-cover cursor-pointer"
                            src={item?.user?.profilePicture?.url}
                            alt={item?.user?.username || "Foto de Perfil del Colaborador"}
                            onClick={() => navigate(`/graduates/${item?.user?.username}`)}
                          />
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                          <p
                            className="cursor-pointer font-semibold text-verdeC font-barolw text-sm truncate"
                            onClick={() => navigate(`/graduates/${item?.user?.username}`)}
                          >
                            @{item?.user?.username}
                          </p>
                          <span className="hidden sm:inline text-lg text-gray-500">•</span>
                          <span className="uppercase text-RojoC font-barlow-semi-condensed font-semibold text-xs sm:text-sm">
                            {item?.role === "creator" ? "Creador" :
                              item?.role === "member" ? "Miembro" : "Administrador"}
                          </span>
                        </div>
                        {proyect?.owner?.username === username && item?.user?.username !== username && (
                          <>

                            <Dropdown
                              inline
                              label=""
                              placement="left-start"
                              renderTrigger={() => (
                                <button className="p-1 text-gray-500 hover:text-gray-700">
                                  <FaEllipsisV className="h-4 w-4" />
                                </button>
                              )}
                            >
                              <DropdownItem onClick={() => setEditRole(true)}>
                                <div className="flex items-center gap-2 px-2 py-1 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100">
                                  <MdEdit /> Cambiar Rol
                                </div>
                              </DropdownItem>
                              <DropdownItem onClick={() => dispatch(expelCollaborator({
                                projectId: proyect?.id,
                                username: item?.user?.username,
                              }))}>
                                <div className="flex items-center gap-2 px-2 py-1 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100">
                                  <MdPersonRemove /> Expulsar
                                </div>
                              </DropdownItem>
                            </Dropdown>
                            <ModalNotHeader
                              openModal={editRole}
                              setOpenModal={setEditRole}
                              size={"3xl"}
                              component={<FormEditRole collaborator={item} />}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article >
        </>
      )}
    </>
  );
}
