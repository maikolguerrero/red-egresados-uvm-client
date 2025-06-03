import { IoCloseOutline } from "react-icons/io5";

export function Skills({text, onClick}) {
  return (
    <>
        <div className="flex gap-2 p-2 bg-verdeD rounded-md text-sm text-white items-center">
            <p>{text}</p>
            <IoCloseOutline className="text-xl text-white hover:cursor-pointer" />
        </div>
    </>
  );
}