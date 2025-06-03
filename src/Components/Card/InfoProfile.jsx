import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"
import Button from "../Buttons/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { TabsProfile } from "../TabsProfile";

function InfoProfile({profile}) {
  const auth = useSelector((state) => state.auth)

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full lg:w-5/6 font-barolw flex flex-col bg-Gris border-[1.5px] p-4 border-verdeD gap-2 md:gap-3 lg:gap-5">
        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            Datos Personales
          </h5>
          <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
            <p>
              <b>Nacimiento:</b> {profile.birthDate.split("T")[0]}
            </p>
            {profile.profile.contact === undefined ? (
              <></>
            ) : profile.profile.contact.phone === undefined ? (
              <p>
                <b>Teléfono:</b> {profile.profile.contact.phone}
              </p>
            ) : (
              <></>
            )}

            {profile.profile.contact === undefined ? (
              <></>
            ) : profile.profile.contact.website === undefined ? (
              <p>
                <b>Sitio Web:</b> {profile.profile.contact.website}
              </p>
            ) : (
              <></>
            )}

            {profile.profile.contact === undefined ? (
              <></>
            ) : profile.profile.contact.alternateEmail === undefined ? (
              <p>
                <b>Correo Electrónico:</b>{" "}
                {profile.profile.contact.alternateEmail}
              </p>
            ) : (
              <></>
            )}

            <p>
              <b>Ubicación:</b> {profile.location}
            </p>
          </div>
        </div>

        <div className="py-4 px-2 w-full">
          <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
            PERFIL PROFESIONAL
          </h5>
          <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
            <p>
              {profile.profile.professional.summary === undefined
                ? "No tiene descipción profesional."
                : profile.profile.professional.summary}
            </p>
          </div>
        </div>

        {profile.profile.socialMedia === undefined ? (
          <></>
        ) : (
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
        )}

        {profile.profile.education.length === 0 ? (
          <></>
        ) : (
          <div className="py-4 px-2 w-full">
            <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
              EDUCACIÓN
            </h5>

            <div className="flex justify-between">
              <ul className="flex flex-col w-full gap-1 text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">Ingeniería en Computación.</p>{" "}
                  <span className="text-verdeD font-semibold">2015 - 2019</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Especialidad en Ciberseguridad.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2019 - 2021</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Maestria en Seguridad de Datos.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2021 - 2022</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Doctorado en Gestion de Proyectos.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2022 - 2024</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Certificado de Desarrollador en JavaScript.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2024 - 2024</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {profile.profile.certifications.length === 0 ? (
          <></>
        ) : (
          <div className="py-4 px-2 w-full">
            <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
              CERTIFICADOS
            </h5>

            <div className="flex justify-between">
              <ul className="flex flex-col w-full gap-1 text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">Ingeniería en Computación.</p>{" "}
                  <span className="text-verdeD font-semibold">2015 - 2019</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Especialidad en Ciberseguridad.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2019 - 2021</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Maestria en Seguridad de Datos.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2021 - 2022</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Doctorado en Gestion de Proyectos.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2022 - 2024</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Certificado de Desarrollador en JavaScript.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2024 - 2024</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {profile.profile.experience.length === 0 ? (
          <></>
        ) : (
          <div className="py-4 px-2 w-full">
            <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
              EXPERIENCIA LABORAL
            </h5>

            <div className="flex justify-between">
              <ul className="flex flex-col gap-1 w-full text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Jefe de Aldea Tecnológica en la Universidad Valle del
                    Momboy.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2021 - 2024</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Jefe Departamento de ATIT - Telecomunicaciones en
                    Coorpoelec.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2020 - 2021</span>
                </li>
                <li className="flex justify-between w-full">
                  <p className="w-3/4 lg:w-auto">
                    Operardor de conexiones de telecomunicaciones en Inter.
                  </p>{" "}
                  <span className="text-verdeD font-semibold">2019 - 2020</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {profile.user.username === auth.username ? (
          <div className="py-4 px-2 w-full">
            <Button action={(e) => {setOpenModal(true)}} text={"EDITAR PERFIL"} />
          </div>
        ) : (
          <></>
        )}

        <ModalNotHeader openModal={openModal} setOpenModal={setOpenModal} component={<TabsProfile />} />
      </div>
    </>
  );
}

export default InfoProfile;
