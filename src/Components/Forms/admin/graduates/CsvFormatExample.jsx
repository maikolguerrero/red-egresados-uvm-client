import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const CsvFormatExample = ({ type = 'pregrado' }) => {
    const [showExample, setShowExample] = useState(false);

    // Configuración específica para cada tipo
    const config = {
        pregrado: {
            title: "Formato para Pregrado",
            headers: [
                { text: "NOMBRES Y APELLIDOS", color: "text-blue-600" },
                { text: "CEDULA", color: "text-green-600" },
                { text: "NOMBRE CARRERA", color: "text-purple-600" },
                { text: "ACTA DE GRADO", color: "text-red-600" },
                { text: "FECHA DE GRADO", color: "text-yellow-600" },
                { text: "NRO.ASIGNADO", color: "text-pink-600" },
                { text: "TOMO", color: "text-indigo-600" },
                { text: "FOLIO", color: "text-teal-600" }
            ],
            examples: [
                {
                    data: [
                        { text: "PEDRO ANDRES PEREZ LOPEZ", color: "text-blue-600" },
                        { text: "V-12345678", color: "text-green-600" },
                        { text: "Ingeniero de Computación", color: "text-purple-600" },
                        { text: "1", color: "text-red-600" },
                        { text: "5/12/2024", color: "text-yellow-600" },
                        { text: "1", color: "text-pink-600" },
                        { text: "III", color: "text-indigo-600" },
                        { text: "3", color: "text-teal-600" }
                    ]
                }
            ],
            notes: [
                "El archivo debe estar en formato CSV con codificación UTF-8",
                "Los campos deben estar separados por punto y coma (;)",
                "La primera línea debe contener los nombres de las columnas (esta primera línea no se toma en cuenta al analizar los datos, es solo para orientación)",
                "La cédula debe tener formato V-XXXXXXXX o E-XXXXXXXX",
                "Las fechas deben estar en formato DD/MM/AAAA"
            ]
        },
        postgrado: {
            title: "Formato para Postgrado",
            headers: [
                { text: "NOMBRES Y APELLIDOS", color: "text-blue-600" },
                { text: "CEDULA", color: "text-green-600" },
                { text: "NOMBRE PROGRAMA", color: "text-purple-600" },
                { text: "ACTA DE GRADO", color: "text-red-600" },
                { text: "FECHA DE GRADO", color: "text-yellow-600" },
                { text: "NRO. ASIGNADO", color: "text-pink-600" },
                { text: "TOMO", color: "text-indigo-600" },
                { text: "FOLIO", color: "text-teal-600" }
            ],
            examples: [
                {
                    data: [
                        { text: "MARIA ANDREA GONZALEZ VARELA", color: "text-blue-600" },
                        { text: "V-12345678", color: "text-green-600" },
                        { text: "ESPECIALISTA EN PLANIFICACION Y EVALUACION EDUCACIONAL", color: "text-purple-600" },
                        { text: "1", color: "text-red-600" },
                        { text: "15/07/2022", color: "text-yellow-600" },
                        { text: "1", color: "text-pink-600" },
                        { text: "III", color: "text-indigo-600" },
                        { text: "3", color: "text-teal-600" }
                    ]
                }
            ],
            notes: [
                "El archivo debe estar en formato CSV con codificación UTF-8",
                "Los campos deben estar separados por punto y coma (;)",
                "La primera línea debe contener los encabezados (esta primera línea no se toma en cuenta al analizar los datos, es solo para orientación)",
                "Formato de cédula: V-XXXXXXXX o E-XXXXXXXX",
                "Fecha en formato DD/MM/AAAA"
            ]
        }
    };

    const { title, headers, examples, notes } = config[type];

    return (
        <div className="mt-4">
            <button
                type="button"
                onClick={() => setShowExample(!showExample)}
                className="text-verdeB hover:text-verdeC text-sm font-medium flex items-center"
            >
                {showExample ? 'Ocultar ejemplo' : `Mostrar formato ${type}`}
                <FaChevronDown
                    className={`ml-1 transition-transform ${showExample ? 'rotate-180' : ''}`}
                    size={14}
                />
            </button>

            {showExample && (
                <div className="mt-2 bg-Gris p-4 rounded-lg border border-verdeA">
                    <h4 className="font-semibold text-sm mb-2">{title} (separado por punto y coma):</h4>
                    <div className="text-xs font-mono space-y-1">
                        {/* Encabezados */}
                        <div className="bg-white p-2 rounded">
                            {headers.map((header, index) => (
                                <span key={index} className={`${header.color} font-bold`}>
                                    {header.text}
                                    {index < headers.length - 1 ? ";" : ""}
                                </span>
                            ))}
                        </div>

                        {/* Ejemplos */}
                        {examples.map((example, exIndex) => (
                            <div key={exIndex} className="bg-white p-2 rounded">
                                {example.data.map((item, itemIndex) => (
                                    <span key={itemIndex} className={item.color}>
                                        {item.text}
                                        {itemIndex < example.data.length - 1 ? ";" : ""}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Notas */}
                    <div className="mt-2 text-xs text-gray-500">
                        <p className="font-semibold">Notas:</p>
                        <ul className="list-disc pl-5">
                            {notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CsvFormatExample;