import React from "react";
import "./App.css";
import Private from "./components/Private";
import Admin from "./components/Admin";

function App({ keycloak }) {
  const logout = () => {
    keycloak.logout();
  };

  return (
    <div className="App">
      Hello KeyClaok
      <Private />
      <Admin />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
