import { useEffect, useState } from "react";
import perfil from "../../../public/Perfil.jpg"
import BadgeNormal from "../Buttons/BadgeNormal";
import { ModalNotHeader } from "../Modals/ModalNotHeader";

function CardProfile({ profile }) {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [openModal3, setOpenModal3] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setAnchoPantalla(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="w-full lg:w-5/6 bg-Gris border-[1.5px] border-verdeD flex gap-2 md:gap-3 lg:gap-5">
        {/* Contenedor de la imagen/letra - Ahora con ancho fijo y aspect-square */}
        <div className="w-[150px] md:w-[200px] aspect-square border-r-[1.5px] border-verdeD flex items-center justify-center overflow-hidden flex-shrink-0">
          {profile.user.profilePicture.url === null ? (
            // Si no hay foto, muestra la inicial
            <span className="text-Blanco text-5xl md:text-6xl lg:text-7xl font-bold bg-verdeA h-full w-full flex items-center justify-center">
              {profile.nombreCompleto?.charAt(0)}
            </span>
          ) : (
            // Si hay foto, muéstrala y ajústala para que cubra el cuadrado
            <img
              src={profile.user.profilePicture.url}
              alt="Foto Perfil"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Contenido del perfil (nombre, carreras, etc.) */}
        <div className="flex flex-col justify-between py-3">
          <div>
            <h4 className="text-sm md:text-base lg:text-lg font-barlow-semi-condensed uppercase font-bold text-RojoC">
              {profile.nombreCompleto}
            </h4>
            {profile.carrerasPregrado?.slice(0, 1).map((carrera, index) => (
              <h6
                key={index}
                className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-black"
              >
                {carrera.carrera}
              </h6>
            ))}
            {profile.programasPostgrado?.slice(0, 1).map((programa, index) => (
              <h6
                key={index}
                className="text-[10px] md:text-[14px] lg:text-base font-barlow-semi-condensed font-semibold text-black"
              >
                {programa.programa}
              </h6>
            ))}
            {/* Botón "Ver más" si hay más de 2 carreras/programas */}
            {(profile.programasPostgrado?.length + profile.carrerasPregrado?.length) > 2 ? (
              <button
                onClick={(e) => setOpenModal3(true)}
                className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-verdeD hover:text-verdeB"
              >
                Ver más
              </button>
            ) : null}
          </div>

          {/* Habilidades e Intereses */}
          <div className="flex gap-1 md:gap-2 flex-wrap">
            {profile.profile.professional.skills.length === 0 ? (
              <BadgeNormal color="bg-RojoC" text="SIN HABILIDADES" />
            ) : (
              <button
                onClick={(e) => setOpenModal(true)}
                className="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
              >
                ver habilidades de valor {profile.profile.professional.skills.length}
              </button>
            )}
            {profile.profile.professional.interests.length === 0 ? (
              <BadgeNormal color="bg-RojoC" text="SIN INTERESES" />
            ) : (
              <button
                onClick={(e) => setOpenModal2(true)}
                className="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
              >
                ver intereses personales {profile.profile.professional.interests.length}
              </button>
            )}
          </div>
        </div>
      </div>

      <ModalNotHeader
        size={"sm"}
        openModal={openModal}
        setOpenModal={setOpenModal}
        component={
          <>
            <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              HABILIDADES PROFESIONALES
            </h4>
            <div className="flex gap-2">
              {profile.profile.professional.skills.map((item, key) => (
                <BadgeNormal color="bg-verdeD" text={item} key={key} />
              ))}
            </div>
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
            <div className="flex gap-2">
              {profile.profile.professional.interests.map((item, key) => (
                <BadgeNormal color="bg-verdeD" text={item} key={key} />
              ))}
            </div>
          </>
        }
      />

      <ModalNotHeader
        size={"sm"}
        openModal={openModal3}
        setOpenModal={setOpenModal3}
        component={
          <div
            className="flex flex-col gap-2 h-[200px]"
            style={{
              overflowY:
                profile?.carrerasPregrado?.length + profile?.programasPostgrado?.length >
                  3
                  ? "scroll"
                  : "auto",
            }}
          >
            <h4 className="py-1 px-2 border-b-2 mb-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              Titulos obtenidos en la UVM
            </h4>
            <div className="flex flex-col gap-2">
              {profile?.carrerasPregrado?.map((item, key) => (
                <BadgeNormal color="bg-verdeD" text={item.carrera} key={key} />
              ))}
            </div>
            <div className="">
              {profile?.programasPostgrado?.map((item, key) => (
                <BadgeNormal color="bg-verdeD" text={item.programa} key={key} />
              ))}
            </div>
          </div>
        }
      />
    </>
  );
}

export default CardProfile;
