require("dotenv").config();
require("./db/connection");

const express = require("express")

const app = express()

app.use(express.json());

app.listen(5001, () => console.log("Server is listening"));

