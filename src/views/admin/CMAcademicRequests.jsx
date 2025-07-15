import ButtonBig from "../../Components/Buttons/ButtonBig";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { useDispatch, useSelector } from "react-redux";
import { getContentAcademicRequests } from "../../services/admin/academicRequestsService";
import { Loader } from "../../Components/Loader";
import { FormAcademicRequest } from "../../Components/Forms/admin/academicRequest/FormAcademicRequest";

function CMAcademicRequests() {
    const dispatch = useDispatch();
    const academicRequests = useSelector((state) => state.academicRequests.academicRequests);
    const loader = useSelector((state) => state.academicRequests.loading);
    const loading = useSelector((state) => state.academicRequests.loadingPage);

    const [modalAcademicRequest, setModalAcademicRequest] = useState(false);

    useEffect(() => {
        dispatch(getContentAcademicRequests())
    }, []);

    return (
        <>
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

                    <h4 className="font-barlow-condensed text-xl text-center font-bold uppercase">
                        Selecciona una opción de configuración
                    </h4>
                    <div className="flex flex-wrap justify-center gap-6">
                        <ButtonBig
                            text={"Sección de info de solicitudes académicas"}
                            className={"bg-verdeC hover:bg-RojoC w-[250px]"}
                            action={(e) => setModalAcademicRequest(true)}
                        />
                    </div>

                    <ModalNotHeader
                        openModal={modalAcademicRequest}
                        setOpenModal={setModalAcademicRequest}
                        size={"xl"}
                        component={<FormAcademicRequest academicRequests={academicRequests} />}
                    />
                </>
            )}
        </>
    );
}

export default CMAcademicRequests;
