import { FaKey } from "react-icons/fa";
import { ButtonSecurity } from "../../Components/Buttons/ButtonSecurity";
import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { MdAdminPanelSettings, MdEmail, MdReport, MdNotifications } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import { useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import FormEmail from "../../Components/Forms/config/FormEmail";
import FormResetPassword from "../../Components/Forms/config/FormResetPassword";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader";

function Config() {
  const role = useSelector((state) => state.auth.role);
  const loader = useSelector((state) => state.auth.loading);
  const [openEmail, setOpenEmail] = useState(false)
  const [openReset, setOpenReset] = useState(false)

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex relative">
        <Nav />
        {loader ? (
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
        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
          <h4 className="font-barlow-condensed text-xl font-bold uppercase">
            Opciones de Seguridad
          </h4>
          <div className="flex flex-col md:flex-row flex-wrap md:justify-center gap-6">
            <ButtonSecurity
              onClick={(e) => {
                setOpenReset(true);
              }}
              icono={<FaKey className="text-6xl" />}
              texto={"Cambio de Contraseña"}
            />
            <ButtonSecurity
              onClick={(e) => {
                setOpenEmail(true);
              }}
              icono={<MdEmail className="text-6xl" />}
              texto={"Cambio de Correo de la Cuenta"}
            />
            {role === "admin" || role === "superadmin" && (
              <>
                <ButtonSecurity
                  onClick={(e) => {
                    navigate("/config/reports");
                  }}
                  icono={<MdReport className="text-6xl" />}
                  texto={"Reportes"}
                />
              </>
            )}

            {role === "admin" || role === "superadmin" && (
              <>
                <ButtonSecurity
                  onClick={(e) => {
                    navigate("/config/graduates");
                  }}
                  icono={<FaGraduationCap className="text-6xl" />}
                  texto={"Agregar Egresados"}
                />
              </>
            )}

            {role === "admin" || role === "superadmin" && (
              <ButtonSecurity
                onClick={(e) => {
                  navigate("/config/notification");
                }}
                icono={<MdNotifications className="text-6xl" />}
                texto={"Enviar Notificación a Egresados"}
              />
            )}


            {role === "superadmin" && (
              <ButtonSecurity
                onClick={(e) => {
                  navigate("/config/admins");
                }}
                icono={<MdAdminPanelSettings className="text-6xl" />}
                texto={"Agregar Admins"}
              />
            )}
          </div>

          <ModalNotHeader
            openModal={openEmail}
            setOpenModal={setOpenEmail}
            size={"3xl"}
            component={<FormEmail />}
          />
          <ModalNotHeader
            openModal={openReset}
            setOpenModal={setOpenReset}
            size={"3xl"}
            component={<FormResetPassword />}
          />
        </div>

        <div className="absolute right-8 bottom-6">
          <ButtonMessages />
        </div>
      </div >
    </>
  );
}

export default Config;
