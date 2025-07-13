import { useEffect } from "react";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import CardProfile from "../../Components/Card/CardProfile";
import InfoProfile from "../../Components/Card/InfoProfile";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../services/users/usersService";
import { Loader } from "../../Components/Loader";
import EntityNotFound from "../../Components/EntityNotFound";

function GraduatesProfile() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const loading = useSelector((state) => state.users.loadingPage);
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    dispatch(getProfile({ username: currentPath.split("/")[2] }));
  }, []);

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex relative">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          {loading ? (
            <section className="h-full flex justify-center items-center w-full">
              <Loader />
            </section>
          ) : (
            <>
              {!users?.profile || users?.profile?.user.role !== "egresado" ? (
                <>
                  <EntityNotFound entity="Egresado" entityPath="/graduates" />
                </>
              ) : (
                <>
                  <CardProfile profile={users.profile} />
                  <InfoProfile profile={users.profile} />
                </>
              )}
            </>
          )}
        </div>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </div>
    </>
  );
}

export default GraduatesProfile;
