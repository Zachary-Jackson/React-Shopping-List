import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";

import App from "./app.js";

import "./styles.css";

function Root() {
  /**
   * In order to use react-cookie, we need to wrap <App /> with
   * <CookiesProvider>
   */
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
