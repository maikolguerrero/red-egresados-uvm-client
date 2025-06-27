import { useState, useEffect } from 'react';

// Define el breakpoint por defecto, puedes ajustarlo si lo necesitas
const MOBILE_BREAKPOINT = 768; // Por ejemplo, el 'md' de Tailwind CSS

function useIsMobile() {
  // Función para determinar si es móvil.
  // Combinar User Agent (para una primera indicación) con el ancho de la ventana.
  const checkIsMobile = () => {
    const userAgent = navigator.userAgent || window.opera;
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);

    // Si el User Agent indica móvil, lo consideramos móvil.
    // De lo contrario, nos basamos en el ancho de la ventana.
    // Esto es útil para casos donde un User Agent móvil podría tener una ventana grande (ej. tablet en landscape).
    return isMobileUserAgent || window.innerWidth <= MOBILE_BREAKPOINT;
  };

  // 1. Estado para almacenar si es móvil
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  // 2. useEffect para añadir y limpiar el event listener de redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile()); // Re-evalúa el estado móvil en cada redimensionamiento
    };

    // Añade el event listener cuando el hook se usa (componente se monta)
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el hook deja de usarse (componente se desmonta)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar/desmontar

  // Retorna el estado `isMobile` para que el componente que use el hook pueda acceder a él
  return isMobile;
}

export default useIsMobile;