const express = require("express");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const cors = require("cors");

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

// Simple authentication
app.get("/private", keycloak.protect(), function(req, res) {
  try {
    res.json({ message: "Test of the protected route" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, function() {
  console.log("Listening at http://localhost:5000");
});
