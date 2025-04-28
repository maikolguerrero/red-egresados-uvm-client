import { useEffect, useState } from "react";
import perfil from "../../../public/Perfil.jpg"
import BadgeNormal from "../Buttons/BadgeNormal";

function CardProfile({ MyProfile }) {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

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
          <img src={perfil} alt="Foto Perfil" className="h-full w-full" />
        </div>

        <div className="flex flex-col justify-between py-3">
          <div>
            <h4 className="text-sm lg:text-lg font-barlow-semi-condensed font-bold text-RojoC">
              ANGGELO ALEXANDER HUZ PERNIA
            </h4>
            <h6 className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-black">
              ING. EN COMPUTACIÓN
            </h6>
          </div>

          <div className="flex gap-1 md:gap-2 flex-wrap">
            {anchoPantalla > 767 ? (
              <>
                <BadgeNormal text="Robótica" />
                <BadgeNormal text="Inglés" />
                <BadgeNormal text="Telecom" />
                <BadgeNormal text="Programador" />
              </>
            ) : (
              <button class="bg-verdeD text-Blanco text-[9px] uppercase md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md">
                habilidades profesionales
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProfile;
