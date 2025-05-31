import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { actived, desactived } from "../../features/authSlice";
import { resendEmailFetch } from "../../services/auth/authService";

let styles = {
  input:
    "w-full px-3 py-1.5 text-xs md:text-sm font-barolw rounded-lg border border-verdeA border-b-2",
  subtitle_form:
    "py-1 px-2 border-b-2 border-verdeC text-sm md:text-base font-barlow-condensed font-semibold",
};

function FormEmailVerify(props) {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(desactived())
  }

  const handleResend = (e) => {
    dispatch(resendEmailFetch({"email": auth.email}))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <p className="text-Negro text-base md:text-lg font-barlow-condensed font-medium text-center">
            Se te ha enviado un email a tu correo electrónico para <a className="text-RojoC">ACTIVAR</a> tu cuenta.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center text-Negro font-barolw font-bold text-xs md:text-sm lg:text-base text-center">
          <p className="font-barlow-condensed">
            ¿No te llegó el código?{" "}
            <button onClick={handleResend} type="button" className="text-verdeC">
              Reenviar Código.
            </button>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          <Button className={"w-full"} text="YA ME VERIFIQUÉ" />
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default FormEmailVerify;