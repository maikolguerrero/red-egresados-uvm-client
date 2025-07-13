import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import { ButtonMessages } from "../../Components/Buttons/buttonMessages";
import ButtonBig from "../../Components/Buttons/ButtonBig";
import { useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
import { FormNotification } from "../../Components/Forms/admin/notification/FormNotification";

export default function SendNotification() {
    const loader = useSelector((state) => state.sendNotification.loading);
    const loading = useSelector((state) => state.sendNotification.loadingPage);

    const [modalSendNotification, setModalSendNotification] = useState(false);

    return (
        <>
            <Header />
            <div className="h-[10.5vh]"></div>

            <div className="flex relative">
                <Nav />
                {loading ? (
                    <main className="min-h-[89.5vh] w-full flex justify-center items-center">
                        <Loader />
                    </main>
                ) : (
                    <>
                        {loader ? (
                            <div className="fixed bg-black bg-opacity-70 inset-x-0 top-0 z-[100] h-screen overflow-y-hidden overflow-x-hidden md:inset-0 md:h-full">
                                <div className="relative h-full w-full flex justify-center items-center">
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="w-full px-3 py-12 md:px-6 gap-8 flex flex-col items-center h-[89.5vh] overflow-y-scroll overflow-x-auto">
                            <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase">
                                Selecciona una opción de configuración
                            </h4>
                            <div className="flex flex-wrap justify-center gap-6">
                                <ButtonBig
                                    text={"Enviar Notificación a Todos los egresados"}
                                    className={"bg-verdeC hover:bg-RojoC w-[250px]"}
                                    action={(e) => setModalSendNotification(true)}
                                />
                            </div>
                        </div>

                        <ModalNotHeader
                            openModal={modalSendNotification}
                            setOpenModal={setModalSendNotification}
                            size={"xl"}
                            component={<FormNotification />}
                        />

                        <div className="absolute right-8 bottom-6">
                            <ButtonMessages />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
