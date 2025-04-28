import { FaCircle, FaComments, FaRegComments, FaShare } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export function CardForum() {
  return (
    <article className="flex flex-col gap-1 w-full pb-8 border-b-2 border-verdeD">
      <div className="flex gap-2 w-ful flex-wrap mb-3">
        <img
          className="rounded-full w-6 md:w-8 xl:w-10"
          src="https://www.clarin.com/img/2024/07/04/uteodLeuh_600x600__1.jpg"
          alt="Foto de Perfil"
        />
        <p className="flex gap-2 text-RojoC font-barolw text-xs md:text-sm xl:text-base items-center">
          Maria Colmenares{" "}
          <FaCircle className="text-Negro text-[6px] md:text-[9px] xl:text-xs flex justify-center items-center h-full" />{" "}
          Hace 12h
        </p>
      </div>

      <h4 className="text-Negro font-barolw font-medium text-sm md:text-base xl:text-lg mb-1">
        DESARROLLAR PROYECTO EN REACT CON VITE
      </h4>

      <img
        className="rounded-md mb-2"
        src="https://miro.medium.com/v2/resize:fit:1400/1*ucL7YQ2v8aaOy426soLPZA.png"
        alt="Multimedia del foro"
      />
      
      <ul className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap font-barolw text-sm md:text-base xl:text-lg">
        <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer">25 <FaPeopleGroup className="text-base md:text-lg xl:text-xl" /></li>
        <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer">500 <FaComments className="text-base md:text-lg xl:text-xl"/></li>
        <li className="flex gap-2 items-center justify-center bg-Gris py-1 px-4 rounded-full hover:text-Blanco hover:bg-RojoC transition-all duration-300 hover:cursor-pointer">Compartir <FaShare className="text-base md:text-lg xl:text-xl" /></li>
      </ul>
    </article>
  );
}
