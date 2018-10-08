import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const http = require('http').createServer(app);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gpoinappdb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use("/public", express.static('public'));

// Routes Controllers
const HomeCtrl = require('./controllers/__HomeCtrl__');
const DetailCtrl = require('./controllers/__DetailCtrl__');

// API Controllers
const GetRewardByIdCtrl = require('./controllers/__GetRewardByIdCtrl__');

// Routes
app.get('/', HomeCtrl);
app.get('/detail/:id', DetailCtrl);

// API Endpoint
app.get('/api/getRewardById/:id', GetRewardByIdCtrl.getRewardById);

http.listen(3000, () => {
    console.log('Server listen on port 3000');
});