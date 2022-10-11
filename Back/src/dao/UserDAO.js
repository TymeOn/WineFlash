import dotenv from 'dotenv';
import { DB } from '../DB.js';
import { User } from '../models/User.js'
dotenv.config();

export class UserDAO {

    // check if the user exists in the DB
    async getHashedPassword(username) {
        const client = await DB.open();
        const query = {
            text: 'SELECT password FROM "' + process.env.PG_SCHEMA + '"."users" WHERE username=$1',
            values: [username]
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = result.rows[0].pass;
        } else {
            data = null;
        }
        return data;
    }

    // get all the users
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."users" ORDER BY id ASC',
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

    // DEBUG : add a new user
    async add() {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."users"(username, password) VALUES ($1, $2) RETURNING *',
            values: ['johnceri', ''],
        };
        const result = await client.query(query);
        return result;
    }

}
