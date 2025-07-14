import { Carousel, createTheme, ThemeProvider, Timeline, TimelineBody, TimelineContent, TimelineItem, TimelinePoint, TimelineTime, TimelineTitle } from "flowbite-react";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContentHome } from "../services/admin/homeService";
import { searchForum } from "../services/forum/forumService";
import { searchProyect } from "../services/proyects/proyectService";
import { getUsers } from "../services/users/usersService";
import { searchEvent } from "../services/events/eventsService";
import { CardForumHome } from "../Components/Card/home/CardForumHome";
import { CardGraduateHome } from "../Components/Card/home/CardGraduateHome";
import { CardProyectHome } from "../Components/Card/home/CardProyectHome";
import { CardEventHome } from "../Components/Card/home/CardEventHome";
import { Loader } from "../Components/Loader";

const customTheme = createTheme({
  "root": {
    "base": "relative h-full w-full",
    "leftControl": "absolute left-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden",
    "rightControl": "absolute right-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden"
  },
  "indicators": {
    "active": {
      "off": "bg-white/50 hover:bg-white",
      "on": "bg-verdeA"
    },
    "base": "h-3 w-3 rounded-full",
    "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
  },
  "item": {
    "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    "wrapper": {
      "off": "w-full shrink-0 transform cursor-default snap-center",
      "on": "w-full shrink-0 transform cursor-grab snap-center"
    }
  },
  "control": {
    "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10",
    "icon": "h-5 w-5 text-white sm:h-6 sm:w-6"
  },
  "scrollContainer": {
    "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-md border-2 border-verdeD",
    "snap": "snap-x"
  }
})

const customThemeCarrouselCard = createTheme({
  "root": {
    "base": "relative h-full w-full",
    "leftControl": "absolute left-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden",
    "rightControl": "absolute right-0 top-0 h-full items-center justify-center px-4 focus:outline-none hidden"
  },
  "indicators": {
    "active": {
      "off": "bg-white/50 hover:bg-white",
      "on": "bg-verdeA"
    },
    "base": "h-3 w-3 rounded-full",
    "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
  },
  "item": {
    "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    "wrapper": {
      "off": "w-full shrink-0 transform cursor-default snap-center",
      "on": "w-full shrink-0 transform cursor-default snap-center"
    }
  },
  "control": {
    "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10",
    "icon": "h-5 w-5 text-white sm:h-6 sm:w-6"
  },
  "scrollContainer": {
    "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-md",
    "snap": "snap-x"
  }
})

const customThemeTimeline = createTheme({
  root: {
    direction: {
      horizontal: "sm:flex",
      vertical: "relative border-l border-RojoC",
    },
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6",
    },
    content: {
      root: {
        base: "",
        horizontal: "mt-3 sm:pr-8",
        vertical: "",
      },
      body: {
        base: "mb-4 text-sm font-normal text-gray-600 font-barolw",
      },
      time: {
        base: "mb-1 text-xs font-normal leading-none text-gray-400",
      },
      title: {
        base: "text-base font-semibold text-verdeD uppercase font-barlow-semi-condensed",
      },
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-RojoA sm:flex",
      marker: {
        base: {
          horizontal:
            "absolute -left-1.5 h-3 w-3 rounded-full border-2 border-verdeC bg-verdeD",
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-verdeC bg-verdeD",
        },
        icon: {
          base: "h-3 w-3 text-primary-600",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 ring-8 ring-white",
        },
      },
      vertical: "",
    },
  },
});

