import CardProfile from "../../Components/Card/CardProfile";
import InfoProfile from "../../Components/Card/InfoProfile";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";

function MyProfile() {
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
            <CardProfile />
            <InfoProfile />
        </div>
      </div>
    </>
  );
}

export default MyProfile;
