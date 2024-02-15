const express = require('express');
const morgan = require('morgan');
const users = require('./users');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Endpoint untuk memberikan list data users
app.get('/users', (req, res) => {
    res.json(users);
});

// Endpoint untuk memberikan data user sesuai dengan nama
app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ status: "error", message: "resource tidak ditemukan" });
    }
});

// Penanganan 404 Route
app.use((req, res, next) => {
    res.status(404).json({ status: "error", message: "resource tidak ditemukan" });
});

// Penanganan Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "error", message: "terjadi kesalahan pada server" });
});

// Mulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
