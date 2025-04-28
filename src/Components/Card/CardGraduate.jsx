
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";

export function CardGraduate() {
  return (
    <Card className="w-[275px] bg-Gris border-verdeD">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <DropdownItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100"
            >
              Proyectos
            </a>
          </DropdownItem>
          <DropdownItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100"
            >
              Foros
            </a>
          </DropdownItem>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          alt="Bonnie image"
          height="96"
          src="https://www.clarin.com/img/2024/07/04/uteodLeuh_600x600__1.jpg"
          width="96"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium font-barolw text-negro ">Bonnie Green</h5>
        <span className="text-sm font-medium font-barolw text-RojoC">Diseñador Gráfico</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <ButtonSmall text={"Colaborar"} className={"bg-verdeC hover:bg-RojoC"} />
          <ButtonSmall text={"Perfil"} className={"bg-verdeA hover:bg-RojoC"} />
        </div>
      </div>
    </Card>
  );
}
