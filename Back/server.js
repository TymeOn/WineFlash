import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { User } from './src/models/User.js';
import { UserDAO } from './src/dao/UserDAO.js';
import { Wine } from './src/models/Wine.js';
import { WineDAO } from './src/dao/WineDAO.js';
import { Comment } from './src/models/Comment.js';
import { CommentDAO } from './src/dao/CommentDAO.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// GENERAL SETUP
// ---------

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESSOURCE_NOT_FOUND = "The requested ressource is not available."



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

const userDAO = new UserDAO();
const wineDAO = new WineDAO();
const commentDAO = new CommentDAO();



// JWT TOKEN MANAGEMENT
// --------------------

function generateJWT(username) {
    return jwt.sign({data: username}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE });
}

function generateRefreshJWT(username) {
    return jwt.sign({data: username}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_LIFE });
}
  


// AUTHENTICATION MIDDLEWARE
// -------------------------

const authenticationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};


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
                res.status(201).send(await userDAO.register(new User(0, body.username, hash, false)));
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
                res.json({
                    token: generateJWT(req.body.username),
                    refresh: generateRefreshJWT(req.body.username)
                });
            } else {
                return res.status(401).json({ message: 'Error. Wrong login or password' });
            }
        });

    } catch (err) {
        // error handling
        res.status(500).send({errName: err.name, errMessage: err.message});
    }  
});


app.post('/refresh', async (req, res) => {
    try {
        const body = req.body;

        // check for valid input
        if (!body.username || !body.refresh) {
            return res.status(400).json({ message: 'Error. Please enter the correct username and refresh token' })
        }

        if (jwt.verify(body.refresh, process.env.JWT_REFRESH_SECRET)) {
            const token = generateJWT(body.username);
            return res.status(200).json({ token: token });
        } else {
            return res.status(401).json({ message: 'Error. Invalid refresh token' });
        }

    } catch (err) {
        // error handling
        res.status(500).send({errName: err.name, errMessage: err.message});
    }  
});



// READ
// ----

app.get('/wines', async(req, res) => {
    try {
        res.send(await wineDAO.getAll());
    } catch (err) { 
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/wines/:id', async(req, res) => {
    try {
        const data = await wineDAO.get(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/wine-from-barcode/:barcode', async(req, res) => {
    try {
        console.log(req.params.barcode);
        const data = await wineDAO.getFromBarcode(req.params.barcode);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/comments', authenticationMiddleware, async(req, res) => {
    try {
        res.send(await commentDAO.getAll());
    } catch (err) { 
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/comments/:id', authenticationMiddleware, async(req, res) => {
    try {
        const data = await commentDAO.get(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});



// CREATE
// ------

app.post('/wines', async(req, res) => {
    try {
        const body = req.body;
        res.status(201).send(await wineDAO.add(
           body.barcode,
           body.template,
           body.name,
           body.description,
           body.color,
           body.year,
           body.estate,
           body.variety,
           body.appellation,
           body.winemaker,
           body.price,
           body.capacity,
           body.bio
        ));
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.post('/comments', authenticationMiddleware, async(req, res) => {
    try {
        const body = req.body;
        res.status(201).send(await commentDAO.add(
            body.text,
            body.rating,
            new User(body.user.id, body.user.username, '', body.user.admin),
            new Wine(
                body.wine.id,
                body.wine.barcode,
                body.wine.template,
                body.wine.name,
                body.wine.description,
                body.wine.color,
                body.wine.year,
                body.wine.estate,
                body.wine.variety,
                body.wine.appellation,
                body.wine.winemaker,
                body.wine.price,
                body.wine.capacity,
                body.wine.bio
            ),
        ));
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});



// UPDATE
// ------

app.put('/wines/:id', async(req, res) => {
    try {
        const body = req.body;
        const data = await wineDAO.update(new Wine(
            req.params.id,
            body.barcode,
            body.template,
            body.name,
            body.description,
            body.color,
            body.year,
            body.estate,
            body.variety,
            body.appellation,
            body.winemaker,
            body.price,
            body.capacity,
            body.bio
        ));
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.put('/comments/:id', authenticationMiddleware, async(req, res) => {
    try {
        const body = req.body;
        const data = await commentDAO.update(new Comment(
            req.params.id,
            body.text,
            body.rating,
            new User(body.user.id, body.user.username, '', body.user.admin),
            new Wine(
                body.wine.id,
                body.wine.barcode,
                body.wine.template,
                body.wine.name,
                body.wine.description,
                body.wine.color,
                body.wine.year,
                body.wine.estate,
                body.wine.variety,
                body.wine.appellation,
                body.wine.winemaker,
                body.wine.price,
                body.wine.capacity,
                body.wine.bio
            ),
        ));
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});



// DELETE
// ------

app.delete('/wines/:id', async(req, res) => {
    try {
        const data = await wineDAO.remove(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.delete('/comments/:id', authenticationMiddleware, async(req, res) => {
    try {
        const data = await commentDAO.remove(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});




// STARTUP
// -------

app.listen(process.env.PORT, () => {
    console.log('WineFlash-Back running on port ' + process.env.PORT);
});