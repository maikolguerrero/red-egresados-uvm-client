import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const sessionActive = useSelector((state) => state.auth.sessionActive);

  const navigate = useNavigate();
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    if (sessionActive) {
      console.log(sessionActive);
      console.log(currentPath);
      if (
        currentPath === "/login" ||
        currentPath === "/register" ||
        currentPath === "/recover-password"
      ) {
        navigate("/landing");
      } else {
        return;
      }
    } else {
      navigate("/login");
    }
  }, [sessionActive]);

return children;
}

export default ProtectedRoute;