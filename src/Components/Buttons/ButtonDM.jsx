export function ButtonDM({onClick}) {
  return (
    <>
      <button className="px-4 py-2 w-full bg-Blanco flex items-center gap-3 hover:bg-Gris ">
        <img
          className="rounded-full w-6 md:w-6 xl:w-8"
          src="https://www.clarin.com/img/2024/07/04/uteodLeuh_600x600__1.jpg"
          alt="Foto de Perfil"
        />
        <h6 className="text-Negro font-barlow-semi-condensed font-medium">Maria Colmenares</h6>
      </button>
    </>
  );
}