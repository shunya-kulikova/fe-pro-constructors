import {
    Book
} from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {

    this.name = name;
    this.date = date;
    this.myBooks = [];
    this.friends = [];
    this.likes = [];


    function addRemFunc(obj, props, el) {
        obj[props].includes(el) ? obj[props] = obj[props].filter((item) => item !== el) : obj[props].push(el);
    }
    
    this.addToFriends = function (user) {
        addRemFunc(this, 'friends', user);
        addRemFunc(user, 'friends', this);
    };
    this.likeBook = function (book) {
        addRemFunc(this, 'likes', book);
        addRemFunc(book, 'likedUsers', this);
    };
    
    this.removeFriend = this.addToFriends;
    this.unlikeBook = this.likeBook;

    Object.defineProperties(this, {
        'friendsNames': {
            get() {
                return this.friends.map(({
                    name
                }) => name).join(', ');
            }

        },
        'likedBooks': {
            get() {
                return this.likes.map(({
                    title
                }) => title).join(', ');
            }
        },
        'publishedBooks': {
            get() {
                return this.myBooks.map(({
                    title
                }) => title).join(', ');
            }
        }
    });
}

