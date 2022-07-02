import * as mysql from 'mysql';

export default class DbConnection {
    static db;

    static connect() {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: 'backend-challenge_db',
                user: 'dbuser',
                password: 'dbpass',
                database: 'backendChallenge',
            });

            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    DbConnection.db = connection;
                    resolve(connection);
                }
            });
        });
    }
};
