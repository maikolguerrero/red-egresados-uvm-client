import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { startSessionChecker, stopSessionChecker } from "./services/refreshToken/sessionInterceptor";
import Layout from "./Components/Layout";
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
import socketService from "./services/socket/socket.service";
import { URL_API } from "./config";
import ContentManager from "./views/admin/ContentManager";
import CMLandingPage from "./views/admin/CMLandingPage";
import CMHomePage from "./views/admin/CMHomePage";
import CMAcademicRequests from "./views/admin/CMAcademicRequests";
import ChangeEmail from "./views/ChangeEmail";
import ChangePassword from "./views/ChangePassword";
import { getContentFooter } from "./services/admin/landingService";
import { getContentAcademicRequests } from "./services/admin/academicRequestsService";
import Reports from "./views/admin/Reports";
import VerifyAlumni from "./views/alumni/VerifyAlumni";
import Admins from "./views/admin/Admins";
import RecoveryEmail from "./views/RecoveryEmail";
import ManageGraduates from "./views/admin/ManageGraduates";
import SendNotification from "./views/admin/SendNotification";
import Error404 from "./views/Error404";
import { Navigate } from "react-router-dom";
import logger from "./utils/logger";
import ForumsPersonals from "./views/social/ForumsPersonals";
import ProyectsPersonals from "./views/social/ProyectsPersonals";
import ProyectsPersonalsColaborator from "./views/social/ProyectsPersonalsColaborator";

function App() {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.socket);
  const sessionActive = useSelector((state) => state.auth.sessionActive);
  const auth = useSelector((state) => state.auth);
  const checked = useSelector((state) => state.auth.checked);


  const renderSessionActive = (Route) => {
    if (!checked) {
      return <Navigate to={window.location.pathname} />;
    }
    if (sessionActive) {
      return <Route />;
    }
    return <Navigate to="/" />;
  }

  /*Enrutador de la web*/
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <VerifyAlumni />
        </ProtectedRoute>
      ),
    },
    {
      path: "/verify-alumni",
      element: (
        <ProtectedRoute>
          <VerifyAlumni />
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
      path: "/recover/change-email",
      element: (
        <ProtectedRoute>
          <RecoveryEmail />
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
          {renderSessionActive(Landing)}
        </ProtectedRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Home)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/graduates",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Graduates)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/graduates/:username",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(GraduatesProfile)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/forum",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Forums)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/forums/personal/:username",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ForumsPersonals)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/forum/:forum",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ForumView)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/events",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Events)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/events/:event",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(EventView)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/projects",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Proyects)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/projects/personal/:username",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ProyectsPersonals)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/projects/personal-colaborator/:username",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ProyectsPersonalsColaborator)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/projects/:project",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ProjectView)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/notifications",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Notifications)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/config",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Config)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/my-profile",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(MyProfile)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/reset-password",
      element: (
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute >
      ),
    },
    {
      path: "/verify-email",
      element: (
        <ProtectedRoute>
          <Verifycation />
        </ProtectedRoute >
      ),
    },
    {
      path: "/verify-email-change",
      element: (
        <ProtectedRoute>
          <ChangeEmail />
        </ProtectedRoute >
      ),
    },
    {
      path: "/config/reports",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Reports)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/config/admins",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Admins)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/config/graduates",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ManageGraduates)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/config/notification",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(SendNotification)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/content-manager",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(ContentManager)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/content-manager/landing",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(CMLandingPage)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/content-manager/home",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(CMHomePage)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/content-manager/academic-requests",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(CMAcademicRequests)}
          </Layout>
        </ProtectedRoute >
      ),
    },
    {
      path: "/chat/:username",
      element: (
        <ProtectedRoute>
          <Layout>
            {renderSessionActive(Chat)}
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: (
        <Error404 />
      ),
    },
  ]);

  useEffect(() => {
    dispatch(verifySesion());
    dispatch(getContentFooter());
    dispatch(getContentAcademicRequests());
    // await dispatch(verifySesion()).unwrap();
  }, []);

  useEffect(() => {
    // Iniciar el verificador de sesión
    // const cleanupSessionChecker = startSessionChecker();

    const initializeAuthAndSocket = async () => {
      try {
        // await dispatch(verifySesion()).unwrap();

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
        logger.error('Error inicializando:', error);
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

    initializeAuthAndSocket();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // cleanupSessionChecker();
      if (sessionActive) {
        startSessionChecker();
      }
      // startSessionChecker();

      stopSessionChecker();
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