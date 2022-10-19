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
                const query1 = `
                    CREATE TABLE IF NOT EXISTS "${process.env.PG_SCHEMA}"."user" (
                        id SERIAL, username VARCHAR(128), password VARCHAR(128), admin BOOLEAN DEFAULT FALSE, 
                        PRIMARY KEY(id)
                    );
                    CREATE TABLE IF NOT EXISTS "${process.env.PG_SCHEMA}"."wine" (
                        id SERIAL,
                        barcode VARCHAR(128),
                        name VARCHAR(128),
                        description TEXT,
                        color VARCHAR(32),
                        year VARCHAR(16),
                        estate VARCHAR(128),
                        variety VARCHAR(128),
                        appellation VARCHAR(128),
                        winemaker VARCHAR(128),
                        price NUMERIC,
                        capacity VARCHAR(16),
                        bio BOOLEAN,  
                        PRIMARY KEY(id)
                    );
                `;
                await DB.client.query(query1);
                const query2 = `
                    CREATE TABLE IF NOT EXISTS ${process.env.PG_SCHEMA}.comment (
                        id SERIAL,
                        text TEXT,
                        rating INTEGER,
                        author INTEGER,
                        wine INTEGER,
                        PRIMARY KEY(id),
                        FOREIGN KEY(author) REFERENCES "${process.env.PG_SCHEMA}"."user"(id) ON DELETE CASCADE,
                        FOREIGN KEY(wine) REFERENCES "${process.env.PG_SCHEMA}"."wine"(id) ON DELETE CASCADE
                    );
                `;
                await DB.client.query(query2);
            } catch (err) {
                console.error(err);
                console.error("Exit application...");
                process.exit(-1);
            }
        }
        return DB.client;
    }
}
