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
    const showPanel = document.getElementById('show-panel')
    showPanel.innerHTML = ''

    const bookCover = document.createElement('img')
        bookCover.src = book.img_url
    
    const bookTitle = document.createElement('h2')
        bookTitle.innerText = book.title
    
    const booksubtitle = document.createElement('h3')
        if(book.subtitle){
            booksubtitle.innerText = book.subtitle
        }else{
            booksubtitle.innerText = ""
        }
    
    const bookAuthor = document.createElement('h3')
        bookAuthor.innerText = book.author
    
    const bookDescription = document.createElement('p')
        bookDescription.innerText = book.description

    const likesList = document.createElement('ul')
        book.users.forEach(user => {
            const fan = document.createElement('li')
                fan.innerText = user.username
            likesList.appendChild(fan)
        })
    
    const likeBtn = document.createElement('button')
        likeBtn.innerText = "Like"

    showPanel.append(bookCover, bookTitle)

    if(booksubtitle !== ""){
        showPanel.append(booksubtitle)
    }

    showPanel.append(bookAuthor, bookDescription, likesList, likeBtn)
}