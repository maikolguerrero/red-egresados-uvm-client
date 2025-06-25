import { useDispatch, useSelector } from "react-redux";
import ButtonSmall from "../../Buttons/ButtonSmall";
import { useEffect, useState } from "react";
import { Label } from "flowbite-react";
import { editRoleCollaborator } from "../../../services/proyects/proyectService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

export function FormEditRole({collaborator}) {
  const dispatch = useDispatch();
  const proyect = useSelector((state) => state.proyects.proyectSelect);

  const [values, setValues] = useState({
    username: "",
    newRole: "member"
  });

  useEffect(() => {
    if (collaborator === undefined) {
      return;
    } else {
      setValues({
        username: collaborator.user.username,
        newRole: collaborator.role
      });
    }
  }, [collaborator]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.newRole.trim() === "") {
      return enqueueSnackbar("Debe seleccionar un rol valido", typeError);
    }
    if (values.username.trim() === "") {
      return enqueueSnackbar("Debe seleccionar un usuario valido", typeError);
    }

    dispatch(
      editRoleCollaborator({
        data: values,
        projectId: proyect.id,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-Negro font-barlow-semi-condensed uppercase">
          {"Editar Rol"}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col relative">
            <Label className="p-1 font-barlow-semi-condensed text-Negro text-sm">
              Rol del Colaborador:
            </Label>
            <select
              className={styles.input}
              min={0}
              name="newRole"
              value={values.newRole}
              onChange={handleInputChange}
            >
              <option value={"member"}>Miembro</option>
              <option value={"admin"}>Administrador</option>
            </select>
          </div>
        </div>
        <ButtonSmall
          className={"bg-verdeD hover:bg-RojoC"}
          text={"Editar Rol"}
        />
      </form>
    </>
  );
}
