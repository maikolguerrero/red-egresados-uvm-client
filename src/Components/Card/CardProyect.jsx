import { Badge, Button, Card } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";

export function CardProyect() {
  return (
    <Card className="max-w-md border-[1.5px] border-verdeD bg-Gris">
      <div className="flex items-center gap-2">
        <img
          className="rounded-full w-6 md:w-6 xl:w-8"
          src="https://www.clarin.com/img/2024/07/04/uteodLeuh_600x600__1.jpg"
          alt="Foto de Perfil"
        />
        <p className="flex gap-2 font-semibold text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
          Maria Colmenares
        </p>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-Negro">
        App Musical para mobiles
      </h5>
      <p className="font-normal text-Negro">
        Esta app que estamos desarrollando busca crear una facilidad para los
        musicos de crear, componer, escribir y compartir sus canciones dentro
        del mundo musical.
      </p>

      <div className="mt-6">
        <p className="font-bold text-verdeD">Colaboradores: <span className="text-Negro font-medium">Anggelo Huz, Maikol Guerrero</span></p>
        <p className="font-bold text-verdeD flex items-center gap-2">Estado del Proyecto: <Badge color="success">Sin Iniciar</Badge></p>
      </div>

      <div className="mt-6 flex gap-2">
        <ButtonSmall text={"Unirme"} className={"bg-verdeC hover:bg-RojoC"} />
        <ButtonSmall text={"Resultados"} className={"bg-verdeC hover:bg-RojoC"} />
      </div>
    </Card>
  );
}