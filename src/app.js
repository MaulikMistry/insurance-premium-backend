const express = require("express")
const cors = require("cors")
const morgan = require('morgan')

const authRouter = require("./routes/auth.route");
// const developmentConfig = require("../config/development.config");
const db = require("../config/db.config");
let session = require('express-session');
const vehicleTypeRoute = require("./routes/vehicleType.route");
const vehicleCategoryRoute = require("./routes/vehicleCategory.route");
const clientRouter = require("./routes/clients.route");
const managerRouter = require("./routes/manager.route");
const schemeRoute = require("./routes/scheme.route");
const policyRoute = require("./routes/policy.route");
const premiumRoute = require("./routes/premium.route");

const app = express()

var corsOptions = {
    origin: "http://localhost:3000",
};

// app.connect(developmentConfig)

// app.use(cors(corsOptions))
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// app.use(chalk.red(morgan(':method :url :status :res[content-length] - :response-time ms')));

app.use(express.json());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

app.use("/api/auth", authRouter)
app.use("/api/type", vehicleTypeRoute)
app.use("/api/category", vehicleCategoryRoute)
app.use("/api/client",clientRouter)
app.use("/api/manager", managerRouter)
app.use("/api/scheme",schemeRoute)
app.use("/api/policy",policyRoute)
app.use("/api/premium",premiumRoute)


app.listen(3000, () => {
    console.log("server isrunning on port 3000")
})

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});