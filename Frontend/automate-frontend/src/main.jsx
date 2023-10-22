import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Register from './Register.jsx'
import Login from './Login.jsx'
import App from './App.jsx'
import MyMapWithAutocomplete from './AutoComplete.jsx'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
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




