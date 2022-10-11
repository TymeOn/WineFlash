import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import https from 'https';
import { User } from './src/models/User.js';
import { UserDAO } from './src/dao/UserDAO.js'


// GENERAL SETUP
// ---------

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// EXPRESS SETUP
// -------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

const options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem')
};

const userDAO = new UserDAO();


// ROUTES
// ------

app.get('/test', async(req, res) => {
    try {
        console.log('Request received')
        return res.status(200).json({});
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});


// STARTUP
// -------

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('WineFlash-Back running on port ' + process.env.PORT);
});
