import { HiX } from "react-icons/hi";
import perfil from "../../../public/Perfil.jpg"
import { useNavigate } from "react-router-dom";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { useState } from "react";
import { FormResolveReport } from "../Forms/admin/FormResolveReport";

function CardReport({ item }) {
  const [comment, setComment] = useState(false);
  const [reportResolve, setReportResolve] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${item.status === "pending"
          ? "border-blue-800"
          : item.status === "resolved"
            ? "border-verdeB"
            : "border-red-800"
          } flex w-full flex-col rounded-lg border bg-Gris p-4 shadow-sm lg:max-w-7xl`}
      >
        <div className="flex justify-between w-full items-center p-3 border-b border-verdeA">
          <div className="flex gap-2 items-center">
            {/* <img
              className="rounded-full w-8"
              src={
                item.reporter.profilePicture === undefined ||
                  item.reporter.profilePicture.url === null
                  ? perfil
                  : item.reporter.profilePicture.url
              }
              alt="Foto de Perfil"
            /> */}
            {item?.reporter?.profilePicture === undefined ||
              item?.reporter?.profilePicture?.url === null ? (
                // Si no hay foto de perfil, muestra la inicial del username
                <div className="w-8 h-8 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
                  <span className="text-white text-sm font-bold uppercase">
                    {item?.reporter?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              ) : (
            // Si hay foto, muéstrala circular
            <img
              className="rounded-full w-8"
              src={item?.reporter?.profilePicture?.url}
              alt={item?.reporter?.username || 'Foto de Perfil del Autor del Comentario'}
            />
            )}
            <p className="flex gap-2 text-black font-semibold font-barolw text-sm items-center">
              {item?.reporter?.username}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {item.status === "resolved" ? (
              <></>
            ) : (
              <>
                {item.comment === undefined ? (
                  item.comment === null ? (
                    <></>
                  ) : (
                    <button
                      onClick={(e) => {
                        navigate(`/forums/${item.thread.id}`);
                      }}
                      className="bg-blue-500 text-white px-2 py-[6px] rounded-md text-xs uppercase font-semibold hover:cursor-pointer hover:bg-blue-700"
                    >
                      ver foro
                    </button>
                  )
                ) : item.comment === null ? (
                  <></>
                ) : (
                  <button
                    onClick={(e) => {
                      setComment(true);
                    }}
                    className="bg-blue-500 text-white px-2 py-[6px] rounded-md text-xs uppercase font-semibold hover:cursor-pointer hover:bg-blue-700"
                  >
                    ver comentario
                  </button>
                )}
                <button
                  onClick={(e) => {
                    setReportResolve(true);
                  }}
                  className="bg-verdeB text-white p-[6px] rounded-md text-xs uppercase font-semibold hover:cursor-pointer hover:bg-verdeC"
                >
                  resolver
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3">
          {item.status === "resolved" ? (
            <h5 className="text-sm">
              <span className="font-semibold">Accion:</span>{" "}
              <span
                className={`${item.adminAction === "no_action"
                  ? "text-blue-800"
                  : item.adminAction === "warning"
                    ? "text-yellow-500"
                    : "text-red-800"
                  }`}
              >
                {
                  item.adminAction === "no_action"
                    ? "Sin accion"
                    : item.adminAction === "warning"
                      ? "Advertencia"
                      : "Eliminado"
                }
              </span>
            </h5>
          ) : (
            <></>
          )}
          <h5 className="text-sm">
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`${item.status === "pending"
                ? "text-blue-800"
                : item.status === "resolved"
                  ? "text-verdeB"
                  : "text-red-800"
                }`}
            >
              {item.status === "pending"
                ? "Pendiente"
                : item.status === "resolved"
                  ? "Resuelto"
                  : "Rechazado"}
            </span>
          </h5>
          <h5 className="text-sm">
            <span className="font-semibold">Tipo:</span>{" "}
            <span>{item.reason}</span>
          </h5>
          <p className="text-sm">
            <span className="font-semibold">Descripcion:</span>{" "}
            {item.description}
          </p>
        </div>
      </div>

      {item.comment === undefined || item.comment === null ? (
        <></>
      ) : (
        <ModalNotHeader
          openModal={comment}
          setOpenModal={setComment}
          size={"lg"}
          component={
            <div className="flex flex-col gap-2">
              <h6 className="text-base font-bold font-barolw">Comentario: </h6>
              <p className="text-sm">{item.comment.content}</p>
            </div>
          }
        />
      )}

      <ModalNotHeader
        openModal={reportResolve}
        setOpenModal={setReportResolve}
        size={"xl"}
        component={<FormResolveReport reportId={item.id} />}
      />
    </>
  );
}

export default CardReport;