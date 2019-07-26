import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Keycloak from "keycloak-js";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

//keycloak init options
/* let initOptions = {
  url: "http://localhost:8080/auth",
  realm: "test",
  clientId: "Front",
  onLoad: "login-required"
}; */

let keycloak = new Keycloak("/keycloak.json");

keycloak
  .init({ onLoad: "login-required" })
  .success(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;
    //React Render
    ReactDOM.render(
      <App keycloak={keycloak} />,
      document.getElementById("root")
    );

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
      keycloak
        .updateToken(70)
        .success(refreshed => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .error(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  })
  .error(() => {
    console.error("Authenticated Failed");
  });

serviceWorker.unregister();
