import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Recover from "./views/Recover";
import Landing from "./views/Landing";
import Home from "./views/Home";
import MyProfile from "./views/profile/MyProfile";
import Graduates from "./views/social/Graduates";
import Forums from "./views/social/Forums";
import Events from "./views/social/Events";
import Proyects from "./views/social/Proyects";
import Notifications from "./views/profile/Notifications";

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recover-password",
    element: <Recover />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/graduates",
    element: <Graduates />,
  },
  {
    path: "/forums",
    element: <Forums />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/proyects",
    element: <Proyects />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
  {
    path: "*",
    element: <h2 className="text-3xl font-bold underline font-barlow-condensed"> Pagina de Error</h2>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
