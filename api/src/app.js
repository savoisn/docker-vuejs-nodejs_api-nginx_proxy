const Keycloak = require('keycloak-connect');
const express = require('express')
const session = require('express-session');
const cors = require('cors');
const path = require("path");
const app = express();

app.use(express.static(__dirname));

app.use(cors());

var memoryStore = new session.MemoryStore();

var keycloak = new Keycloak({ store: memoryStore });

app.use(session({
    secret:'thisShouldBeLongAndSecret',                         
    resave: false,                         
    saveUninitialized: true,                         
    store: memoryStore                       
})); 

app.use(keycloak.middleware());
app.use( keycloak.middleware( { logout: '/'} ));

app.get('/api/hello', keycloak.protect(), (req, res) => {
  hello = {
    who:"World!",
    with:"Love",
    and:"Passion"
  }
  res.send(hello)
})

app.get('/api/test', (req, res) => res.send({test:"Dummy"}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
