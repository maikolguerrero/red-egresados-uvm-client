import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { typeError } from "../../../../models/alertModels";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { updateContentAcademicRequests, getContentAcademicRequests } from "../../../../services/admin/academicRequestsService";

let styles = {
    input:
        "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
    subtitle_form:
        "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormAcademicRequest({ academicRequests }) {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        text: "",
        email: "",
    });

    useEffect(() => {
        if (academicRequests) {
            setValues(academicRequests);
        }
    }, [academicRequests]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.text.trim() === "") {
            return enqueueSnackbar("No puedes actualizar un texto vacío", typeError);
        }
        if (values.email.trim() === "") {
            return enqueueSnackbar("No puedes actualizar un email vacío", typeError);
        }
        const sendAcademicRequests = {
            academicRequests: {
                text: values.text,
                email: values.email,
            }
        };
        alert(JSON.stringify(sendAcademicRequests));
        dispatch(updateContentAcademicRequests(sendAcademicRequests));
        // dispatch(getContentAcademicRequests());
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
                    {"Configuración de las solicitudes académicas"}
                </h5>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-col relative">
                        <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                            Texto
                        </Label>
                        <textarea
                            rows={10}
                            className={styles.input}
                            type="text"
                            name="text"
                            value={values.text}
                            onChange={handleInputChange}
                            placeholder="Texto de las solicitudes académicas..."
                        />
                    </div>
                    <div className="w-full flex flex-col relative">
                        <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
                            Email
                        </Label>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            placeholder="Email de las solicitudes académicas..."
                        />
                    </div>
                </div>
                <ButtonSmall
                    className={"bg-verdeD hover:bg-RojoC"}
                    text={"Actualizar Solicitud Académica"}
                />
            </form>
        </>
    );
}