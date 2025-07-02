import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import perfil from "../../../../public/Perfil.jpg"
import ButtonSmall from "../../Buttons/ButtonSmall";

export function CardGraduateHome({ user }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const searchProfile = (e) => {
    navigate(`/graduates/${user.user.username}`);
  };

  const startChat = () => {
    navigate(`/chat/${user.user.username}`);
  };

  return (
    <article
      className="flex h-full items-center justify-center p-2"
    >
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-white rounded-md p-3 border border-verdeC">
        <div className="flex items-center text-center gap-2">
          <img
            alt="Bonnie image"
            src={
              user.user.profilePicture.url === null
                ? perfil
                : user.user.profilePicture.url
            }
            className="rounded-full shadow-lg w-14 h-14"
          />
          <div className="flex flex-col">
            <h5 className="text-base font-medium font-barolw text-negro w-full flex justify-start">
              {user.firstName} {user.lastName}
            </h5>
            <h6 className="text-sm font-barlow-semi-condensed font-semibold text-black w-full flex justify-start">
              @{user.user.username}
            </h6>
          </div>
        </div>

        {auth.username === user.user.username ? (
          <>
            <span className="text-sm font-semibold font-barolw text-RojoC">
              (TU PERFIL)
            </span>
          </>
        ) : (
          <>
            <div className="flex gap-2">
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
            </div>
          </>
        )}
      </div>
    </article>
  );
}
