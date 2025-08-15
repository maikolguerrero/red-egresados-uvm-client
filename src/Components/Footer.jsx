import { useSelector } from "react-redux";
import { getContentFooter } from "../services/admin/landingService";
import { useEffect } from "react";

function Footer() {
  const landing = useSelector((state) => state.landing.landingContent);

  useEffect(() => {
    getContentFooter();
  }, []);

  return (
    <>
      <footer className="h-auto py-3 px-2 bg-verdeD flex items-center justify-center">
        <h6 className="text-center font-barlow-condensed text-Blanco text-xs md:text-sm">
          {landing?.footerText || "© TODOS LOS DERECHOS RESERVADOS – RED DE EGRESADOS UNIVERSIDAD VALLE DEL MOMBOY | 1997 – " + new Date().getFullYear()}
        </h6>
      </footer>
    </>
  );
}

export default Footer;
