import Model from './Model.js';

export default class User extends Model {
    constructor(user) {
        super();
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.avatar = user.avatar;
        this.password = user.password;
        this.id = user.id;
    }

    static async getAllUsers() {
        const sql = 'SELECT username, email, role, id, avatar FROM users as users';
        return Model.executeQuery(sql);
    }

    static async get(id) {
        const sql = `SELECT username, email, role, id, avatar FROM users WHERE id = ${id}`;
        const [user] = await Model.executeQuery(sql);
        if (user) return user;
        return null;
    }

    save() {
        const sql = `INSERT INTO users(username,email,avatar,role,password) VALUES('${this.username}','${this.email}','${this.avatar}','${this.role}','${this.password}')`;
        return Model.executeQuery(sql);
    }

    static update(id, userData) {
        const sql = `UPDATE users
           SET ${Model.mapToSqlUpdateSyntax(userData)}
           WHERE id = '${id}'`;
        return Model.executeQuery(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM users WHERE id = ${id}`;
        const result = await Model.executeQuery(sql);
        return result.affectedRows;
    }
}
