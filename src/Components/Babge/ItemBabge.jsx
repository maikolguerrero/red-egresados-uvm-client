import { IoCloseOutline } from "react-icons/io5";

export function ItemBabge({text, onClick}) {

  return (
    <>
      <span className="flex justify-between p-2 bg-verdeC rounded-md text-sm text-white items-center">
        <p>{text}</p>
        <IoCloseOutline className="text-xl text-white hover:cursor-pointer" />
      </span>
    </>
  );
}