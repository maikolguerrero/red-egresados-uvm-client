import { Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import perfil from "../../../public/Perfil.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import BadgeNormal from "../Buttons/BadgeNormal";

export function CardGraduate({ user }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false)

  const searchProfile = (e) => {
    navigate(`/graduates/${user.username}`);
  };

  const startChat = () => {
    navigate(`/chat/${user.username}`);
  };

  return (
    <>
      <Card className="w-[275px] bg-Gris border-verdeD">
        <div className="flex justify-end px-4 pt-4">
          {<Dropdown inline label="">
          <DropdownItem>
            <Link
              to={`/projects/personal/${user.username}`}
              className="block px-4 py-2 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100"
            >
              SUS PROYECTOS
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to={`/projects/personal-colaborator/${user.username}`}
              className="block px-4 py-2 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100"
            >
              SUS COLABORACIONES
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to={`/forums/personal/${user.username}`}
              className="block px-4 py-2 text-sm uppercase font-barlow-condensed text-Negro hover:bg-gray-100"
            >
              SUS FOROS
            </Link>
          </DropdownItem>
        </Dropdown>}
        </div>
        <div className="flex flex-col items-center text-center pb-10">
          {user?.profilePicture?.url === null ? (
            // Si no hay foto, muestra la inicial circular
            <div className="mb-3 w-24 h-24 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
              <span className="text-white text-4xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              alt="Foto Perfil"
              height="96" // w-24 es 96px
              src={user?.profilePicture?.url}
              width="96" // h-24 es 96px
              className="mb-3 rounded-full shadow-lg object-cover"
            />
          )}
          <h5 className="mb-1 text-xl font-medium font-barolw text-negro ">
            {user?.nombreCompleto}
          </h5>
          <h6 className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-black">
            @{user?.username}
          </h6>

          {user?.carrerasPregrado?.length > 0 ? (
            <span className="text-sm font-medium font-barolw text-verdeB">
              {user?.carrerasPregrado?.[0]?.carrera}
            </span>
          ) : null}

          {user?.programasPostgrado?.length > 0 ? (
            <span className="text-sm font-medium font-barolw text-RojoC">
              {user?.programasPostgrado?.[0]?.programa}
            </span>
          ) : null}

          {((user.programasPostgrado?.length + user.carrerasPregrado?.length) > 2) ? (
            <button
              onClick={(e) => setOpenModal(true)}
              className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-verdeD hover:text-verdeB"
            >
              Ver mas
            </button>
          ) : null}

          <div className="mt-4 flex space-x-3 lg:mt-6">
            {auth.username === user?.username ? (
              <>
                <span className="text-sm font-semibold font-barolw text-Negro">
                  (TU PERFIL)
                </span>
              </>
            ) : (
              <>
                <ButtonSmall
                  text={"Enviar Mensaje"}
                  className={"bg-verdeC hover:bg-RojoC"}
                  action={startChat}
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

      <ModalNotHeader
        size={"xl"}
        openModal={openModal}
        setOpenModal={setOpenModal}
        component={
          <div
            className="flex flex-col gap-2 h-full"
            // style={{
            //   overflowY: user?.carrerasPregrado?.length + user?.programasPostgrado?.length > 4 ? 'scroll' : 'hidden',
            // }}
          >
            <h4 className="py-1 px-2 border-b-2 mb-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
              Títulos obtenidos en la UVM
            </h4>
            <ul className="list-inside flex flex-col gap-2 text-sm md:text-base">
              {user?.carrerasPregrado?.map((item, key) => (
                <li key={key} className="list-disc font-barlow-condensed font-medium text-verdeB" >{item.carrera}</li>
              ))}
              {user?.programasPostgrado?.map((item, key) => (
                <li key={key} className="list-disc font-barlow-condensed font-medium text-RojoC" >{item.programa}</li>
              ))}
            </ul>
          </div>
        }
      />
    </>
  );
}
