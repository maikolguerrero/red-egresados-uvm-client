import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Nav from "../Components/Nav";

function Home() {
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>
      
      <div className="flex">
        <Nav />
        <div className="w-full">

        </div>
      </div>
      
    </>
  );
}

export default Home;
