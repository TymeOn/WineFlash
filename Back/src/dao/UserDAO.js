import dotenv from 'dotenv';
import { DB } from '../DB.js';
import { User } from '../models/User.js'
dotenv.config();

export class UserDAO {

    // register a new user in the DB
    async register(user) {
        const client = await DB.open();
            const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."user"(username, password, admin) VALUES ($1, $2, $3) RETURNING *',
            values: [user.getUsername(), user.getPassword(), user.isAdmin()],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new User(result.rows[0].id, result.rows[0].username, result.rows[0].password, result.rows[0].admin)
        } else {
            data = null;
        }
        return data;
    }


    // check if the user exists in the DB
    async getHashedPassword(username) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."user" WHERE username=$1',
            values: [username]
        };
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new User(
                result.rows[0].id,
                result.rows[0].username,
                result.rows[0].password,
                result.rows[0].admin
            );
        }
        return data;
    }


    // get all the users
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."user" ORDER BY id ASC',
        };
        const result = await client.query(query);
        let data = [];
        if(result && result.rows) {
            for (const row of result.rows) {
                const user = new User(
                    row.id,
                    row.username,
                    row.password,
                    row.admin
                );
                data.push(user);
            }
        } else {
            data = null;
        }
        return data;
    }

    // get one user
    async get(id) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."user" WHERE id=$1 ORDER BY id ASC',
            values: [id],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new User(
                result.rows[0].id,
                result.rows[0].username,
                result.rows[0].password,
                result.rows[0].admin
            );
        }
        return data;
    }

}
