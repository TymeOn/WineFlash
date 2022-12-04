import dotenv from 'dotenv';
import { DB } from '../DB.js';
import { Comment } from '../models/Comment.js';
import { UserDAO } from './UserDAO.js';
import { WineDAO } from './WineDAO.js   ';
dotenv.config();

export class CommentDAO {

    // get all the comments
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."comment" ORDER BY id ASC',
        };
        const result = await client.query(query);
        let data = [];
        if(result && result.rows) {
            for (const row of result.rows) {
                const comment = new Comment(
                    row.id,
                    row.text,
                    row.rating,
                    row.author,
                    row.wine
                );
                data.push(comment);
            }
        } else {
            data = null;
        }
        return data;
    }


    // get one comment
    async get(id) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."comment" WHERE id=$1 ORDER BY id ASC',
            values: [id],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new Comment(
                result.rows[0].id,
                result.rows[0].text,
                result.rows[0].rating,
                row.author,
                row.wine
            );
        }
        return data;
    }


    // get the comments linked to a wine
    async getFromWine(wineId) {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + process.env.PG_SCHEMA + '"."comment" WHERE wine=$1 ORDER BY id ASC',
            values: [wineId],
        }
        const result = await client.query(query);
        let data = [];
        if(result && result.rows) {
            for (const row of result.rows) {
                const userDao = new UserDAO();
                const a = await userDao.get(row.author)
                const comment = new Comment(
                    row.id,
                    row.text,
                    row.rating,
                    a.getUsername(),
                    row.wine
                );
                data.push(comment);
            }
        } else {
            data = null;
        }
        return data;
    }
    

    // add a new comment
    async add(text, rating, author, wine) {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + process.env.PG_SCHEMA + '"."comment"(' +
                'text, ' +
                'rating, ' + 
                'author, ' +
                'wine ' +
                ') VALUES ($1, $2, $3, $4) RETURNING *',
            values: [text, rating, author, wine],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new Comment(
                result.rows[0].id,
                result.rows[0].text,
                result.rows[0].rating,
                result.rows[0].author,
                result.rows[0].wine
            );
        } else {
            data = null;
        }
        return data;
    }


    // updates a comment
    async update(comment) {
        let data = null;
        if (await this.get(comment.getId())) {
            const client = await DB.open();
            const query = {
                text: 'UPDATE "' + process.env.PG_SCHEMA + '"."comment" SET ' + 
                    'text=$2, ' +
                    'rating=$3, ' +
                    'author=$4, ' +
                    'wine=$5, ' +
                    'WHERE id=$1 RETURNING *',
                values: [
                    comment.getId(),
                    comment.getText(),
                    comment.getRating(),
                    comment.getAuthor(),
                    comment.getWine(),
                ],
            }
            const result = await client.query(query);
            if(result && result.rows && result.rows[0]) {
                data = new Comment(
                    result.rows[0].id,
                    result.rows[0].text,
                    result.rows[0].rating,
                    result.rows[0].author,
                    result.rows[0].wine,
                );
            }
        }
        return data;
    }

    // removes a comment
    async remove(commentId) {
        let data = null;
        const client = await DB.open();
        const query = {
            text: 'DELETE FROM "' + process.env.PG_SCHEMA + '"."comment" WHERE id=$1 RETURNING *',
            values: [commentId],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new Comment(
                result.rows[0].id,
                result.rows[0].text,
                result.rows[0].rating,
                result.rows[0].author,
                result.rows[0].wine,
            );
        }
        return data;
    }

}
