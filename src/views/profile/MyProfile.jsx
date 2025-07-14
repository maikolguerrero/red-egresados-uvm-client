import { useEffect } from "react";
import CardProfile from "../../Components/Card/CardProfile";
import InfoProfile from "../../Components/Card/InfoProfile";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../services/users/usersService";
import { Loader } from "../../Components/Loader";

function MyProfile() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.users.loadingPage)
  const loadingOverlapping = useSelector((state) => state.users.loading)

  useEffect(() => {
    dispatch(getProfile({ username: auth.username }));
  }, []);

  return (
    <>


      {loading ? (
        <section className="h-full flex justify-center items-center w-full">
          <Loader />
        </section>
      ) : (
        <>
          {loadingOverlapping ? (
            <>
              <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
                <div className="relative h-full w-full flex justify-center items-center">
                  <Loader />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {users?.profile === null ? (
            <></>
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

export default MyProfile;
