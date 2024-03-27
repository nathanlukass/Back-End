const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public" });
const cors = require("cors");
const db = require("./db");
//Middleware untuk menangani Log
// app.use((req, res, next) => {
//   console.log(`${Date.now()} - ${req.ip} - ${req.originalUrl}`);
//   next();
// });
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//   })
// );
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.static(path.join(__dirname, "public")));

app.get("/students", async (req, res) => {
  try {
    // const result = await db.query("SELECT * FROM students");
    const allStudent = await prisma.students.findMany();
    console.log(allStudent);
    res.status(200).json({
      status: "Data semua Mahasiswa berhasil di temukan",
      data: allStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    // const result = await db.query(
    //   `insert into students (name, address) values ('${name}', '${address}')`
    // );
    await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data Mahasiswa berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID

app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await prisma.students.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Data Mahasiswa tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, address } = req.body;

  try {
    const updatedStudent = await prisma.students.update({
      where: {
        id: parseInt(studentId),
      },
      data: {
        name: name,
        address: address,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data Mahasiswa berhasil diperbarui",
      data: updatedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete student by ID

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await prisma.students.delete({
      where: {
        id: parseInt(studentId),
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data Mahasiswa berhasil dihapus",
      data: deletedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
