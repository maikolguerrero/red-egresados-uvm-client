import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa"
import Button from "../Buttons/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ModalNotHeader } from "../Modals/ModalNotHeader";
import { TabsProfile } from "../TabsProfile";
import { FaXTwitter } from "react-icons/fa6";
import { CardEducation } from "./Profile/CardEducation";
import { CardCertification } from "./Profile/CardCertification";
import { CardExperience } from "./Profile/CardExperience";
import { useNavigate } from "react-router-dom";

function InfoProfile({ profile }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)
  const role = useSelector((state) => state.auth.role)
  const username = useSelector((state) => state.auth.username)

  const [openModal, setOpenModal] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openCerti, setOpenCerti] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const [description, setDesciption] = useState([]);

  const [values, setValues] = useState({
    education: {},
    certification: {},
    experience: {}
  })

  useEffect(() => {
    if (profile?.profile?.professional?.summary?.value) {
      let description = profile?.profile?.professional?.summary?.value.split("\n\n");
      setDesciption(description);
    }
  }, [profile])

  const startChat = () => {
    navigate(`/chat/${profile?.user?.username}`);
  };

  const handleSocialMedia = () => {
    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      if (
        (profile?.profile?.socialMedia?.facebook?.value === undefined ||
          profile?.profile?.socialMedia?.facebook?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.whatsapp?.value === undefined ||
          profile?.profile?.socialMedia?.whatsapp?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.telegram?.value === undefined ||
          profile?.profile?.socialMedia?.telegram?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.instagram?.value === undefined ||
          profile?.profile?.socialMedia?.instagram?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.linkedin?.value === undefined ||
          profile?.profile?.socialMedia?.linkedin?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.youtube?.value === undefined ||
          profile?.profile?.socialMedia?.youtube?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.github?.value === undefined ||
          profile?.profile?.socialMedia?.github?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.x?.value === undefined ||
          profile?.profile?.socialMedia?.x?.value.trim() === "") &&
        (profile?.profile?.socialMedia?.tiktok?.value === undefined ||
          profile?.profile?.socialMedia?.tiktok?.value.trim() === "")
      ) {
        return false;
      } else {
        return true;
      }
    }

    if (
      (profile?.profile?.socialMedia?.facebook?.isPublic ||
        profile?.profile?.socialMedia?.facebook?.value === undefined ||
        profile?.profile?.socialMedia?.facebook?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.whatsapp?.isPublic ||
        profile?.profile?.socialMedia?.whatsapp?.value === undefined ||
        profile?.profile?.socialMedia?.whatsapp?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.telegram?.isPublic ||
        profile?.profile?.socialMedia?.telegram?.value === undefined ||
        profile?.profile?.socialMedia?.telegram?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.instagram?.isPublic === false ||
        profile?.profile?.socialMedia?.instagram?.value === undefined ||
        profile?.profile?.socialMedia?.instagram?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.linkedin?.isPublic ||
        profile?.profile?.socialMedia?.linkedin?.value === undefined ||
        profile?.profile?.socialMedia?.linkedin?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.youtube?.isPublic ||
        profile?.profile?.socialMedia?.youtube?.value === undefined ||
        profile?.profile?.socialMedia?.youtube?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.github?.isPublic ||
        profile?.profile?.socialMedia?.github?.value === undefined ||
        profile?.profile?.socialMedia?.github?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.x?.isPublic ||
        profile?.profile?.socialMedia?.x?.value === undefined ||
        profile?.profile?.socialMedia?.x?.value.trim() === "") &&
      (profile?.profile?.socialMedia?.tiktok?.isPublic ||
        profile?.profile?.socialMedia?.tiktok?.value === undefined ||
        profile?.profile?.socialMedia?.tiktok?.value.trim() === "")
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleProfessional = () => {
    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      if (
        profile?.profile?.professional?.summary?.value === undefined ||
        profile?.profile?.professional?.summary?.value.trim() === ""
      ) {
        return false;
      } else {
        return true;
      }
    }

    if (
      profile?.profile?.professional?.summary?.isPublic === false ||
      profile?.profile?.professional?.summary?.value === undefined ||
      profile?.profile?.professional?.summary?.value.trim() === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handlePersonalData = () => {
    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      if (
        (profile?.profile?.personalData?.birthDate?.value === undefined ||
          profile?.profile?.personalData?.birthDate?.value.trim() === "") &&
        (profile?.profile?.personalData?.location?.value === undefined ||
          profile?.profile?.personalData?.location?.value.trim() === "") &&
        (profile?.profile?.contact?.phone?.value === undefined ||
          profile?.profile?.contact?.phone?.value.trim() === "") &&
        (profile?.profile?.contact?.website?.value === undefined ||
          profile?.profile?.contact?.website?.value.trim() === "") &&
        (profile?.profile?.contact?.alternateEmail?.value === undefined ||
          profile?.profile?.contact?.alternateEmail?.value.trim() === "")
      ) {
        return false;
      } else {
        return true;
      }
    }

    if (
      (profile?.profile?.personalData?.birthDate?.isPublic === false ||
        profile?.profile?.personalData?.birthDate?.value === undefined ||
        profile?.profile?.personalData?.birthDate?.value.trim() === "") &&
      (profile?.profile?.personalData?.location?.isPublic === false ||
        profile?.profile?.personalData?.location?.value === undefined ||
        profile?.profile?.personalData?.location?.value.trim() === "") &&
      (profile?.profile?.contact?.phone?.isPublic === false ||
        profile?.profile?.contact?.phone?.value === undefined ||
        profile?.profile?.contact?.phone?.value.trim() === "") &&
      (profile?.profile?.contact?.website?.isPublic === false ||
        profile?.profile?.contact?.website?.value === undefined ||
        profile?.profile?.contact?.website?.value.trim() === "") &&
      (profile?.profile?.contact?.alternateEmail?.isPublic === false ||
        profile?.profile?.contact?.alternateEmail?.value === undefined ||
        profile?.profile?.contact?.alternateEmail?.value.trim() === "")
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleEducation = () => {
    if (profile?.profile?.education?.items?.length === 0) {
      return true
    }

    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      return false
    }

    if (profile?.profile?.education?.isPublic) {
      return false
    } else {
      return true
    }
  }

  const handleExperience = () => {
    if (profile?.profile?.experience?.items?.length === 0) {
      return true
    }

    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      return false
    }

    if (profile?.profile?.experience?.isPublic) {
      return false
    } else {
      return true
    }
  }

  const handleCertifications = () => {
    if (profile?.profile?.certifications?.items?.length === 0) {
      return true
    }

    if (profile?.user?.username === username || role === "admin" || role === "superadmin") {
      return false
    }

    if (profile?.profile?.certifications?.isPublic) {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <div className="w-full lg:w-5/6 font-barolw flex flex-col bg-Gris border-[1.5px] p-4 border-verdeD gap-2 md:gap-3 lg:gap-5">
        <div className="py-4 px-2 w-full">
          <h2 className="text-lg lg:text-xl font-barlow-semi-condensed font-bold uppercase border-b border-verdeD  w-full pb-1 px-2 mb-4">
            Perfil Personal
          </h2>
          {handlePersonalData() && (
            <>
              <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
                Datos Personales
              </h5>
              <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
                {profile?.profile?.personalData?.birthDate?.isPublic ||

                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.personalData?.birthDate?.value ===
                      undefined ? (
                      <></>
                    ) : (
                      <p>
                        <b>Nacimiento:</b>{" "}
                        {
                          profile?.profile?.personalData?.birthDate?.value.split(
                            "T"
                          )[0]
                        }
                      </p>
                    )}
                  </>
                ) : (
                  <></>
                )
                }

                {profile?.profile?.personalData?.location?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.personalData?.location?.value ===
                      undefined ||
                      profile?.profile?.personalData?.location?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <p>
                        <b>Ubicación:</b>{" "}
                        {profile?.profile?.personalData?.location?.value}
                      </p>
                    )}
                  </>
                ) : (
                  <></>
                )
                }

                {profile?.profile?.contact?.phone?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.contact?.phone?.value === undefined ||
                      profile?.profile?.contact?.phone?.value.trim() === "" ? (
                      <></>
                    ) : (
                      <p>
                        <b>Teléfono:</b>{" "}
                        {profile?.profile?.contact?.phone?.value}
                      </p>
                    )}
                  </>
                ) : (
                  <></>
                )
                }

                {profile?.profile?.contact?.website?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.contact?.website?.value === undefined ||
                      profile?.profile?.contact?.website?.value.trim() === "" ? (
                      <></>
                    ) : (
                      <p>
                        <b>Sitio Web:</b>{" "}
                        {profile?.profile?.contact?.website?.value}
                      </p>
                    )}
                  </>
                ) : (
                  <></>
                )
                }

                {profile?.profile?.contact?.alternateEmail?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.contact?.alternateEmail?.value ===
                      undefined ||
                      profile?.profile?.contact?.alternateEmail?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <p>
                        <b>Correo Electrónico:</b>{" "}
                        {profile?.profile?.contact?.alternateEmail?.value}
                      </p>
                    )}
                  </>
                ) : (
                  <></>
                )
                }
              </div >
            </>
          )
          }
        </div >

        {handleProfessional() && (
          <div className="py-4 px-2 w-full">
            <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
              PERFIL PROFESIONAL
            </h5>

            <div className="text-xs lg:text-sm px-2 flex flex-col gap-1">
              {description.map((item, key) => (
                <div key={key}>
                  <p>{item}</p>
                  <br />
                </div>
              ))}
            </div>
          </div>
        )}

        {
          handleSocialMedia() ? (
            <div className="py-4 px-2 w-full">
              <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
                REDES SOCIALES
              </h5>

              <ul className="flex gap-2 flex-wrap justify-start text-white text-2xl px-2 ">
                {/* <section className="flex gap-6 flex-wrap justify-center"> */}
                {profile?.profile?.socialMedia?.instagram?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.instagram?.value ===
                      undefined ||
                      profile?.profile?.socialMedia?.instagram?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.instagram?.value}
                        >
                          <FaInstagram />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.facebook?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.facebook?.value ===
                      undefined ||
                      profile?.profile?.socialMedia?.facebook?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.facebook?.value}
                        >
                          <FaFacebook />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.whatsapp?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.whatsapp?.value ===
                      undefined ||
                      profile?.profile?.socialMedia?.whatsapp?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.whatsapp?.value}
                        >
                          <FaWhatsapp />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.linkedin?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.linkedin?.value ===
                      undefined ||
                      profile?.profile?.socialMedia?.linkedin?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.linkedin?.value}
                        >
                          <FaLinkedin />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.youtube?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.youtube?.value ===
                      undefined ||
                      profile?.profile?.socialMedia?.youtube?.value.trim() ===
                      "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.youtube.value}
                        >
                          <FaYoutube />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.github?.isPublic === true ||
                  profile?.user?.username === username || role === "admin" || role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.github?.value === undefined ||
                      profile?.profile?.socialMedia?.github?.value.trim() === "" ? (
                      <></>
                    ) : (
                      <>
                        <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                          <a
                            target="_blank"
                            href={profile?.profile?.socialMedia?.github.value}
                          >
                            <FaGithub />
                          </a>
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {profile?.profile?.socialMedia?.x?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.x?.value === undefined ||
                      profile?.profile?.socialMedia?.x?.value.trim() === "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.x?.value}
                        >
                          <FaXTwitter />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {profile?.profile?.socialMedia?.tiktok?.isPublic === true ||
                  profile?.user?.username === username ||
                  role === "admin" ||
                  role === "superadmin" ? (
                  <>
                    {profile?.profile?.socialMedia?.tiktok?.value === undefined ||
                      profile?.profile?.socialMedia?.tiktok?.value.trim() === "" ? (
                      <></>
                    ) : (
                      <li className="rounded-full bg-verdeD p-2 hover:bg-RojoC duration-300 transition-all hover:cursor-pointer">
                        <a
                          target="_blank"
                          href={profile?.profile?.socialMedia?.tiktok?.value}
                        >
                          <FaTiktok />
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

              </ul>
            </div>
          ) : (
            <></>
          )
        }

        {
          handleEducation() ? (
            <></>
          ) : (
            <div className="py-4 px-2 w-full">
              <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
                EDUCACIÓN
              </h5>

              <div className="flex justify-between">
                <ul className="flex flex-col w-full gap-1 text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                  {profile?.profile?.education?.items.map((item, key) => (
                    <li className="flex justify-between w-full" key={key}>
                      <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                        {item.institution} -{" "}
                        <span className="text-verdeD text-sm font-semibold mr-2">
                          {item?.degree}
                        </span>
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
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        {handleExperience() ? (
          <></>
        ) : (
          <div className="py-4 px-2 w-full">
            <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
              EXPERIENCIA LABORAL
            </h5>

            <div className="flex justify-between">
              <ul className="flex flex-col gap-1 w-full text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                {profile?.profile?.experience?.items.map((item, key) => (
                  <li className="flex justify-between w-full" key={key}>
                    <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                      {item.position} -{" "}
                      <span className="text-verdeD text-sm font-semibold mr-2">
                        {item?.startDate?.split("T")[0]} /{" "}
                        {item?.endDate === undefined || item?.endDate === null ? " Actualidad" : item?.endDate?.split("T")[0]}
                      </span>
                      <button
                        onClick={(e) => {
                          setValues({
                            education: {},
                            certification: {},
                            experience: item,
                          });
                          setOpenExp(true);
                        }}
                        className="text-RojoC"
                      >
                        Detalles
                      </button>
                    </p>{" "}

                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {
          handleCertifications() ? (
            <></>
          ) : (
            <div className="py-4 px-2 w-full">
              <h5 className="text-base lg:text-lg font-barlow-semi-condensed font-bold uppercase border-b border-RojoC w-full pb-1 px-2 mb-4">
                CERTIFICACIONES
              </h5>

              <div className="flex justify-between">
                <ul className="flex flex-col w-full gap-1 text-black font-barolw text-xs lg:text-sm pl-2 px-2 list-disc">
                  {profile?.profile?.certifications?.items.map((item, key) => (
                    <li className="flex justify-between w-full" key={key}>
                      <p className="w-3/4 font-medium text-sm lg:w-auto uppercase">
                        {item.name} -{" "}
                        <span className="text-verdeD text-sm font-semibold mr-2">
                          {item?.issueDate?.split("T")[0]}
                        </span>
                        <button
                          onClick={(e) => {
                            setValues({
                              education: {},
                              certification: item,
                              experience: {},
                            });
                            setOpenCerti(true);
                          }}
                          className="text-RojoC"
                        >
                          Detalles
                        </button>
                      </p>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        {profile?.user?.username === auth?.username ? (
          <div className="py-4 px-2 w-full flex gap-3 flex-wrap justify-center">
            <Button
              action={(e) => {
                setOpenModal(true);
              }}
              text={"EDITAR PERFIL"}
            />
            <Button
              action={(e) => {
                navigate(`/forums/personal/${auth?.username}`)
              }}
              className={"bg-verdeC"}
              text={"MIS HILOS DE FOROS"}
            />
            <Button
              action={(e) => {
                navigate(`/projects/personal/${auth?.username}`)
              }}
              className={"bg-verdeC"}
              text={"MIS PROYECTOS"}
            />
            <Button
              action={(e) => {
                navigate(`/projects/personal-colaborator/${auth?.username}`)
              }}
              className={"bg-verdeC"}
              text={"MIS COLABORACIONES"}
            />
          </div>
        ) : (
          <div className="py-4 px-2 w-full flex gap-3 flex-wrap justify-center">

            <Button
              text={"ENVIAR MENSAJE"}
              className={"bg-verdeA hover:bg-RojoC"}
              action={startChat}
            />
            <Button
              action={(e) => {
                navigate(`/forums/personal/${profile?.user?.username}`)
              }}
              className={"bg-verdeC"}
              text={"VER HILOS DE FOROS"}
            />
            <Button
              action={(e) => {
                navigate(`/projects/personal/${profile?.user?.username}`)
              }}
              className={"bg-verdeC"}
              text={"VER PROYECTOS"}
            />
            <Button
              action={(e) => {
                navigate(`/projects/personal-colaborator/${profile?.user?.username}`)
              }}
              className={"bg-verdeC"}
              text={"VER COLABORACIONES"}
            />
          </div>
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
      </div >
    </>
  );
}

export default InfoProfile;
