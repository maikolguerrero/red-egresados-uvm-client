import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import socketService from "../services/socket/socket.service";
import { Loader } from "../Components/Loader";
import Error404 from "../views/Error404";

function ProtectedRoute({ children }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const sessionActive = useSelector((state) => state.auth.sessionActive);
  const { isConnected } = useSelector((state) => state.socket);
  const authLoading = useSelector((state) => state.auth.loading); // Asegúrate de tener esto en tu estado

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const role = useSelector((state) => state.auth.role);
  const [error404, setError404] = useState(false);

  useEffect(() => {
    setError404(false);
    if (isCheckingAuth) {
      // Redirigir si estas en rutas de admins y no lo eres
      if (
        currentPath === "/config/reports" ||
        currentPath === "/config/notification" ||
        currentPath === "/config/graduates" ||
        currentPath === "/config/admins" ||
        currentPath === "/content-manager" ||
        currentPath === "/content-manager/landing" ||
        currentPath === "/content-manager/home" ||
        currentPath === "/content-manager/academic-requests"
      ) {
 
        if ((role !== "admin" && role !== "superadmin") || !role) {
          setError404(true);
        }
      }
    }

    // Solo actuar cuando la verificación de autenticación haya terminado
    if (!authLoading) {
      setIsCheckingAuth(false);

      if (sessionActive) {
        // Conectar socket si no está conectado
        if (!isConnected) {
          socketService.connect();
        }

        // Redirigir si estas en rutas de admins y no lo es
        if (
          currentPath === "/config/reports" ||
          currentPath === "/config/notification" ||
          currentPath === "/config/graduates" ||
          currentPath === "/config/admins" ||
          currentPath === "/content-manager" ||
          currentPath === "/content-manager/landing" ||
          currentPath === "/content-manager/home" ||
          currentPath === "/content-manager/academic-requests"
        ) {
          if ((role !== "admin" && role !== "superadmin") || !role) {
            setError404(true);
          }
        }

        // Redirigir si está en rutas de autenticación
        if (
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === "/register" ||
          currentPath === "/verify-alumni" ||
          currentPath === "/recover-password" ||
          currentPath === "/verify-email" ||
          currentPath === "/recover/change-email"
        ) {
          navigate("/landing");
        }


      } else {
        // Desconectar socket si está conectado
        if (isConnected) {
          socketService.disconnect();
        }

        // Permitir rutas de autenticación sin redirigir
        if (
          currentPath !== "/verify-alumni" &&
          currentPath !== "/login" &&
          currentPath !== "/register" &&
          currentPath !== "/recover-password" &&
          currentPath !== "/verify-email" &&
          currentPath !== "/verify-email-change" &&
          currentPath !== "/reset-password" &&
          currentPath !== "/recover/change-email"
        ) {
          if (currentPath === "/") {
            navigate("/verify-alumni");
          } else {
            navigate("/login");
          }
        }
      }
    }
  }, [sessionActive, currentPath, navigate, isConnected, authLoading]);

  // Mostrar un loader mientras se verifica la autenticación
  if (isCheckingAuth) {
    return <div className="flex items-center justify-center h-screen"><Loader /></div>;
  }

  return error404 ? <Error404 /> : children;
}

export default ProtectedRoute;