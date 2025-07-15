import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { ModalNotHeader } from "../../../Modals/ModalNotHeader";
import { ErrorsDetailsModal } from "./ErrorsDetailsModal";
import notify from "../../../../utils/notifications";
import { addGraduatesPostgrado } from "../../../../services/admin/graduatesService";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from 'flowbite-react';
import CsvFormatExample from './CsvFormatExample';

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

export function FormEgresadoPostgrado() {
    const dispatch = useDispatch();
    const { egresadosPostgrado } = useSelector((state) => state.manageGraduates);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            notify.error("No se ha seleccionado una archivo", false);
        } else {
            const formData = new FormData();
            formData.append("file", file);
            dispatch(addGraduatesPostgrado(formData))
        }
    };

    const hasErrors = egresadosPostgrado?.errorDetails?.length > 0;

    return (
        <>
            <div className="flex flex-col gap-4">
                <form className="flex flex-col gap-5 border-b-2 border-verdeD pb-8">
                    <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
                        Agregar Egresados de Postgrado
                    </h5>
                    <div className="flex flex-col gap-1">
                        <Label className="mb-2 block" htmlFor="small-file-upload">
                            Selecciona el archivo:
                        </Label>
                        <FileInput
                            onChange={onFileChange}
                            id="small-file-upload"
                            sizing="sm"
                            accept=".csv"
                        />
                        <CsvFormatExample type="postgrado" />
                    </div>

                    <ButtonSmall
                        action={handleSubmit}
                        className={"bg-verdeA hover:bg-RojoC"}
                        text={"GUARDAR EGRESADOS DE POSTGRADO"}
                    />
                </form>

                {/* Sección de resultados */}
                {egresadosPostgrado?.total && (
                    <div className="mt-6 p-4 bg-Gris rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Resultados del Procesamiento</h3>

                        {/* Resumen */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white p-3 rounded shadow">
                                <p className="text-sm text-black">Total</p>
                                <p className="text-xl font-bold">{egresadosPostgrado.total}</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow">
                                <p className="text-sm text-gray-500">Insertados</p>
                                <p className="text-xl font-bold text-verdeB">{egresadosPostgrado.inserted}</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow">
                                <p className="text-sm text-gray-500">Duplicados</p>
                                <p className="text-xl font-bold text-yellow-400">{egresadosPostgrado.duplicates}</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow">
                                <p className="text-sm text-gray-500">Errores</p>
                                <p className="text-xl font-bold text-RojoC">{egresadosPostgrado.validationErrors + egresadosPostgrado.dbErrors}</p>
                            </div>
                        </div>

                        {/* Botón para ver detalles de errores */}
                        {hasErrors && (
                            <div className="flex justify-center mt-4">
                                <ButtonSmall
                                    action={() => setShowErrorsModal(true)}
                                    className={"bg-verdeA hover:bg-RojoC "}
                                    text={"Ver detalles de errores y duplicados"}
                                />
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Modal para detalles */}
            <ModalNotHeader
                size="7xl"
                openModal={showErrorsModal}
                setOpenModal={setShowErrorsModal}
                component={
                    <ThemeProvider theme={customTheme}>
                        <ErrorsDetailsModal errors={egresadosPostgrado?.errorDetails || []} />
                    </ThemeProvider>
                }
            />
        </>
    );
}