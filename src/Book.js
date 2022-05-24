import {
    Author
} from './Author.js';
import {
    User
} from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
    this.title = title;
    this.authors = authors;
    this.year = year;
    this.likedUsers = [];
    this.publicationBy = publicationBy;

    this.publicationBy.myBooks.push(this);

    this.authors.forEach((author) => {
        author.books.push(this);
    });

    Object.defineProperties(this, {
        'suggestedBooks': {
            get() {
                return this.authors.reduce((array, {
                    books
                }) => {
                    books.forEach(({
                        title
                    }) => this.title !== title && !array.includes(title) ? array.push(title) : array);
                    return array;
                }, []).join(', ');
            }
        },
        'suggestedPublicators': {
            get() {
                return this.authors.reduce((array, {
                    books
                }) => {
                    books.forEach(({
                        publicationBy
                    }) => this.publicationBy !== publicationBy && !array.includes(publicationBy.name) ? array.push(publicationBy.name) : array);
                    return array;
                }, []).join(', ');
            }
        }
    });
}