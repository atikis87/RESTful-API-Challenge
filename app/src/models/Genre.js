import Model from './Model.js';

export default class Genre extends Model {
    constructor(genreData) {
        super();
        this.id = genreData.id;
        this.name = genreData.name;
    }

    static async get(id) {
        const sql = `SELECT * from genre WHERE id = ${id}`;
        const [genre] = await Model.executeQuery(sql);
        if (genre) return genre;
        return null;
    }

    static async getByName(name) {
        const sql = `SELECT * from genre WHERE name = '${name}'`;
        const [genre] = await Model.executeQuery(sql);
        if (genre) return genre;
        return null;
    }

    static getAllGenre() {
        const sql = 'SELECT * FROM genre as genre';
        return Model.executeQuery(sql);
    }

    save() {
        const sql = `INSERT INTO genre(name) VALUES('${this.name}')`;
        return Model.executeQuery(sql);
    }

    static update(id, genreData) {
        const sql = `UPDATE genre
           SET ${Model.mapToSqlUpdateSyntax(genreData)}
           WHERE id = '${id}'`;
        return Model.executeQuery(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM genre WHERE id = ${id}`;
        const result = await Model.executeQuery(sql);
        return result.affectedRows;
    }
}