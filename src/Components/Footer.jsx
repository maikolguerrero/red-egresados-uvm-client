import { useSelector } from "react-redux";

function Footer() {
  const landing = useSelector((state) => state.landing.landingContent);

  return (
    <>
      <footer className="h-auto py-3 px-2 bg-verdeD flex items-center justify-center">
        <h6 className="text-center font-barlow-condensed text-Blanco text-xs md:text-sm">
          {landing.footerText}
        </h6>
      </footer>
    </>
  );
}

export default Footer;
