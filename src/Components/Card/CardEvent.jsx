import { Card } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";

export function CardEvent(props) {
  return (
    <div className="w-full bg-white border border-verdeD rounded-lg shadow-sm ">
      <a href="">
        <img
          className="rounded-t-lg border-b border-verdeD w-full"
          src={props.image}
          alt="Multimedia Evento"
        />
      </a>

      <div className="p-5 font-barolw">
        <h5 className="mb-1 text-sm md:text-base xl:text-lg font-bold tracking-tight text-Negro">
          SEMANA EXPOTECNOLOGÍA 2024
        </h5>
        <h6 className="text-RojoC mb-8 text-xs md:text-sm xl:text-base font-semibold">
          01/12/2025 LUNES 8:00AM
        </h6>
        <p className="mb-3 font-medium text-Negro ">
          La "Semana de Expotecnología" es un evento que reúne a estudiantes,
          profesionales, empresas y entusiastas de la tecnología para explorar
          las últimas innovaciones y tendencias en el campo.
        </p>

        <div className="flex gap-3">
          <ButtonSmall
            text={"Ver mas..."}
            className={"bg-verdeC hover:bg-RojoC"}
          />
          <ButtonSmall
            text={"Agendar"}
            className={"bg-verdeC hover:bg-RojoC"}
          />
        </div>
      </div>
    </div>
  );
}