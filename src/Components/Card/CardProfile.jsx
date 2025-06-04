import { useEffect, useState } from "react";
import perfil from "../../../public/Perfil.jpg"
import BadgeNormal from "../Buttons/BadgeNormal";
import { ModalNotHeader } from "../Modals/ModalNotHeader";

function CardProfile({ profile }) {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)

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
      <div className="w-full lg:w-5/6 bg-Gris h-[150px] md:h-[200px] border-[1.5px] border-verdeD flex gap-2 md:gap-3 lg:gap-5">
        <div className="h-full w-[150px] md:h-full md:w-[200px] border-r-[1.5px] border-verdeD flex">
          <img
            src={
              profile.user.profilePicture.url === null
                ? perfil
                : profile.user.profilePicture.url
            }
            alt="Foto Perfil"
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-col justify-between py-3">
          <div>
            <h4 className="text-sm lg:text-lg font-barlow-semi-condensed uppercase font-bold text-RojoC">
              {profile.firstName} {profile.lastName}
            </h4>
            <h6 className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-black">
              {profile.degree}
            </h6>
          </div>

          <div className="flex gap-1 md:gap-2 flex-wrap">
            {profile.profile.professional.skills.length === 0 ? (
              <>
                <BadgeNormal color="bg-RojoC" text="Sin habilidades" />
              </>
            ) : (
              <button
                onClick={(e) => setOpenModal(true)}
                class="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
              >
                ver habilidades de valor{" "}
                {profile.profile.professional.skills.length}
              </button>
            )}
            {profile.profile.professional.interests.length === 0 ? (
              <>
                <BadgeNormal color="bg-RojoC" text="SIN INTERESES" />
              </>
            ) : (
              <button
                onClick={(e) => setOpenModal2(true)}
                class="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md"
              >
                ver intereses personales{" "}
                {profile.profile.professional.interests.length}
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
    </>
  );
}

export default CardProfile;
