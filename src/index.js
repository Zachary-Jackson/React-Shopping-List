import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";

import App from "./app.js";

import "./styles.css";

function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
