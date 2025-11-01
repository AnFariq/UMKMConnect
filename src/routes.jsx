import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Contact from "./components/Contact.jsx";
import App from "./App.jsx";
import About from "./components/About.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default routes;
