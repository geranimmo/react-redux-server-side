import express from 'express';

const app = express();
const http = require('http').createServer(app);
app.use("/public", express.static('public'));

// Routes Controllers
const HomeCtrl = require('./controllers/__HomeCtrl__');
const DetailCtrl = require('./controllers/__DetailCtrl__');

// Routes
app.get('/', HomeCtrl);
app.get('/detail', DetailCtrl);

http.listen(3000, () => {
    console.log('Server listen on port 3000');
});