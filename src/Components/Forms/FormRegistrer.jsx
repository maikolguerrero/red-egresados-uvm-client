import Button from "../Buttons/Button";
import { Link } from "react-router-dom";

let styles = {
    input: "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
    subtitle_form: "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold"
}

function FormRegister(props) {
  return (
    <>
      <form onSubmit={(e) => (
        e.preventDefault()
      )} className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>
            DATOS PERSONALES
          </h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Nombres"
              />
            </div>
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="lastname"
                placeholder="Apellidos"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="text"
                name="ci"
                placeholder="Cédula"
              />
              <input
                className={styles.input}
                type="date"
                name="date"
                placeholder="Fecha de Nacimiento"
              />
            </div>
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="w-full flex relative">
              <textarea
                className={styles.input}
                type="text"
                name="location"
                placeholder="Ubicación"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>
            DATOS UNIVERSITARIOS
          </h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="mention"
                placeholder="Mención"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="number"
                name="record"
                placeholder="N° Expediente"
              />
              <input
                className={styles.input}
                type="date"
                name="graduation"
                placeholder="Fecha de Grado"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className={styles.subtitle_form}>
            DATOS DE USUARIO
          </h4>
          <div className="flex flex-col gap-3">
            <div className="w-full flex relative">
              <input
                className={styles.input}
                type="text"
                name="username"
                placeholder="Usuario"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Contraseña"
              />
              <input
                className={styles.input}
                type="password"
                name="passwordConfirm"
                placeholder="Confirmar Contraseña"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="">
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="text-verdeC">
              Inicia Sesión Aquí.
            </Link>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="REGISTRARME" />
        </div>
      </form>
    </>
  );
}

export default FormRegister;
