'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    // sortForDisplay()
    var strHtmls = books.map(function (book, i) {
        return `
        <tr>
        <td>${book.id}</td>
        <td class="book-name">${book.name}</td>
        <td><p class="card-text"> ${book.price}$</p></td>
        <td class="actions"><button class="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update" onclick="onAddUpdateBook('${book.id}')">
         Update</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>
        `
    }).join('')
    document.querySelector('.books-container').innerHTML = strHtmls
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var elName = document.querySelector('.add-book input[name=name]');
    var elPrice = document.querySelector('.add-book input[name=price]');
    var name = elName.value;
    var price = elPrice.value;
    // var price = +elPrice.value;
    // if (!name || !price || price === 0) return
    if (!name || !price) return
    addBook(name, price)
    elName.value = '';
    elPrice.value = '';
    renderBooks()
}

function onUpdateBook(bookId) {
    var elPrice = document.querySelector('.modal-update input[name=uprice]');
    var price = elPrice.value;
    var elUpdate = document.querySelector('.modal-update')
    elUpdate.classList.toggle('hide')
    updateBook(bookId, price);
    renderBooks();
}

function onAddUpdateBook(bookId) {
    var book = getBookById(bookId)
    var elUpdate = document.querySelector('.modal-update')
    elUpdate.innerHTML =
        `<p>Update Price</p>
        <input class="book-price" type="number" name="uprice" placeholder="Book Price" />
        <button onclick="onUpdateBook('${book.id}')">Change</button>`
    elUpdate.classList.toggle('hide')
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = "price: " + book.price + '$'
    elModal.querySelector('span').innerHTML = book.imgUrl
    elModal.querySelector('p').innerText = book.desc
    var elRate = document.querySelector('.rate-book')
    elRate.innerHTML =
        `<p>Rate this book:</p><button onclick="onRate('${book.id}', 1)">+</button>
         <span class="rate">${book.rate}</span>
         <button onclick="onRate('${book.id}', -1)">-</button>`
    elModal.classList.toggle('show')
}

function onRenderRate(bookId, rate) {
    var book = getBookById(bookId)
    rate = book.rate
    var elRate = document.querySelector('.rate')
    elRate.innerText = rate
}

function onChangePage(diff) {
    changePage(diff);
    renderBooks();
}

// function onPrevPage() {
//     prevPage();
//     renderBooks();
// }

// function onNextPage() {
//     nextPage();
//     renderBooks();
// }

function onRate(bookId, diff) {
    rateBook(bookId, diff);
    renderBooks();
}

// function onRateHigher(bookId, bookRate) {
//     rateHigher(bookId, bookRate);
//     renderBooks();
// }

// function onRateLower(bookId, bookRate) {
//     rateLower(bookId, bookRate);
//     renderBooks()
// }

function onSetSort(sortBy) {
    sortForDisplay(sortBy)
    renderBooks();
}