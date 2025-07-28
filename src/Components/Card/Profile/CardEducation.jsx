export function CardEducation({data}) {
  return (
    <>
      <article className="p-3">
        <div className="flex flex-col gap-1 font-barlow-semi-condensed text-sm">
          <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
            NIVEL DE EDUCACION
          </h4>
          <h5>
            <b>Institucion:</b> {data.institution}
          </h5>
          <h5>
            <b>Título:</b> {data.degree}
          </h5>
          {/* <h5>
            <b>Campo de Estudio:</b> {data.fieldOfStudy}
          </h5> */}
          {/* <h5>
            <b>Año de Inicio:</b>{" "}
            <span className="text-verdeB font-semibold">{data.startYear}</span>
          </h5> */}
          <h5>
            <b>Año de Graduación:</b>{" "}
            <span className="text-RojoB font-semibold">{data.endYear}</span>
          </h5>
        </div>
      </article>
    </>
  );
}