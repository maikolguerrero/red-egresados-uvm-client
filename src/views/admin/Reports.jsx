import { useEffect, useState } from "react";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { CardBanner } from "../../Components/Card/CardBanner";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markNotificationAsRead, deleteNotification, getUnreadNotificationCount } from "../../services/notifications/notificationService";
import socketService from "../../services/socket/socket.service";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../models/alertModels";
import { decrementUnreadCount } from "../../features/notifications/notificationSlice";
import { useNavigate } from "react-router-dom";
import { searchReport } from "../../services/reports/reportsService";
import { Loader } from "../../Components/Loader";
import { HiX } from "react-icons/hi";
import CardReport from "../../Components/Card/CardReport";
import FilterReport from "../../Components/Forms/admin/FilterReport";

const customTheme = createTheme({
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700",
      span: "font-semibold text-gray-900",
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
      active:
        "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

const customTheme2 = createTheme({
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

function Reports() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.reports.pagination);
  const reports = useSelector((state) => state.reports.reports);
  const loading = useSelector((state) => state.reports.loading);

  const [values, setValues] = useState({
    status: ""
  })

  useEffect(() => {
    dispatch(
      searchReport({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const onPageChange = (page) => {
    dispatch(
      searchReport({
        page: page,
        limit: pagination.limit,
        status: values.status.trim() === "" ? null : values.status,
      })
    );
  };
      


  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <main className="flex relative">
        <Nav />
        <section className="w-full px-3 py-12 md:px-6 lg:px-16 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-auto overflow-x-auto">
          <article className="w-full pb-8 border-b-2 border-verdeD mb-8">
            <h3 className="font-barolw text-lg font-semibold px-3 py-1 text-RojoC mb-4 border-b-2 border-verdeD uppercase">
              Menu de filtrado
            </h3>
            <FilterReport values={values} setValues={setValues} />
          </article>
          
          {loading ? (
            <div className="w-full h-full items-center flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* sin notificaciones */}
              {reports.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  <div className="bg-Gris p-4 rounded-lg shadow-sm">
                    <p className="text-center font-barolw text-lg">
                      No hay reportes
                    </p>
                  </div>
                </div>
              ) : reports.length === 0 ? (
                <>
                  <h4 className="font-barolw text-lg font-semibold px-2 text-RojoC mb-4 uppercase">
                    No se encontraron reportes con ese filtrado
                  </h4>
                </>
              ) : (
                <>
                  <div className="w-full gap-6 justify-center flex-col flex">
                    {reports.map((item, key) => (
                      <CardReport key={key} item={item} />
                    ))}
                  </div>

                  {pagination.pages === 1 ? (
                    <></>
                  ) : (
                    <ThemeProvider theme={customTheme2}>
                      <Pagination
                        theme={customTheme2}
                        className="border-verdeD"
                        currentPage={pagination.page}
                        totalPages={pagination.pages}
                        onPageChange={onPageChange}
                      />
                    </ThemeProvider>
                  )}
                </>
              )}
            </>
          )}
        </section>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </main>
    </>
  );
}

export default Reports;