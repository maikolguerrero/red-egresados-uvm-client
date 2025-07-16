export function CardCertification({data}) {
  return (
    <>
      <article className="p-3">
        <div className="flex flex-col gap-1 font-barlow-semi-condensed text-sm">
          <h4 className="py-1 px-2 border-b-2 mb-6 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold">
            CERTIFICADO
          </h4>
          <h5>
            <b>Nombre:</b> {data.name}
          </h5>
          <h5>
            <b>Organizacion:</b> {data.issuingOrganization}
          </h5>
          <h5>
            <b>Fecha de Obtencion:</b>{" "}
            <span className="text-verdeB font-semibold">{data.issueDate.split("T")[0]}</span>
          </h5>
          <h5>
            <b>ID:</b> {data.credentialID}
          </h5>
          <h5>
            <b>Enlace:</b>{" "}
            <a
              href={data.credentialURL}
              target="_blank"
              className="text-RojoC font-semibold cursor-pointer"
            >
              Ver certificado
            </a>
          </h5>
        </div>
      </article>
    </>
  );
}