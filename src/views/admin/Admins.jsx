import { useEffect, useState } from "react";
import { createTheme, Pagination, ThemeProvider } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
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

      <div className="absolute flex flex-col gap-2 right-8 bottom-6 mb-16">
        {role === "superadmin" && (
          <ButtonAdd setOpenModal={setOpenAddAdmin} />
        )}
      </div>

      <ModalNotHeader
        openModal={openAddAdmin}
        setOpenModal={setOpenAddAdmin}
        size={"3xl"}
        component={
          <FormAddAdmin />
        }
      />
    </>
  );
}

export default Admins;