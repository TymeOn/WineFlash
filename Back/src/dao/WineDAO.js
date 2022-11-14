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
                    row.template,
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
                result.rows[0].template,
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


    // get one wine from its barcode
    async getFromBarcode(barcode) {
        let data = null;

        const format = new Array(barcode.length + 1).join('_');

        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."wine" WHERE template LIKE $1 ORDER BY id ASC',
            values: [format],
        }
        const result = await client.query(query);
        if(result && result.rows) {
            for (const row of result.rows) {

                const matches = row.template.match(/A+/);
                const begin = matches['index'];
                const end = matches['index'] + matches[0].length;

                const wineCode = barcode.substring(begin, end);

                if (wineCode == row.barcode) {
                    data = new Wine(
                        row.id,
                        row.barcode,
                        row.template,
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
                    break;
                }

            }
        }
        return data;
    }


    // add a new wine
    async add(barcode, template, name, description, color, year, estate, variety, appellation, winemaker, price, capacity, bio) {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."wine"(' +
                'barcode, ' +
                'template, ' +
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
                ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            values: [barcode, template, name, description, color, year, estate, variety, appellation, winemaker, price, capacity, bio],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new Wine(
                result.rows[0].id,
                result.rows[0].barcode,
                result.rows[0].template,
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
                    'template=$3, ' +
                    'name=$4, ' +
                    'description=$5, ' +
                    'color=$6, ' +
                    'year=$7, ' +
                    'estate=$8, ' +
                    'variety=$9, ' +
                    'appellation=$10, ' +
                    'winemaker=$11, ' +
                    'price=$12, ' +
                    'capacity=$13, ' +
                    'bio=$14 ' +
                    'WHERE id=$1 RETURNING *',
                values: [
                    wine.getId(),
                    wine.getBarcode(),
                    wine.getTemplate(),
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
                    result.rows[0].template,
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
                result.rows[0].template,
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
