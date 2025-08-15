import { Card, Dropdown, DropdownItem } from "flowbite-react";
import ButtonSmall from "../Buttons/ButtonSmall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import BadgeNormal from "../Buttons/BadgeNormal";
import { deleteAdmin } from "../../services/admin/adminsService";

export function CardAdmin({ admin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const deleteAdmins = (e) => {
    dispatch(deleteAdmin({
      username: admin.username
    }))
  }

  return (
    <>
      <Card className="w-[275px] bg-Gris border-verdeD">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center text-center pb-10">
          {admin?.profilePicture?.url === null ? (
            // Si no hay foto, muestra la inicial circular
            <div className="mb-3 w-24 h-24 rounded-full bg-verdeA flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
              <span className="text-white text-4xl font-bold">
                {admin?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Si hay foto, muéstrala circular
            <img
              alt="Foto Perfil"
              height="96" // w-24 es 96px
              src={admin?.profilePicture?.url}
              width="96" // h-24 es 96px
              className="mb-3 rounded-full shadow-lg object-cover"
            />
          )}
          <h5 className="mb-1 text-xl font-medium font-barolw text-negro ">
            {admin?.fullName}
          </h5>
          <h6 className="text-xs lg:text-base font-barlow-semi-condensed font-semibold text-black">
            @{admin?.username}
          </h6>

          <span className="text-sm font-medium font-barolw text-verdeB">
            {admin?.email}
          </span>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            {auth.username === admin?.username ? (
              <>
                <span className="text-sm font-semibold font-barolw text-Negro">
                  (TU)
                </span>
              </>
            ) : (
              <>
                <ButtonSmall
                  text={"Eliminar Admin"}
                  className={"bg-verdeC hover:bg-RojoC"}
                  action={deleteAdmins}
                />
              </>
            )}
          </div>
        </div>
      </Card>

    </>
  );
}
