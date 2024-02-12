const express = require('express')
const app = express()
const port = 2000;
const morgan = require('morgan')
const members = require('./members')
const users = require('./users')
const moment = require('moment');
const abouts = require('./about')

// middleware Log
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({
  status: "success",
  message: `this is the firs page`,
  Date: moment().format('MMMM Do YYYY, h:mm:ss a'),
}));

app.get("/about", (req, res) => res.json({
  status: "success",
  message: "response success",
  Description: "Exercise #03",
  Date: moment().format(),
  Data: members,
}));

app.get("/users", (req, res) => res.json({
  message: "success",
  Data: users,
}))

app.listen(port, () => 
    console.log(`Server running at https://localhost:${port}`)
);