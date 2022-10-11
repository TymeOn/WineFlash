import dotenv from 'dotenv';
import { DB } from '../DB.js';
import { User } from '../models/User.js'
dotenv.config();

export class UserDAO {

    // register a new user in the DB
    async register(user) {
        const client = await DB.open();
            const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."user"(username, password) VALUES ($1, $2) RETURNING *',
            values: [user.getUsername(), user.getPassword()],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new User(result.rows[0].username, result.rows[0].password)
        } else {
            data = null;
        }
        return data;
    }


    // check if the user exists in the DB
    async getHashedPassword(username) {
        const client = await DB.open();
        const query = {
            text: 'SELECT password, admin FROM "' + process.env.PG_SCHEMA + '"."user" WHERE username=$1',
            values: [username]
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = {password: result.rows[0].password, isAdmin: result.rows[0].admin};
        } else {
            data = null;
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
                );
                data.push(user);
            }
        } else {
            data = null;
        }
        return data;
    }

}
