
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "flowbite-react";
import ButtonSmall from "../../../Buttons/ButtonSmall";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../../../../models/alertModels";
import { sendNotification } from "../../../../services/admin/sendNotificationService";

let styles = {
    input:
        "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
    subtitle_form:
        "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormNotification() {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.message.trim() === "") {
            return enqueueSnackbar("No puedes enviar una notificación vacía", typeError);
        }

        dispatch(sendNotification(values));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
                    {"Envio de notificaciones a los egresados"}
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
                            name="message"
                            value={values.message}
                            onChange={handleInputChange}
                            placeholder="Texto de la notificación..."
                        />
                    </div>
                </div>
                <ButtonSmall
                    className={"bg-verdeD hover:bg-RojoC"}
                    text={"Enviar Notificación"}
                />
            </form>
        </>
    );
}