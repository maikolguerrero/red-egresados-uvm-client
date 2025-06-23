import { useDispatch } from "react-redux";
import perfil from "../../../../public/Perfil.jpg";
import { expelCollaborator, responseRequest } from "../../../services/proyects/proyectService";

export function CardRequest({ request, project }) {
  const dispatch = useDispatch();

  const handleAccept = (e) => {
    dispatch(
      responseRequest({
        requestId: request.id,
        data: {
          status: "approved",
          message: "He aprobado tu solicitud de union",
        },
      })
    );
  };

  const handleReject = (e) => {
    dispatch(
      responseRequest({
        requestId: request.id,
        data: {
          status: "rejected",
          message: "He rechazado tu solicitud de union",
        },
      })
    );
  };

  return (
    <div
      key={request.id}
      className="bg-Gris px-4 py-6 flex justify-between items-center rounded-md border border-verdeD"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-6 md:w-6 xl:w-8"
            src={
              request.user.profilePicture.url === null
                ? perfil
                : request.user.profilePicture.url
            }
            alt="Foto de Perfil"
          />
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <p className="flex gap-2 font-semibold text-Negro font-barolw text-xs lg:text-sm items-center">
                {request.user.username}
              </p>
              <span>-</span>
              <p
                className={`text-xs lg:text-sm font-semibold font-barolw ${
                  request.status === "pending"
                    ? "text-blue-600"
                    : request.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {request.status === "pending"
                  ? "Pendiente"
                  : request.status === "approved"
                  ? "Aprobado"
                  : "Rechazado"}
              </p>
            </div>
            <p className="text-[10px]">{request.updatedAt.split("T")[0]}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {request.status === "pending" ? (
          <>
            <button
              onClick={handleAccept}
              className="text-xs px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 font-barlow-semi-condensed font-medium uppercase"
            >
              Aceptar
            </button>
            <button
              onClick={handleReject}
              className="text-xs px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 font-barlow-semi-condensed font-medium uppercase"
            >
              Rechazar
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
