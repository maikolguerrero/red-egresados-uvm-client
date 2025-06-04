export function CardExperience({data}) {
  return (
    <>
      <article className="p-3">
        <div className="flex flex-col gap-1 font-barlow-semi-condensed text-sm">
          <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
            EXPERIENCIA LABORAL
          </h4>
          <h5>
            <b>Empresa:</b> {data.company}
          </h5>
          <h5>
            <b>Puesto:</b> {data.position}
          </h5>
          <h5>
            <b>Descripcion:</b> {data.description}
          </h5>
          <h5>
            <b>Fecha de Inicio:</b>{" "}
            <span className="text-verdeB font-semibold">{data.startDate.split("T")[0]}</span>
          </h5>
          <h5>
            <b>Fecha de finalizacion:</b>{" "}
            <span className="text-RojoB font-semibold">{data.endDate.split("T")[0]}</span>
          </h5>
          <h5>
            <b>Continua actualmente:</b>{" "}
            <span className="text-Negro font-semibold">{data.current ? "SI" : "NO"}</span>
          </h5>
        </div>
      </article>
    </>
  );
}