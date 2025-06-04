import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"
import Button from "../Buttons/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { TabsProfile } from "../TabsProfile";
import { FaXTwitter } from "react-icons/fa6";
import { CardEducation } from "./Profile/CardEducation";
import { CardCertification } from "./Profile/CardCertification";
import { CardExperience } from "./Profile/CardExperience";

function InfoProfile({profile}) {
  const auth = useSelector((state) => state.auth)

  const [openModal, setOpenModal] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openCerti, setOpenCerti] = useState(false);
  const [openExp, setOpenExp] = useState(false);

  const [values, setValues] = useState({
    education: {},
    certification: {},
    experience: {}
  })

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
            ) : profile.profile.contact.phone === undefined ||
              profile.profile.contact.phone === "" ? (
              <></>
            ) : (
              <p>
                <b>Teléfono:</b> {profile.profile.contact.phone}
              </p>
            )}

            {profile.profile.contact === undefined ? (
              <></>
            ) : profile.profile.contact.website === undefined ||
              profile.profile.contact.website === "" ? (
              <></>
            ) : (
              <p>
                <b>Sitio Web:</b> {profile.profile.contact.website}
              </p>
            )}

            {profile.profile.contact === undefined ? (
              <></>
            ) : profile.profile.contact.alternateEmail === undefined ||
              profile.profile.contact.alternateEmail === "" ? (
              <></>
            ) : (
              <p>
                <b>Correo Electrónico:</b>{" "}
                {profile.profile.contact.alternateEmail}
              </p>
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
              {profile.profile.socialMedia.instagram === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.instagram}><FaInstagram /></a>
                </li>
              )}
              {profile.profile.socialMedia.facebook === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.facebook}><FaFacebook /></a>
                </li>
              )}
              {profile.profile.socialMedia.whatsapp === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.whatsapp}><FaWhatsapp /></a>
                </li>
              )}
              {profile.profile.socialMedia.linkedin === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.linkedin}><FaLinkedin /></a>
                </li>
              )}
              {profile.profile.socialMedia.youtube === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.youtube}><FaYoutube /></a>
                </li>
              )}
              {profile.profile.socialMedia.github === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.github}><FaGithub /></a>
                </li>
              )}
              {profile.profile.socialMedia.x === "" ? (
                <></>
              ) : (
                <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                  <a href={profile.profile.socialMedia.x}><FaXTwitter /></a>
                </li>
              )}
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
                {profile.profile.education.map((item, key) => (
                  <li className="flex justify-between w-full" key={key}>
                    <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                      {item.degree} -{" "}
                      <button
                        onClick={(e) => {
                          setValues({
                            education: item,
                            certification: {},
                            experience: {},
                          });
                          setOpenEducation(true);
                        }}
                        className="text-RojoC"
                      >
                        Detalles
                      </button>
                    </p>{" "}
                    <span className="text-verdeD text-sm font-semibold">
                      {item.startYear} - {item.endYear}
                    </span>
                  </li>
                ))}
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
                {profile.profile.certifications.map((item, key) => (
                  <li className="flex justify-between w-full" key={key}>
                    <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                      {item.name} -{" "}
                      <button
                        onClick={(e) => {
                          setValues({
                            education: {},
                            certification: item,
                            experience: {},
                          });
                          setOpenCerti(true)
                        }}
                        className="text-RojoC"
                      >
                        Detalles
                      </button>
                    </p>{" "}
                    <span className="text-verdeD text-sm font-semibold">
                      {item.issueDate.split("T")[0]}
                    </span>
                  </li>
                ))}
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
                {profile.profile.experience.map((item, key) => (
                  <li className="flex justify-between w-full" key={key}>
                    <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                      {item.position} -{" "}
                      <button
                        onClick={(e) => {
                          setValues({
                            education: {},
                            certification: {},
                            experience: item,
                          });
                          setOpenExp(true)
                        }}
                        className="text-RojoC"
                      >
                        Detalles
                      </button>
                    </p>{" "}
                    <span className="text-verdeD text-sm font-semibold">
                      {item.startDate.split("T")[0]} hasta{" "}
                      {item.endDate.split("T")[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {profile.user.username === auth.username ? (
          <div className="py-4 px-2 w-full">
            <Button
              action={(e) => {
                setOpenModal(true);
              }}
              text={"EDITAR PERFIL"}
            />
          </div>
        ) : (
          <></>
        )}

        <ModalNotHeader
          openModal={openModal}
          setOpenModal={setOpenModal}
          component={<TabsProfile />}
        />
        <ModalNotHeader
          size={"sm"}
          openModal={openEducation}
          setOpenModal={setOpenEducation}
          component={<CardEducation data={values.education} />}
        />
        <ModalNotHeader
          size={"sm"}
          openModal={openCerti}
          setOpenModal={setOpenCerti}
          component={<CardCertification data={values.certification} />}
        />
        <ModalNotHeader
          size={"sm"}
          openModal={openExp}
          setOpenModal={setOpenExp}
          component={<CardExperience data={values.experience} />}
        />
      </div>
    </>
  );
}

export default InfoProfile;
