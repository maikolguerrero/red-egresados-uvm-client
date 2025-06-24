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
import ProjectView from "./views/projects/ProjectView";
import Notifications from "./views/profile/Notifications";
import Config from "./views/profile/Config";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { verifySesion } from "./services/auth/authService";
import { SnackbarProvider } from "notistack";
import GraduatesProfile from "./views/social/GraduatesProfile";
import Verifycation from "./views/Verifycation";
import ForumView from "./views/forums/ForumView";
import EventView from "./views/events/EventView";
import Chat from "./views/social/Chat";
import socketService from "./services/socket.service";
import { URL_API } from "./config";


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
    path: "/proyects/:proyect",
    element: (
      <ProtectedRoute>
        <ProjectView />
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
    path: "/chat/:username",
    element: (
      <ProtectedRoute>
        <Chat />
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
  // const { isConnected, isAuthenticated } = useSelector((state) => state.socket);
  // const authLoading = useSelector((state) => state.auth.loading);
  const { isConnected } = useSelector((state) => state.socket);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const sessionActive = useSelector((state) => state.auth.sessionActive);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // let isMounted = true;

    const initializeAuthAndSocket = async () => {
        try {
            await dispatch(verifySesion()).unwrap();

            
            if (sessionActive && !isConnected) {

              
                socketService.connect();
                
                // Cuando se conecte, obtener lista de usuarios online
                const checkConnection = setInterval(() => {
                    if (socketService.isConnected) {
                        clearInterval(checkConnection);
                        socketService.getOnlineUsers();
                    }
                }, 500);
            }

            if (!sessionActive && isConnected) {
                await socketService.manualDisconnect('not_authenticated');
            }
        } catch (error) {
            console.error('Error inicializando:', error);
            if (isConnected) {
                await socketService.manualDisconnect('init_error');
            }
        }
    };

    const handleBeforeUnload = () => {
        if (isConnected) {
            const data = JSON.stringify({ 
                userId: auth.id, 
                type: 'window_closed' 
            });
            navigator.sendBeacon(`${URL_API}/api/socket/disconnect`, data);
            socketService.manualDisconnect('window_closed');
        }
    };

    // if (!sessionActive) {
        initializeAuthAndSocket();
        window.addEventListener('beforeunload', handleBeforeUnload);
    // }

    return () => {
        // isMounted = false;
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [dispatch, sessionActive, isConnected, auth.id]);

  return (
    <>
      <SnackbarProvider>
        
        <RouterProvider router={router} />
      </SnackbarProvider>
    </>
  );
}

export default App;
