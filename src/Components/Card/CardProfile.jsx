import { useState } from "react";
import BadgeNormal from "../Buttons/BadgeNormal";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

function CardProfile({ profile }) {
  const username = useSelector((state) => state.auth.username)
  const role = useSelector((state) => state.auth.role)
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [openModal3, setOpenModal3] = useState(false)

  return (
    <>
      <div className="w-full lg:w-5/6 bg-Gris border-[1.5px] border-verdeD flex gap-2 md:gap-3 lg:gap-5">
        {/* Contenedor de la imagen/letra - Ahora con ancho fijo y aspect-square */}
        <div className="w-[150px] md:w-[200px] aspect-square border-r-[1.5px] border-verdeD flex items-center justify-center overflow-hidden flex-shrink-0">
          {profile?.user?.profilePicture?.url === null ? (
            // Si no hay foto, muestra la inicial
            <span className="text-Blanco text-6xl md:text-7xl lg:text-8xl uppercase font-bold bg-verdeA h-full w-full flex items-center justify-center">
              {profile?.user?.username?.charAt(0)}
            </span>
          ) : (
            // Si hay foto, muéstrala y ajústala para que cubra el cuadrado
            <img
              src={profile?.user?.profilePicture?.url}
              alt="Foto Perfil"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Contenido del perfil (nombre, carreras, etc.) */}
        <div className="flex flex-col justify-between py-3">
          <div>
            <h4 className="text-sm md:text-base lg:text-lg font-barlow-semi-condensed uppercase font-bold text-RojoC">
              {profile?.nombreCompleto}
            </h4>
            <h5 className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-verdeD">
              @{profile?.user?.username}
            </h5>
            {profile?.carrerasPregrado?.slice(0, 1).map((carrera, index) => (
              <h6
                key={index}
                className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-black"
              >
                {carrera.carrera}
              </h6>
            ))}
            {profile?.programasPostgrado?.slice(0, 1).map((programa, index) => (
              <h6
                key={index}
                className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-black"
              >
                {programa.programa}
              </h6>
            ))}
            {/* Botón "Ver más" si hay más de 2 carreras/programas */}
            {(profile?.programasPostgrado?.length +
              profile?.carrerasPregrado?.length >
              2) ? (
              <button
                onClick={(e) => setOpenModal3(true)}
                className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-verdeD hover:text-verdeB"
              >
                Ver más
              </button>
            ) : null}
          </div>

          {/* Habilidades e Intereses */}
          <div className="flex gap-1 md:gap-2 flex-wrap items-center">
            {profile?.user?.username === username ||
              role === "admin" ||
              role === "superadmin" ? (
              <div className="">
                {" "}
                {profile?.profile?.professional?.skills?.values?.length > 0 && (
                  <button
                    onClick={(e) => setOpenModal(true)}
                    className="flex items-center gap-1 bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
                  >
                    ver habilidades de valor{" "}
                    <p>{profile?.profile?.professional?.skills?.values?.length}</p>
                    {profile?.profile?.professional?.skills?.isPublic === false && (
                      <FaLock className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            ) : (
              <>
                {profile?.profile?.professional?.skills?.values?.length === 0 ||
                  profile?.profile?.professional?.skills?.isPublic === false ? (
                  // <BadgeNormal color="bg-RojoC" text="SIN HABILIDADES" />
                  <></>
                ) : (
                  <button
                    onClick={(e) => setOpenModal(true)}
                    className="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
                  >
                    ver habilidades de valor{" "}
                    {profile?.profile?.professional?.skills?.values?.length}
                  </button>
                )}
              </>
            )}

            {profile?.user?.username === username ||
              role === "admin" ||
              role === "superadmin" ? (
              <>
                {" "}
                {profile?.profile?.professional?.interests?.values?.length > 0 && (
                  <button
                    onClick={(e) => setOpenModal2(true)}
                    className="flex items-center gap-1 bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
                  >
                    ver intereses personales{" "}
                    <p>{profile?.profile?.professional?.interests?.values?.length}</p>
                    {profile?.profile?.professional?.interests?.isPublic === false && (
                      <FaLock className="h-3 w-3" />
                    )}
                  </button>
                )}
              </>
            ) : (
              <>
                {profile?.profile?.professional?.interests?.values?.length === 0 ||
                  profile?.profile?.professional?.interests?.isPublic === false ? (
                  // <BadgeNormal color="bg-RojoC" text="SIN HABILIDADES" />
                  <></>
                ) : (
                  <button
                    onClick={(e) => setOpenModal2(true)}
                    className="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
                  >
                    ver intereses personales{" "}
                    {profile?.profile?.professional?.interests?.values?.length}
                  </button>
                )}
              </>
            )}
          </div >
        </div >
      </div >

      <ModalNotHeader
        size={"sm"}
        openModal={openModal}
        setOpenModal={setOpenModal}
        component={
          <>
            <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              HABILIDADES PROFESIONALES
            </h4>
            <ul className="list-inside flex flex-col gap-2">
              {profile?.profile?.professional?.skills?.values?.length > 0 && (
                profile?.profile?.professional?.skills?.values.map(
                  (item, key) => (
                    <li
                      key={key}
                      className="list-disc font-barlow-condensed text-lg font-medium text-verdeB"
                    >
                      {item}
                    </li>
                  )
                )
              )}
            </ul >
          </>
        }
      />

      <ModalNotHeader
        size={"sm"}
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        component={
          <>
            <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              INTERESES PERSONALES
            </h4>
            <ul className="list-inside flex flex-col gap-2">
              {profile?.profile?.professional?.interests?.values?.length > 0 && (
                profile?.profile?.professional?.interests?.values.map(
                  (item, key) => (
                    <li
                      key={key}
                      className="list-disc font-barlow-condensed text-lg font-medium text-verdeB"
                    >
                      {item}
                    </li>
                  )
                )
              )}
            </ul >
          </>
        }
      />

      <ModalNotHeader
        size={"xl"}
        openModal={openModal3}
        setOpenModal={setOpenModal3}
        component={
          < div
            className="flex flex-col gap-2 h-full"
          // style={{
          //   overflowY: profile?.carrerasPregrado?.length + profile?.programasPostgrado?.length > 4 ? 'scroll' : 'hidden',
          // }}
          >
            <h4 className="py-1 px-2 border-b-2 mb-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              Títulos obtenidos en la UVM
            </h4>
            <ul className="list-inside flex flex-col gap-2">
              {profile?.carrerasPregrado?.map((item, key) => (
                <li
                  key={key}
                  className="list-disc font-barlow-condensed text-lg font-medium text-verdeB"
                >
                  {item.carrera}
                </li>
              ))}
              {profile?.programasPostgrado?.map((item, key) => (
                <li
                  key={key}
                  className="list-disc font-barlow-condensed text-lg font-medium text-RojoC"
                >
                  {item.programa}
                </li>
              ))}
            </ul>
          </div >
        }
      />
    </>
  );
}

export default CardProfile;
