import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { useState } from "react";
import { CardBanner } from "../../Components/Card/CardBanner";

const data = [{
    id: 1,
    noti: "Te han solicitado entrar a tu proyecto",
    type: "Proyectos"
},{
    id: 2,
    noti: "Hoy es el evento de Expotecnologia",
    type: "Eventos"
},{
    id: 3,
    noti: "Te han comentado en tu foro 'React'",
    type: "Foros"
},{
    id: 4,
    noti: "Le dieron me gusta a tu foro",
    type: "Foros"
},]

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-verdeD bg-Gris px-3 py-2 leading-tight text-Negro enabled:hover:bg-Blanco enabled:hover:text-verdeD",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-verdeD bg-Gris py-2 leading-tight text-Negro enabled:hover:bg-white enabled:hover:text-verdeD",
      active: "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const max = Math.ceil(data.length / perPage);

  const onPageChange = (page) => setCurrentPage(page);
  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex">
        <Nav />
        <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-8 flex flex-col items-center h-[89.5vh]  overflow-y-scroll overflow-x-auto">
          <div className="w-full gap-6 justify-center flex-col flex">
            {data
              .slice(
                (currentPage - 1) * perPage,
                (currentPage - 1) * perPage + perPage
              )
              .map((item, key) => (
                <CardBanner key={item.id} noti={item.noti} type={item.type} />
              ))}
          </div>
          <div className="flex justify-center">
            <ThemeProvider theme={customTheme}>
              <Pagination
                theme={customTheme}
                className="border-verdeD"
                currentPage={currentPage}
                totalPages={max}
                onPageChange={onPageChange}
              />
            </ThemeProvider>
          </div>
        </section>
      </main>
    </>
  );
}

export default Notifications;
