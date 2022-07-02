import Model from './Model.js';
import Book from './Book.js';

export default class Review {
    constructor(reviewData) {
        this.id = reviewData.id;
        this.score = reviewData.score;
        this.title = reviewData.title;
        this.summary = reviewData.summary;
        this.book = reviewData.book;
    }

    async save() {
        const book = await Book.get(this.book);
        if (!book) throw new Error('Book does not exist!');
        const sql = `INSERT INTO reviews(
            score,
            title,
            summary,
            book
        ) VALUES('${this.score}','${this.title}','${this.summary}','${this.book}')`;
        return Model.executeQuery(sql);
    }

    static async get(reviewId) {
        const sql = `
            SELECT reviews.id , reviews.score, books.name as book, reviews.title, reviews.summary
            FROM reviews as reviews
            JOIN books as books ON books.id = reviews.book
            WHERE reviews.id = ${reviewId}
         `;
        const [review] = await Model.executeQuery(sql);
        if (review) return review;
        return null;
    }
}