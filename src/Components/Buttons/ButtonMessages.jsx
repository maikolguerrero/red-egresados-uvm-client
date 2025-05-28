import { MdMessage } from "react-icons/md";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState } from "react";
import { ButtonDM } from "./ButtonDM";

export function ButtonMessages({onClick}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full border border-verdeD text-verdeD bg-Blanco relative hover:bg-Gris"
      >
        <MdMessage className="text-2xl" />
      </button>

      <Drawer
        className="p-0"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <DrawerHeader
          className="p-4 text-Negro font-barlow-condensed uppercase"
          titleIcon={MdMessage}
          title="Mensajes Directos"
        />
        <DrawerItems className="p-0">
          <ButtonDM />
          <ButtonDM />
          <ButtonDM />
          <ButtonDM />
        </DrawerItems>
      </Drawer>
    </>
  );
}