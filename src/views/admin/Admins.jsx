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
import { getAdmins } from "../../services/admin/adminsService";
import { CardAdmin } from "../../Components/Card/CardAdmin";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddAdmin } from "../../Components/Forms/admin/FormAddAdmin";

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
      active: "bg-cyan-50 text-RojoC hover:bg-white hover:text-verdeD",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
});

function Admins() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const pagination = useSelector((state) => state.admins.pagination);
  const admins = useSelector((state) => state.admins.admins);
  const loading = useSelector((state) => state.admins.loading);

  const [values, setValues] = useState({
    status: ""
  })
  const [openAddAdmin, setOpenAddAdmin] = useState(false)

  useEffect(() => {
    dispatch(
      getAdmins({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const onPageChange = (page) => {
    dispatch(
      getAdmins({
        page: page,
        limit: pagination.limit,
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

          {loading ? (
            <div className="w-full h-full items-center flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* sin notificaciones */}
              {admins.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  <div className="bg-Gris p-4 rounded-lg shadow-sm">
                    <p className="text-center font-barolw text-lg">
                      No hay admins
                    </p>
                  </div>
                </div>
              ) : admins.length === 0 ? (
                <>
                  <div className="w-full flex justify-center items-center">
                    <div className="bg-Gris p-4 rounded-lg shadow-sm">
                      <p className="text-center font-barolw text-lg">
                        No se encontraron admins con ese filtrado
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full gap-6 justify-center flex-row flex">
                    {admins.map((item, key) => (
                      <CardAdmin key={key} admin={item} />
                    ))}
                  </div>

                  {pagination.pages == 1 ? (
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

        <div className="absolute flex flex-col gap-2 right-8 bottom-6">
          {role === "superadmin" ? (
            <ButtonAdd setOpenModal={setOpenAddAdmin} />
          ) : (
            <></>
          )}
          <ButtonMessages />
        </div>

        <ModalNotHeader
          openModal={openAddAdmin}
          setOpenModal={setOpenAddAdmin}
          size={"3xl"}
          component={
            <FormAddAdmin />
          }
        />
      </main>
    </>
  );
}

export default Admins;