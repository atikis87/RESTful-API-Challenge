import DBConnection from '../database/DbConnection.js';

export default class Model {
    save() {
        throw new Error('Need to implement in child method!');
    }

    static executeQuery(sql) {
        return new Promise((resolve, reject) => {
            DBConnection.db.query(sql, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    static mapToSqlUpdateSyntax(obj) {
        return Object.keys(obj).map(key => `${key}='${obj[key]}'`).join(',');
    }
}
