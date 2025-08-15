import { Card } from "flowbite-react";

export function ButtonSecurity({onClick, texto, icono}) {
  return (
    <Card
      onClick={onClick}
      className="max-w-[250px] md:w-[250px] border-verdeD bg-Gris text-verdeC hover:cursor-pointer hover:bg-verdeD hover:text-white transition-all duration-300"
    >
      <div className="w-full flex justify-center">{icono}</div>
      <h5 className="text-xl font-bold tracking-tight text-center ">{texto}</h5>
    </Card>
  );
}