import Header from "../../Components/Header";
import Nav from "../../Components/Nav";
import ButtonBig from "../../Components/Buttons/ButtonBig";
import { useState } from "react";
import { ModalNotHeader } from "../../Components/Modals/ModalNotHeader";
import { useSelector } from "react-redux";
import { Loader } from "../../Components/Loader";
import { FormEgresadoPregrado } from "../../Components/Forms/admin/graduates/FormEgresadoPregrado";
import { FormEgresadoPostgrado } from "../../Components/Forms/admin/graduates/FormEgresadoPostgrado";

function ManageGraduates() {
    const loader = useSelector((state) => state.manageGraduates.loading);
    const loading = useSelector((state) => state.manageGraduates.loadingPage);

    const [modalPregrado, setModalPregrado] = useState(false);
    const [modalPostgrado, setModalPostgrado] = useState(false);

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
                                    text={"Egresados de Pregrado"}
                                    className={"bg-verdeC hover:bg-RojoC w-[250px]"}
                                    action={(e) => setModalPregrado(true)}
                                />
                                <ButtonBig
                                    text={"Egresados de Postgrado"}
                                    className={"bg-verdeC hover:bg-RojoC w-[250px]"}
                                    action={(e) => setModalPostgrado(true)}
                                />
                            </div>
                        </div>

                        <ModalNotHeader
                            openModal={modalPregrado}
                            setOpenModal={setModalPregrado}
                            size={"7xl"}
                            component={<FormEgresadoPregrado />}
                        />
                        <ModalNotHeader
                            openModal={modalPostgrado}
                            setOpenModal={setModalPostgrado}
                            size={"7xl"}
                            component={<FormEgresadoPostgrado />}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default ManageGraduates;
