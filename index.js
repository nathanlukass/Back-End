const http = require('http');
const abouts = require('./about');
const user = require('./users');
const moment = require('moment');


const server = http.createServer( (req, res) =>{
    res.setHeader('Content-Type', 'text/json');
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is the home page\n');
        res.write(moment().format('MMMM Do YYYY, h:mm:ss a'));
        res.end();
    }else if (req.url === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write(abouts);
        res.write(moment().format('MMMM Do YYYY, h:mm:ss a'));
        res.end();
    }else if (req.url === '/users'){
        // res.setHeader('Content-Type', 'text/plain');
        res.write(JSON.stringify({
        }))
        // res.statusCode = 200;
        // res.write(user);
         res.write(moment().format('MMMM Do YYYY, h:mm:ss a'));
        // res.end();
    };
});

const port = 2000;
const hostname = '127.0.0.1';
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});