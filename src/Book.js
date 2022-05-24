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

    publicationBy.myBooks.push(this);
    authors.forEach(({
        books
    }) => books.push(this));

    Object.defineProperties(this, {
        'suggestedBooks': {
            
            get() {
                return this.authors.reduce((arr, {
                    books
                }) => {
                    books.forEach(({
                        title
                    }) => this.title !== title && !arr.includes(title) ? arr.push(title) : arr);
                    return arr;
                }, []).join(', ');
            }
        },
        'suggestedPublicators': {
            get() {
                return this.authors.reduce((arr, {
                    books
                }) => {
                    books.forEach(({
                        publicationBy
                    }) => this.publicationBy !== publicationBy && !arr.includes(publicationBy.name) ? arr.push(publicationBy.name) : arr);
                    return arr;
                }, []).join(', ');
            }
        }
    });
}