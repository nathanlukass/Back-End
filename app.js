const express = require('express');
const morgan = require('morgan');
const users = require('./users');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ status: "error", message: "resource tidak ditemukan" });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ status: "error", message: "resource tidak ditemukan" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "error", message: "terjadi kesalahan pada server" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
