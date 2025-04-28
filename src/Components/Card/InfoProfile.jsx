import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"

function InfoProfile(props) {
  return (
    <>
      <div className="w-full lg:w-5/6 font-barolw flex flex-col bg-Gris border-[1.5px] p-4 border-verdeD gap-2 md:gap-3 lg:gap-5">
        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            Datos Personales
          </h5>
          <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
            <p>
              <b>Nacimiento:</b> 18/09/2004
            </p>
            <p>
              <b>Teléfono:</b> +58412-0686329
            </p>
            <p>
              <b>Ubicación:</b> Urb. La Bolivariana, Campo Alegre, Municipio San
              Rafael de Carvajal, Edo. Trujillo, Venezuela.
            </p>
          </div>
        </div>

        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            PERFIL PROFESIONAL
          </h5>
          <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
            <p>
              Soy Anggelo, un ingeniero en computación apasionado por la
              tecnología y la innovación. Con una sólida formación en desarrollo
              de software, diseño de sistemas y análisis de datos, me
              especializo en crear soluciones eficientes y escalables que
              resuelvan problemas complejos. Mi experiencia incluye el dominio
              de múltiples lenguajes de programación, frameworks y herramientas
              de desarrollo, así como un enfoque en la implementación de
              metodologías ágiles.
              <br />
              <br />
              A lo largo de mi carrera, he trabajado en proyectos diversos que
              abarcan desde aplicaciones móviles hasta sistemas empresariales,
              siempre buscando optimizar procesos y mejorar la experiencia del
              usuario. Me considero un profesional proactivo, con excelentes
              habilidades de trabajo en equipo y una mentalidad orientada a
              resultados.
              <br />
              <br />
              Además, tengo un fuerte interés en las nuevas tecnologías, como
              inteligencia artificial y aprendizaje automático, lo que me
              permite estar a la vanguardia de las tendencias del sector. Estoy
              comprometido con el aprendizaje continuo y la mejora personal, lo
              que me impulsa a enfrentar nuevos desafíos y contribuir al
              crecimiento de las organizaciones con las que colaboro. <br />
              <br />
              Estoy listo para aportar mi conocimiento y experiencia en
              proyectos innovadores que marquen la diferencia en el mundo
              digital.
            </p>
          </div>
        </div>

        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            REDES SOCIALES
          </h5>

          <ul className="flex gap-2 text-white text-2xl px-2">
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaFacebook />
            </li>
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaWhatsapp />
            </li>
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaLinkedin />
            </li>
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaYoutube />
            </li>
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaGithub />
            </li>
            <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
              <FaInstagram />
            </li>
          </ul>
        </div>

        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            EDUCACIÓN Y CERTIFICADOS
          </h5>

          <div className="flex justify-between">
            <ul className="flex flex-col w-full gap-1 text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Ingeniería en Computación.</p> <span className="text-verdeD font-semibold">2015 - 2019</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Especialidad en Ciberseguridad.</p> <span className="text-verdeD font-semibold">2019 - 2021</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Maestria en Seguridad de Datos.</p> <span className="text-verdeD font-semibold">2021 - 2022</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Doctorado en Gestion de Proyectos.</p> <span className="text-verdeD font-semibold">2022 - 2024</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Certificado de Desarrollador en JavaScript.</p> <span className="text-verdeD font-semibold">2024 - 2024</span></li>
            </ul>
          </div>
        </div>

        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            EXPERIENCIA LABORAL
          </h5>

          <div className="flex justify-between">
            <ul className="flex flex-col gap-1 w-full text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Jefe de Aldea Tecnológica en la Universidad Valle del Momboy.</p> <span className="text-verdeD font-semibold">2021 - 2024</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Jefe Departamento de ATIT - Telecomunicaciones en Coorpoelec.</p> <span className="text-verdeD font-semibold">2020 - 2021</span></li>
              <li className="flex justify-between w-full"><p className="w-3/4 lg:w-auto">Operardor de conexiones de telecomunicaciones en Inter.</p> <span className="text-verdeD font-semibold">2019 - 2020</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoProfile;
