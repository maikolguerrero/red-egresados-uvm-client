import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-3xl font-bold underline font-barlow-condensed">Hola mundo!</h1>,
  },
  {
    path: "/login",
    element: <Login />,
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
