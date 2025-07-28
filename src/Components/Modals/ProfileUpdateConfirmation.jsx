
import { ModalNotHeader } from "./ModalNotHeader";
import Button from "../Buttons/Button";

export default function ProfileUpdateConfirmation({ showConfirmation, setShowConfirmation, handleConfirmSubmit }) {
    return (
        <ModalNotHeader
            openModal={showConfirmation}
            setOpenModal={setShowConfirmation}
            size={"lg"}
            component={
                <div className="p-4">
                    <h4 className="text-lg font-bold mb-4">Confirmación de Actualización</h4>
                    <div className="flex flex-col gap-4 mb-6">
                        <p>
                            Al actualizar su perfil en la Red de Egresados UVM, usted acepta que la información
                            proporcionada será visible para la comunidad universitaria (egresados y autoridades
                            de la UVM). Este espacio está diseñado para fortalecer su red de contactos y
                            oportunidades profesionales.

                        </p>
                        <p>
                            Si desea limitar la visibilidad de algún campo para los demás egresados, donde
                            únicamente será visible para las autoridades de la UVM, puede ajustarlo en cada
                            uno de los formalarios para actualizar su perfil.
                        </p>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            action={() => setShowConfirmation(false)}
                            className={"bg-verdeA hover:bg-RojoC"}
                            text="Cancelar"
                        />
                        <Button
                            action={handleConfirmSubmit}
                            className={"bg-verdeD hover:bg-verdeB"}
                            text="Confirmar y Publicar"
                        />
                    </div>
                </div>
            }
        />
    )
}
