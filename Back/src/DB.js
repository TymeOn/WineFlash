import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export class DB {
    static async open() {
        if (DB.client == null) {
            try {
                const pool = new pg.Pool({
                    user: process.env.PG_USER,
                    password: process.env.PG_PASS,
                    database: process.env.PG_NAME,
                    host: process.env.PG_HOST,
                    port: process.env.PG_PORT
                });
                DB.client = await pool.connect();
                console.log("Connected to PG DB");
            } catch (err) {
                console.error(err);
                console.error("Exit application...");
                process.exit(-1);
            }
        }
        return DB.client;
    }
}
