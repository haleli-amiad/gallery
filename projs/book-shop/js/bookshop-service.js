'use strict'
const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 5;
var gNames = ['Learn how to fly with your toes', 'Biography of a naked Unicorn', 'Poems for the glitters', 'Love story with a buffalo', 'All about space bunnies']
var gBooks;
var gPageIdx = 0;

_createBooks();

function getBooks() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

function getNames() {
    return gNames;
}

function removeBook(bookId) {
    var bookIdx = _getBookIdx(bookId);
    if (bookId < 0) return
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price) {
    if (price < 0) return
    var book = _createBook(name)
    book.price = price;
    book.id = makeId();
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return + bookId === +book.id
    })
    return book
}

function updateBook(bookId, price) {
    var bookIdx = _getBookIdx(bookId);
    gBooks[bookIdx].price = price;
    _saveBooksToStorage();
}

function changePage(diff) {
    if ((gPageIdx * PAGE_SIZE >= gBooks.length - PAGE_SIZE && diff > 0) || (gPageIdx <= 0 && diff < 0)) return;
    gPageIdx += diff;
}

// function nextPage() {
//     if (gPageIdx * PAGE_SIZE >= gBooks.length - 5) return;
//     gPageIdx++;
// }

// function prevPage() {
//     if (gPageIdx <= 0) return;
//     gPageIdx--;
// }

function sortForDisplay(sortBy) {
    gBooks.sort(function (book1, book2) {
        var result = (book1[sortBy] < book2[sortBy]) ? -1 : (book1[sortBy] > book2[sortBy]) ? 1 : 0;
        return result;
    })
}

// function sortForDisplay(sortBy) {
//     if (sortBy === 'TEXT') {
//         gBooks.sort(function (book1, book2) {
//             if (book1.name < book2.name) return -1;
//             else if (book1.name > book2.name) return 1;
//             return 0;
//         })
//     } else if (sortBy === 'PRICE') {
//         gBooks.sort(function (book1, book2) {
//             return (book1.price - book2.price) * 1
//         })
//     } else if (sortBy === 'ID') {
//         gBooks.sort(function (book1, book2) {
//             return (book1.id - book2.id) * 1
//         })
//     }
// }

function rateBook(bookId, diff) {
    var book = getBookById(bookId);
    book.rate += diff;
    if ((book.rate === 10 && diff > 0) || (book.rate === 0 && diff < 0)) return;
    _saveBooksToStorage(gBooks);
    onRenderRate(bookId, book.rate);
}

// function rateHigher(bookId, rate) {
//     if (rate > 10) return;
//     var book = getBookById(bookId);
//     book.rate++;
//     _saveBooksToStorage(gBooks)
//     onRenderRate(bookId, rate)
// }

// function rateLower(bookId, rate) {
//     if (rate < 0) return;
//     var book = getBookById(bookId);
//     book.rate--;
//     _saveBooksToStorage(gBooks)
//     onRenderRate(bookId, rate)
// }

function _createBook(name, price = getRandomIntInclusive(1, 200)) {
    return {
        id: makeId(),
        name,
        price,
        desc: makeLorem(),
        imgUrl: '<img src="img/book1.png">',
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 8; i++) {
            var name = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _getBookIdx(bookId) {
    return gBooks.findIndex(function (book) {
        return +book.id === +bookId;
    });
}