import { useDispatch } from "react-redux";
import { responseRequest } from "../../../services/proyects/proyectService";
import { useNavigate } from "react-router-dom";

export function CardRequest({ request }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const searchProfile = (e) => {
    navigate(`/graduates/${request.user.username}`);
  };

  return (
    <div
      key={request.id}
      className="bg-Gris px-4 py-6 flex flex-col justify-between items-start rounded-md border border-verdeD"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
        
          {request.user?.profilePicture === undefined ||
            request.user?.profilePicture?.url === null ? (
            // Si no hay foto de perfil, muestra la inicial del username
            <div className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-xs md:text-sm xl:text-base font-bold uppercase">
                {request.user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full object-cover"
              src={request.user.profilePicture?.url}
              alt={request.user.username || 'Foto de Perfil del Usuario'}
            />
          )}


          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <p onClick={searchProfile} className="cursor-pointer flex gap-2 font-semibold text-Negro font-barolw text-xs lg:text-sm items-center">
                @{request.user.username}
              </p>
              <span>-</span>
              <p
                className={`text-xs lg:text-sm font-semibold font-barolw ${request.status === "pending"
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

      <div className="flex gap-2 mt-2">
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
