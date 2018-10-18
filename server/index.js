import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

const app = express();
const http = require('http').createServer(app);

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/gpoinappdb', { useNewUrlParser: true });
const pgp = require('pg-promise')();
const dbConfig = {
    user: 'postgres',
    password: 'root',
    database: 'poin_db_local',
    host: 'localhost',
    port: 5432
};
const db = pgp(dbConfig);
exports.db = db;

app.use(bodyParser.json());
app.use("/public", express.static('public'));
app.use(favicon(__dirname + './../public/favicon.ico'));

// Routes Controllers
const HomeCtrl = require('./controllers/__HomeCtrl__');
const RewardDetailCtrl = require('./controllers/__RewardDetailCtrl__');

// API Controllers
const GetRewardByIdCtrl = require('./controllers/api/__GetRewardByIdCtrl__');

// Routes
app.get('/', HomeCtrl);
app.get('/reward/:id/:title_split', RewardDetailCtrl);

// API Endpoint
app.get('/api/getRewardById/:id', GetRewardByIdCtrl.getRewardById);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});