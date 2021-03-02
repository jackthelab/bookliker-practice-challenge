BASE_URL = 'http://localhost:3000/'
BOOKS_URL = BASE_URL+'books/'
USERS_URL = BASE_URL+'users/'

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks() {
    fetch(BOOKS_URL)
        .then(res => res.json())
        .then(booksData => {
            makeBookList(booksData)
        })
}

function makeBookList(books){
    books.forEach(book => {
        const bookList = document.getElementById('list')

        const bookListItem = document.createElement('li')
            bookListItem.innerText = book.title
            bookListItem.addEventListener('click', () => {
                showBook(book)
            })
        
        bookList.append(bookListItem)
    })
}

function showBook(book){
    
}