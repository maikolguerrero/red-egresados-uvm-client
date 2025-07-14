import { useEffect } from "react";
import CardProfile from "../../Components/Card/CardProfile";
import InfoProfile from "../../Components/Card/InfoProfile";
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
    </>
  );
}

export default GraduatesProfile;
