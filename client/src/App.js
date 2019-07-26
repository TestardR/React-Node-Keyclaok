import React from "react";
import "./App.css";
import Private from "./components/Private";
import AdminRealm from "./components/AdminRealm";
import AdminClient from "./components/AdminClient";

function App({ keycloak }) {
  const logout = () => {
    keycloak.logout();
  };

  return (
    <div className="App">
      Hello KeyClaok
      <Private />
      <AdminRealm />
      <AdminClient />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
