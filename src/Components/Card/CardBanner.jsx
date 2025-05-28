import { Banner, BannerCollapseButton, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import ButtonSmall from "../Buttons/ButtonSmall";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { PiProjectorScreenChartBold } from "react-icons/pi";

export function CardBanner({type, noti}) {
    let typeSelect = "";
    let logo = ""

    switch (type) {
        case "Proyectos":
            typeSelect = "PROYECTOS";
            logo = <PiProjectorScreenChartBold className="w-6 h-6" />
        break;
        case "Eventos":
            typeSelect = "EVENTOS";
            logo = <BsCalendarDate className="w-6 h-6" />
        break;
        case "Foros":
            typeSelect = "FOROS";
            logo = <FaPeopleGroup className="w-6 h-6" />
        break;
    }
  return (
    <Banner>
      <div className="flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border border-verdeD bg-Gris p-4 shadow-sm md:flex-row lg:max-w-7xl">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <div
            className="mb-2 flex gap-3 items-center border-verdeC md:mb-0 md:mr-4 md:border-r md:pr-4 dark:border-gray-600"
          >
            {logo}
            <span className="self-center whitespace-nowrap text-lg font-semibold md:pr-6 dark:text-white">
              {typeSelect}
            </span>
          </div>
          <p className="flex items-center text-sm font-normal text-Negro">
            {noti}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <ButtonSmall text={"Ver..."} className={"bg-verdeC hover:bg-RojoC"} />
          <button color="gray" className="border-0 bg-transparent text-RojoC">
            <HiX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Banner>
  );
}