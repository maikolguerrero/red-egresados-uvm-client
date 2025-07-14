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
            {loading ? (
                <main className="min-h-[89.5vh] w-full flex justify-center items-center">
                    <Loader />
                </main>
            ) : (
                <>
                    {loader ? (
                        <div className="relative h-full w-full flex justify-center items-center">
                            <Loader />
                        </div>
                    ) : (
                        <></>
                    )}
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

                    <ModalNotHeader
                        openModal={modalSendNotification}
                        setOpenModal={setModalSendNotification}
                        size={"xl"}
                        component={<FormNotification />}
                    />
                </>
            )}
        </>
    );
}
