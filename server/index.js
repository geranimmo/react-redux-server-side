import express from 'express';
import mongoose from 'mongoose';

const app = express();
const http = require('http').createServer(app);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gpoinappdb', { useNewUrlParser: true });

app.use("/public", express.static('public'));

// Routes Controllers
const HomeCtrl = require('./controllers/__HomeCtrl__');
const DetailCtrl = require('./controllers/__DetailCtrl__');

// Routes
app.get('/', HomeCtrl);
app.get('/detail/:id', DetailCtrl);

http.listen(3000, () => {
    console.log('Server listen on port 3000');
});