function Home() {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home.homeContent);
  const loading = useSelector((state) => state.home.loadingPage);
  const graduates = useSelector((state) => state.users.users);
  const forums = useSelector((state) => state.forums.forums);
  const events = useSelector((state) => state.events.events);
  const proyects = useSelector((state) => state.proyects.proyects);

  useEffect(() => {
    dispatch(getContentHome());
    dispatch(
      searchForum({
        page: 1,
        limit: 4,
        category: null,
        search: null,
        sort: "popular",
      })
    );
    dispatch(
      searchProyect({
        page: 1,
        limit: 4,
        sort: "collaborators",
      })
    );
    dispatch(
      getUsers({
        page: 1,
        limit: 4,
      })
    );
    dispatch(
      searchEvent({
        page: 1,
        limit: 4,
        sort: "startDate",
      })
    );
  }, []);

  return (
    <>
      <Header />
      <div className="h-[10.5vh]"></div>

      <div className="flex">
        <Nav />
        {loading ? (
          <main className="min-h-[89.5vh] w-full flex justify-center items-center">
            <Loader />
          </main>
        ) : (
          <main className="w-full px-3 py-6 md:px-6 lg:px-10 gap-14 flex flex-col h-[89.5vh] overflow-y-auto">
            <section className="grid-cols-4 grid gap-4 w-full">
              {home.carouselItems.length === 0 ? (
                <></>
              ) : (
                <div className="col-span-4 h-[200px] sm:h-[250px] md:h-[300px] xl:h-[400px] w-full">
                  <ThemeProvider theme={customTheme}>
                    <Carousel
                      indicators={false}
                      theme={customTheme}
                      slideInterval={5000}
                    >
                      {home.carouselItems.map((item, key) => (
                        <img key={key} src={item.url} alt="..." />
                      ))}
                    </Carousel>
                  </ThemeProvider>
                </div>
              )}

              <div className="col-span-4 row-span-3 p-4 rounded-md border-2 flex flex-col gap-4 border-verdeD bg-gray-200 h-auto">
                <h4 className="font-barolw font-semibold w-full border-b pb-1 border-RojoC text-black uppercase text-lg">
                  Consejos para usar la Red
                </h4>
                <div className="px-3 overflow-y-auto">
                  {home.welcomeSections.length === 0 ? (
                    <h5 className="font-barolw font-medium text-verdeD">
                      No se han publicados consejos para usar la red de
                      egresados aún...
                    </h5>
                  ) : (
                    <Timeline theme={customThemeTimeline}>
                      {home.welcomeSections.map((item, key) => (
                        <TimelineItem key={key}>
                          <TimelinePoint />
                          <TimelineContent>
                            <TimelineTime>Consejo #{key + 1}</TimelineTime>
                            <TimelineTitle>{item.title}</TimelineTitle>
                            <TimelineBody>{item.description}</TimelineBody>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  )}
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 rounded-md border-2 border-verdeD bg-gray-200 p-3">
                <div className="w-full flex flex-col h-[225px]">
                  <h4 className="font-barolw px-2 font-semibold w-full border-b pb-1 border-RojoC text-black uppercase text-lg">
                    Foros populares
                  </h4>
                  <Carousel
                    theme={customThemeCarrouselCard}
                    indicators={false}
                    slideInterval={3000}
                  >
                    {forums.map((item, key) => (
                      <CardForumHome key={key} forum={item} />
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 rounded-md border-2 border-verdeD bg-gray-200 p-3">
                <div className="h-[225px] w-full flex flex-col">
                  <h4 className="font-barolw px-2 font-semibold w-full border-b pb-1 border-RojoC text-black uppercase text-lg">
                    Proyectos populares
                  </h4>
                  <Carousel
                    theme={customThemeCarrouselCard}
                    indicators={false}
                    slideInterval={3000}
                  >
                    {proyects.map((item, key) => (
                      <CardProyectHome key={key} proyect={item} />
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 rounded-md border-2 border-verdeD bg-gray-200 p-3">
                <div className="h-[225px] w-full flex flex-col">
                  <h4 className="font-barolw px-2 font-semibold w-full border-b pb-1 border-RojoC text-black uppercase text-lg">
                    Nuevos registros
                  </h4>
                  <Carousel
                    theme={customThemeCarrouselCard}
                    indicators={false}
                    slideInterval={3000}
                  >
                    {graduates.map((item, key) => (
                      <CardGraduateHome key={key} user={item} />
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 rounded-md border-2 border-verdeD bg-gray-200 p-3">
                <div className="h-[225px] w-full flex flex-col">
                  <h4 className="font-barolw px-2 font-semibold w-full border-b pb-1 border-RojoC text-black uppercase text-lg">
                    Eventos cercanos
                  </h4>
                  <Carousel
                    theme={customThemeCarrouselCard}
                    indicators={false}
                    slideInterval={3000}
                  >
                    {events.map((item, key) => (
                      <CardEventHome key={key} event={item} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
}

export default Home;
