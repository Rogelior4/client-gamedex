import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento raíz con id 'root'");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
