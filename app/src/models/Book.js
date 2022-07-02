import Model from './Model.js';
import Author from './Author.js';
import Genre from './Genre.js';

export default class Book {
    constructor(bookData) {
        this.id = bookData.id;
        this.name = bookData.name;
        this.description = bookData.description;
        this.cover = bookData.cover;
        this.authorName = bookData.author;
        this.genreName = bookData.genre;
    }

    static async getAllBooks() {
        const sql = `
            SELECT books.id , books.name, genre.name as genre, authors.name as author, books.cover, books.description
            FROM books as books
            JOIN genre as genre ON genre.id = books.genre
            JOIN authors as authors ON authors.id = books.author
         `;

        return await Model.executeQuery(sql);
    }

    static async get(id) {
        const sql = `
            SELECT books.id , books.name, genre.name as genre, authors.name as author, books.cover, books.description
            FROM books as books
            JOIN genre as genre ON genre.id = books.genre
            JOIN authors as authors ON authors.id = books.author
            WHERE books.id = ${id}
         `;
        const [book] = await Model.executeQuery(sql);
        if (book) return book;
        return null;
    }

    async save() {
        const author = await Author.getByName(this.authorName);
        if (!author) throw new Error('Author does not exist!');
        const genre = await Genre.getByName(this.genreName);
        if (!genre) throw new Error('Genre does not exist!');
        const sql = `INSERT INTO books(
            name,
            description,
            cover,
            author,
            genre
        ) VALUES('${this.name}','${this.description}','${this.cover}','${author.id}','${genre.id}')`;
        return Model.executeQuery(sql);
    }

    static async update(id, bookData) {
        const author = await Author.getByName(bookData.author);
        if (!author) throw new Error('Author does not exist!');
        const genre = await Genre.getByName(bookData.genre);
        if (!genre) throw new Error('Genre does not exist!');

        const sql = `UPDATE books
           SET ${Model.mapToSqlUpdateSyntax({...bookData, genre: genre.id, author: author.id })}
           WHERE id = '${id}'`;
        return Model.executeQuery(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM books WHERE books.id = ${id}`;
        const result = await Model.executeQuery(sql);
        return result.affectedRows;
    }
}