import React from 'react'

export default function AcademicRequests() {
    return (
        <div className="text-center text-sm text-Negro mt-6 mb-10 w-[80%] md:w-[60%] lg:w-[40%]"> {/* Ajusta el ancho para que coincida con la sección del formulario */}
        <p>
            Para tramitar solicitudes académicas, pueden contactarnos a través del correo:
            <br /> {/* Salto de línea para mejor legibilidad en móviles */}
            <a href="mailto:solicitudesacademicas@uvm.edu.ve" className="text-verdeC hover:underline font-medium">
                solicitudesacademicas@uvm.edu.ve
            </a>
        </p>
    </div>
  )
}
