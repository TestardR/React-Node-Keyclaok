const express = require("express");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const cors = require("cors");
const config = require("config");

const app = express();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

//session
app.use(
  session({
    secret: "thisIsMySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

// Middlewares
app.use(express.json({ extended: false }));
app.use(cors());
app.use(keycloak.middleware());

// Unprotected route
app.get("/public", function(req, res) {
  res.json({ message: "Hello from public API" });
});

// Simple authorization
app.get("/private", keycloak.protect(), function(req, res) {
  try {
    res.json({ message: "Test of a private route" });
  } catch (error) {
    console.log(error);
  }
});

// Advanced authorization with roles
// Realm roles : admin at the realm level
app.get("/realm", keycloak.protect("realm:admin"), function(req, res) {
  res.json({ message: "Hello from a realm/admin route" });
});

// Client roles: admin at the client level
app.get("/client", keycloak.protect("admin"), function(req, res) {
  res.json({ message: "Hello from a client/admin route" });
});

app.listen(5000, function() {
  console.log("Listening at http://localhost:5000");
});
