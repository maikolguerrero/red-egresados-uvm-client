import { IoIosAddCircle } from "react-icons/io";

export function ButtonAdd({openModal, setOpenModal}) {
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="p-3 rounded-full border border-verdeD text-verdeD bg-Blanco relative hover:bg-Gris"
      >
        <IoIosAddCircle className="text-2xl" />
      </button>
    </>
  );
}