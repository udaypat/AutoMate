import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// import Register from './extra_pages/Register.jsx'
// import Login from "./extra_pages/Login.jsx";
import SiginIn from "./Signin.jsx";

import Landing from "./Landing.jsx";

import App from './App.jsx'
import EditProfile from './EditProfile.jsx'
import MyMapWithAutocomplete from './AutoComplete.jsx'

import './index.css'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <SiginIn />,
  },
  {
    path: "/register",
    element: <Landing />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <EditProfile />,
  },
  {
    path: "/autocomplete",
    element: <MyMapWithAutocomplete />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




