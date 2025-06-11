import { useEffect, useState } from "react";
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
import Config from "./views/profile/Config";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useDispatch } from "react-redux";
import { verifySesion } from "./services/auth/authService";
import { SnackbarProvider } from "notistack";
import GraduatesProfile from "./views/social/GraduatesProfile";
import Verifycation from "./views/Verifycation";
import ForumView from "./views/forums/ForumView";
import EventView from "./views/events/EventView";


/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recover-password",
    element: (
      <ProtectedRoute>
        <Recover />
      </ProtectedRoute>
    ),
  },
  {
    path: "/landing",
    element: (
      <ProtectedRoute>
        <Landing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/graduates",
    element: (
      <ProtectedRoute>
        <Graduates />
      </ProtectedRoute>
    ),
  },
  {
    path: "/graduates/:username",
    element: (
      <ProtectedRoute>
        <GraduatesProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forums",
    element: (
      <ProtectedRoute>
        {" "}
        <Forums />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events/:event",
    element: (
      <ProtectedRoute>
        <EventView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/proyects",
    element: (
      <ProtectedRoute>
        <Proyects />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/config",
    element: (
      <ProtectedRoute>
        <Config />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <ProtectedRoute>
        <Verifycation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forums/:forum",
    element: (
      <ProtectedRoute>
        <ForumView />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <h2 className="text-3xl font-bold underline font-barlow-condensed">
        {" "}
        Pagina de Error
      </h2>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifySesion());
  }, []);

  return (
    <>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </>
  );
}

export default App;
