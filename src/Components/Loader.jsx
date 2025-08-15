import { Spinner } from "flowbite-react";

export function Loader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Spinner color="success" aria-label="Success spinner example" size="lg" />
      <h6 className="uppercase font-barolw text-verdeB font-medium">
        Cargando...
      </h6>
    </div>
  );
}