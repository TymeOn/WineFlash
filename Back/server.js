import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import https from 'https';
import { User } from './src/models/User.js';
import { UserDAO } from './src/dao/UserDAO.js';
import bcrypt from 'bcrypt';



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



// USER OPERATIONS
// ---------------

app.post('/register', async (req, res) => {
    try {
        const body = req.body;

        // check for valid input
        if (!body.username || !body.password) {
            return res.status(400).json({ message: 'Error. Please enter an username and a password' })
        }

        // user creation (if it does not already exists)
        const tempUser = await userDAO.getHashedPassword(body.username);
        if(!tempUser) {
            bcrypt.hash(body.password, parseInt(process.env.SALT_ROUNDS), async(err, hash) => {
                res.status(201).send(await userDAO.register(new User(body.username, hash)));
            });
        } else {
            res.status(500).send({ message: 'Error. This username is already taken' });
        }

    } catch (err) {
        // error handling
        res.status(500).send({errName: err.name, errMessage: err.message});
    } 
});


app.post('/login', async (req, res) => {
    try {
        const body = req.body;

        // check for valid input
        if (!body.username || !body.password) {
            return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
        }

        // check if the input matches an user in the DB
        const data = await userDAO.getHashedPassword(body.username);
        const hashedPassword = data.password;
        if (!hashedPassword) {
            return res.status(401).json({ message: 'Error. Wrong login or password' })
        }
        bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
            if (result) {
                res.status(200).json({});
            } else {
                return res.status(401).json({ message: 'Error. Wrong login or password' })
            }
        });

    } catch (err) {
        // error handling
        res.status(500).send({errName: err.name, errMessage: err.message});
    }  
});



// STARTUP
// -------

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('WineFlash-Back running on port ' + process.env.PORT);
});
