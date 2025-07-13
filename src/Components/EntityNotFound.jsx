import { Link } from "react-router-dom";

export default function EntityNotFound({ entity, entityPath }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10.5vh-100px)] text-center px-4">
            <p className="text-2xl font-bold text-verdeA mb-2">
                {entity} no encontrado
            </p>
            <p className="text-center text-sm md:text-base text-verdeC">
                Lo sentimos, parece que el {entity} que estás buscando no
                existe.{" "}
                <Link
                    to={entityPath}
                    className="text-verdeA underline"
                >
                    Regresar a la lista de {entity}s
                </Link>
            </p>
        </div>
    )
}
