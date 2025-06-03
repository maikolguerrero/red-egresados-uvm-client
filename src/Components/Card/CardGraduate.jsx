
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import perfil from "../../../public/Perfil.jpg"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function CardGraduate({user}) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const searchProfile = (e) => {
    navigate(`/graduates/${user.user.username}`);
  };

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
          src={
            user.user.profilePicture.url === null
              ? perfil
              : user.user.profilePicture.url
          }
          width="96"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium font-barolw text-negro ">
          {user.firstName} {user.lastName}
        </h5>
        <span className="text-sm font-medium font-barolw text-RojoC">
          {user.degree}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          {auth.username === user.user.username ? (
            <>
              <span className="text-sm font-semibold font-barolw text-Negro">
                (TU PERFIL)
              </span>
            </>
          ) : (
            <>
              <ButtonSmall
                text={"Colaborar"}
                className={"bg-verdeC hover:bg-RojoC"}
              />
              <ButtonSmall
                action={searchProfile}
                text={"Perfil"}
                className={"bg-verdeA hover:bg-RojoC"}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
