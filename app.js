require("dotenv").config();
const studentRoutes = require('./routes/students/studentRoutes');
const departmentRoutes = require('./routes/students/departmentRoutes');

const mongoose = require("mongoose");
const db = require("./db/index");
const express =require("express");
const app = new express()

const port = process.env.PORT || 8080;

db();
app.use(express.json());
app.use("/students", departmentRoutes); 
app.use("/students", studentRoutes); 

app.listen(port,() =>{
    console.log(`Express app listening at http://localhost:${port}`)
});