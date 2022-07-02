import Model from './Model.js';

export default class Author extends Model {
    constructor(authorData) {
        super();
        this.id = authorData.id;
        this.name = authorData.name;
    }

    static async get(id) {
        const sql = `SELECT * from authors WHERE id = ${id}`;
        const [author] = await Model.executeQuery(sql);
        if (author) return author;
        return null;
    }

    static async getByName(name) {
        const sql = `SELECT * from authors WHERE name = '${name}'`;
        const [author] = await Model.executeQuery(sql);
        if (author) return author;
        return null;
    }

    static getAllAuthors() {
        const sql = 'SELECT * FROM authors as authors';
        return Model.executeQuery(sql);
    }

    save() {
        const sql = `INSERT INTO authors(name) VALUES('${this.name}')`;
        return Model.executeQuery(sql);
    }

    static update(id, authorData) {
        const sql = `UPDATE authors
           SET ${Model.mapToSqlUpdateSyntax(authorData)}
           WHERE id = '${id}'`;
        return Model.executeQuery(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM authors WHERE id = ${id}`;
        const result = await Model.executeQuery(sql);
        return result.affectedRows;
    }
}