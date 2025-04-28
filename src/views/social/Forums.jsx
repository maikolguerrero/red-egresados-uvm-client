import { CardForum } from "../../Components/Card/CardForum";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";

function Forums() {
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex">
        <Nav />
        <div className="w-full px-3 py-12 md:px-6 lg:px-16 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
            <CardForum />
            <CardForum />
        </div>
      </main>
    </>
  );
}

export default Forums;
