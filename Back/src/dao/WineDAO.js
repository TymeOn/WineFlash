import dotenv from 'dotenv';
import { DB } from '../DB.js';
import { Wine } from '../models/Wine.js'
dotenv.config();

export class WineDAO {

    // get all the wines
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."wine" ORDER BY id ASC',
        };
        const result = await client.query(query);
        let data = [];
        if(result && result.rows) {
            for (const row of result.rows) {
                const wine = new Wine(
                    row.id,
                    row.barcode,
                    row.name,
                    row.description,
                    row.color,
                    row.year,
                    row.estate,
                    row.variety,
                    row.appellation,
                    row.winemaker,
                    row.price,
                    row.capacity,
                    row.bio
                );
                data.push(wine);
            }
        } else {
            data = null;
        }
        return data;
    }


    // get one wine
    async get(id) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."wine" WHERE id=$1 ORDER BY id ASC',
            values: [id],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new Wine(
                result.rows[0].id,
                result.rows[0].barcode,
                result.rows[0].name,
                result.rows[0].description,
                result.rows[0].color,
                result.rows[0].year,
                result.rows[0].estate,
                result.rows[0].variety,
                result.rows[0].appellation,
                result.rows[0].winemaker,
                result.rows[0].price,
                result.rows[0].capacity,
                result.rows[0].bio
            );
        }
        return data;
    }


    // add a new wine
    async add(barcode, name, description, color, year, estate, variety, appellation, winemaker, price, capacity, bio) {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."wine"(' +
                'barcode, ' +
                'name, ' + 
                'description, ' +
                'color, ' +
                'year, ' +
                'estate, ' +
                'variety, ' +
                'appellation, ' +
                'winemaker, ' +
                'price, ' + 
                'capacity, ' +
                'bio' +
                ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            values: [barcode, name, description, color, year, estate, variety, appellation, winemaker, price, capacity, bio],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new Wine(
                result.rows[0].id,
                result.rows[0].barcode,
                result.rows[0].name,
                result.rows[0].description,
                result.rows[0].color,
                result.rows[0].year,
                result.rows[0].estate,
                result.rows[0].variety,
                result.rows[0].appellation,
                result.rows[0].winemaker,
                result.rows[0].price,
                result.rows[0].capacity,
                result.rows[0].bio
            );
        } else {
        data = null;
        }
        return data;
    }

    // updates a wine
    async update(wine) {
        let data = null;
        if (await this.get(wine.getId())) {
            const client = await DB.open();
            const query = {
                text: 'UPDATE "' + process.env.PG_SCHEMA + '"."wine" SET ' + 
                    'barcode=$2, ' +
                    'name=$3, ' +
                    'description=$4, ' +
                    'color=$5, ' +
                    'year=$6, ' +
                    'estate=$7, ' +
                    'variety=$8, ' +
                    'appellation=$9, ' +
                    'winemaker=$10, ' +
                    'price=$11, ' +
                    'capacity=$12, ' +
                    'bio=$13 ' +
                    'WHERE id=$1 RETURNING *',
                values: [
                    wine.getId(),
                    wine.getBarcode(),
                    wine.getName(),
                    wine.getDescription(),
                    wine.getColor(),
                    wine.getYear(),
                    wine.getEstate(),
                    wine.getVariety(),
                    wine.getAppellation(),
                    wine.getWinemaker(),
                    wine.getPrice(),
                    wine.getCapacity(),
                    wine.isBio(),
                ],
            }
            const result = await client.query(query);
            if(result && result.rows && result.rows[0]) {
                data = new Wine(
                    result.rows[0].id,
                    result.rows[0].barcode,
                    result.rows[0].name,
                    result.rows[0].description,
                    result.rows[0].color,
                    result.rows[0].year,
                    result.rows[0].estate,
                    result.rows[0].variety,
                    result.rows[0].appellation,
                    result.rows[0].winemaker,
                    result.rows[0].price,
                    result.rows[0].capacity,
                    result.rows[0].bio
                );
            }
        }
        return data;
    }

    // removes a wine
    async remove(wineId) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'DELETE FROM "' + process.env.PG_SCHEMA + '"."wine" WHERE id=$1 RETURNING *',
            values: [wineId],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new Wine(
                result.rows[0].id,
                result.rows[0].barcode,
                result.rows[0].name,
                result.rows[0].description,
                result.rows[0].color,
                result.rows[0].year,
                result.rows[0].estate,
                result.rows[0].variety,
                result.rows[0].appellation,
                result.rows[0].winemaker,
                result.rows[0].price,
                result.rows[0].capacity,
                result.rows[0].bio
            );
        }
        return data;
    }

}
