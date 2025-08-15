import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
import { getAdmins } from "../../services/admin/adminsService";
import { CardAdmin } from "../../Components/Card/CardAdmin";
import { ButtonAdd } from "../../Components/Buttons/ButtonAdd";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { FormAddAdmin } from "../../Components/Forms/admin/FormAddAdmin";
import Paginations from "../../Components/Paginations";

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
              <section className="flex gap-6 flex-wrap justify-center">
                {admins.map((item, key) => (
                  <CardAdmin key={key} admin={item} />
                ))}
              </section>

              {pagination.pages > 1 && (
                <Paginations
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={onPageChange}
                />
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