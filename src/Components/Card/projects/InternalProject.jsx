import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaCalendarCheck, FaCalendarDay, FaEllipsisV } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { ModalNotHeader } from "../../Modals/ModalNotHeader";
import { useState } from "react";
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

export function InternalProject({ proyect }) {
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role);
  const loading = useSelector((state) => state.proyects.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editProyect, setEditProyect] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [editRole, setEditRole] = useState(false);

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
        <article className="flex flex-col gap-1 w-full pb-8">
          <h4 className="uppercase text-xl font-medium">
            Este proyecto ha sido eliminado
          </h4>
        </article>
      ) : (
        <>
          <article className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* <img
                  className="rounded-full w-8 md:w-8 xl:w-10"
                  src={
                    proyect.owner.profilePicture.url === null
                      ? perfil
                      : proyect.owner.profilePicture.url
                  }
                  alt="Foto de Perfil"
                /> */}

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
                      proyect?.owner?.username || "Foto de Perfil del Propietario"
                    }
                  />
                )}

                <p onClick={searchProfile} className="cursor-pointer flex gap-2 font-semibold text-RojoC font-barolw text-sm md:text-base xl:text-lg items-center">
                  @{proyect?.owner?.username}
                </p>
              </div>

              {proyect.owner.username === username || role === "admin" || role === "superadmin" ? (
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
                        <DropdownItem>
                          <span
                            onClick={handleViewRequest}
                            className="flex gap-1 items-center px-4 py-2 text-sm uppercase font-medium font-barlow-condensed text-Negro hover:bg-gray-100"
                          >
                            <IoEnter /> Solicitudes
                          </span>
                        </DropdownItem>
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
                            Solicitudes de union
                          </h5>

                          {proyect?.request === undefined ? (
                            <></>
                          ) : proyect?.request?.length === 0 ? (
                            <>
                              <h6 className="text-sm font-barolw font-semibold text-RojoC uppercase">
                                No hay solicitudes de union actualmente
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
              {proyect?.tags?.length === 0 ? (
                <></>
              ) : (
                <ul className="flex gap-2">
                  {proyect?.tags?.map((item, key) => (
                    <li
                      className="py-1 px-3 rounded-full font-barolw uppercase bg-verdeC text-Blanco w-auto text-xs"
                      key={key}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
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
                  Fecha de Finalizacion:{" "}
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
                  Cancelar Union
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
                  Solicitud de union al proyecto
                </button>
              )}
            </div>

            {proyect?.collaborators?.length === 0 ? (
              <></>
            ) : (
              <div className="bg-gris border w-full border-verdeD px-5 py-3 rounded-md flex flex-col gap-6">
                <h5 className="lg:text-lg border-b border-RojoC w-full font-barlow-semi-condensed font-medium uppercase">
                  Colaboradores
                </h5>
                <ul className="px-2 flex flex-col gap-3">
                  {proyect?.collaborators?.map((item, key) => (
                    <li key={key} className="text-RojoC font-medium text-sm flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {item?.user?.profilePicture?.url === null ? (
                          // Si no hay foto de perfil, muestra la inicial del username
                          <div className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                            <span className="text-white text-xs md:text-xs xl:text-sm font-bold uppercase">
                              {item?.user?.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ) : (
                          // Si hay foto, muéstrala circular
                          <img
                            className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full object-cover"
                            src={item?.user?.profilePicture?.url}
                            alt={
                              item?.user?.username ||
                              "Foto de Perfil del Colaborador"
                            }
                          />
                        )}

                        <p onClick={(e) => {
                          navigate(`/graduates/${item?.user?.username}`);
                        }} className="cursor-pointer flex gap-3 font-semibold text-verdeC font-barolw text-xs md:text-sm xl:text-base items-center">
                          @{item?.user?.username} <span>-</span>
                          {item?.role === "creator" ? (
                            <span className="uppercase text-RojoC font-barlow-semi-condensed font-semibold">
                              Creador
                            </span>
                          ) : (
                            <span className="uppercase text-RojoC font-barlow-semi-condensed font-semibold">
                              {item.role === "member"
                                ? "Miembro"
                                : "Administrador"}
                            </span>
                          )}
                        </p>
                      </div>

                      {
                        proyect?.owner?.username === username ? (
                          item?.user?.username === username ? (
                            <></>
                          ) : (
                            <>
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => setEditRole(true)}
                                  className="text-xs px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 font-barlow-semi-condensed font-medium uppercase"
                                >
                                  Rol
                                </button>
                                <button
                                  onClick={(e) => {
                                    dispatch(
                                      expelCollaborator({
                                        projectId: proyect?.id,
                                        username: item?.user?.username,
                                      })
                                    );
                                  }}
                                  className="text-xs px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 font-barlow-semi-condensed font-medium uppercase"
                                >
                                  Expulsar
                                </button>
                              </div>

                              <ModalNotHeader
                                openModal={editRole}
                                setOpenModal={setEditRole}
                                size={"3xl"}
                                component={<FormEditRole collaborator={item} />}
                              />
                            </>
                          )
                        ) : (
                          <></>
                        )
                      }
                    </li >
                  ))
                  }
                </ul >
              </div >
            )}
          </article >
        </>
      )}
    </>
  );
}
