const express = require("express");
const bodyParser = require("body-parser");
const staticFiles = require("./middleware/staticFiles");
const morganLogger = require("./middleware/morganLogger");
const corsHandler = require("./middleware/corshandler");
const fileUpload = require("./middleware/fileupload");
const path = require("./middleware/path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing body dari request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk menangani file statis
app.use(staticFiles);

// Middleware untuk menangani upload file
app.use(fileUpload);

// Middleware untuk menangani CORS
app.use(corsHandler);

// Middleware untuk logging menggunakan Morgan
app.use(morganLogger);

// Endpoint untuk data
app.get("/data", (req, res) => {
  res.json({ message: "Data from servers " });
});

// Middleware untuk penanganan error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
