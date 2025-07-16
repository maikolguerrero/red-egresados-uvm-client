import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Badge,
} from "flowbite-react";
import { useState } from "react";
import Paginations from "../../../Paginations";

export function ErrorsDetailsModal({ errors = [] }) {
    // Configuración de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular datos paginados
    const totalPages = Math.ceil(errors.length / itemsPerPage);
    const paginatedErrors = errors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 ">
                Detalle de Errores
            </h3>

            {/* Tabla compacta */}
            <div className="overflow-x-auto border rounded-lg">
                <Table hoverable className="text-sm">
                    <TableHead className="sticky top-0 text-verdeC">
                        <TableRow>
                            <TableHeadCell className="px-3 py-2">Línea</TableHeadCell>
                            <TableHeadCell className="px-3 py-2">Tipo</TableHeadCell>
                            <TableHeadCell className="px-3 py-2">Error</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {paginatedErrors.map((error, index) => (
                            <TableRow key={index} className="bg-white ">
                                <TableCell className="px-3 py-2 text-black">{error.line}</TableCell>
                                <TableCell className="px-3 py-2">
                                    <Badge
                                        // color={error.code === 'VALIDATION_ERROR' ? 'failure' : 'warning'}
                                        className={error.code === 'VALIDATION_ERROR'
                                            ? 'bg-RojoB text-white' // Clase de Tailwind para fondo rojo y texto blanco
                                            : 'bg-yellow-300 text-black' // Clase de Tailwind para fondo amarillo y texto gris oscuro
                                        }
                                        size="sm"
                                    >
                                        {error.code}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-3 py-2 text-RojoA">
                                    <div className="line-clamp-1 hover:line-clamp-none">
                                        {error.error}
                                    </div>
                                    <div className="text-xs text-black mt-1 truncate hover:whitespace-normal">
                                        {typeof error.record === 'string'
                                            ? error.record
                                            : JSON.stringify(error.record)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación simple */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-2">
                    <Paginations
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}