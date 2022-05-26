const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors=require("cors");
const errorHandler=require("./middleware/error");
const connectDatabase = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDatabase();

const ofertaLaboral = require("./rutas/ofertaLaboral");
const empresa=require('./rutas/empresa');
const auth=require('./rutas/auth');
const usuario=require('./rutas/usuario');
const adminRoutes = require('./rutas/admin');
const {verifyToken} = require('./middleware/validateToken');

const createRoles=require("./libs/initialSetup") ;

const app = express();

app.use(express.json());

createRoles.createRoles();

var corsOptions = {
  origin: '*', // Reemplazar con dominio
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/EmpresaOfertaLaboral",empresa);
app.use("/api/ofertaLaboral", ofertaLaboral);
app.use("/api/auth",auth);
app.use("/api/user",usuario);
app.use("/api/admin",verifyToken,adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server=app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

process.on('unhandledRejection',(err,promise)=>{
  console.log('Errores',err.message);
  server.close(()=>{process.exit(1)});

});