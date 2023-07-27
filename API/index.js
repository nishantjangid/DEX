const bodyParser = require("body-parser");
const express = require("express");
const errorHandler = require("./middelwares/errorHandler");

const app = express();
require("dotenv").config();

// app utitlies
app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

// ROUTES
app.use("/",require("./routes/transactions"));

app.listen(process.env.PORT,()=>{
    console.log(`Enjoy your life on ${process.env.PORT}`);
})