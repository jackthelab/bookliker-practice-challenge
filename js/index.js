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
        if(!checkForLike({username: "pouros"}, book)){
            likeBtn.innerText = "Like"
            likeBtn.addEventListener('click', () => {
                likeBook(book)
            })
        } else{
            likeBtn.innerText = "Unlike"
            likeBtn.addEventListener('click', () => {
                unlikeBook(book)
            })
        }
        // likeBtn.addEventListener('click', (e) => {
        //     likeBook(e, book)
        // })

    showPanel.append(bookCover, likeBtn, bookTitle)

    if(booksubtitle !== ""){
        showPanel.append(booksubtitle)
    }

    showPanel.append(bookAuthor, bookDescription, likesList)
}

function likeBook(book){

    let usersList = book.users
    let currentUser = {
        id: 1,
        username: "pouros"
    }
    let newUsersList = usersList.concat(currentUser)

    // console.log(likeButton)
    // console.log(usersList)
    // console.log(currentUser)
    // console.log(newUsersList)
    // console.log(book.id)

    // if(!usersList.some(user => user.username === "pouros"))
    // if(!checkForLike(currentUser, book)){

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify({users: newUsersList})
    }

    fetch(BOOKS_URL+book.id, reqObj)
        .then(res => res.json())
        .then(updatedBookObj => {
            showBook(updatedBookObj)
        })

    // }
    
    // }else{
    //     alert(`${currentUser.username} is already a fan`)
    // }

    // const reqObj = {
    //     headers: {"Content-Type": "application/json"},
    //     method: "PATCH",
    //     body: JSON.stringify({users: newUsersList})
    // }

    // fetch(BOOKS_URL+book.id, reqObj)
    // .then(res => res.json())
    // .then(updatedBookObj => {
    //     likeButton.innerText = "LIKED!!!!!"
    // })
}

function unlikeBook(book){
    const currentUser = {id:1, username: "pouros"}
    const usersList = book.users
    const usersIds = usersList.map(x => x.id)
    const currentUserIndex = usersIds.indexOf(currentUser.id)
    const newUsersList = usersList.slice(0, currentUserIndex).concat(usersList.slice(currentUserIndex+1))

    // console.log(usersList)
    // console.log(newUsersList)

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify({users: newUsersList})
    }

    fetch(BOOKS_URL+book.id, reqObj)
        .then(res => res.json())
        .then(updatedBookObj => {
            showBook(updatedBookObj)
        })
}

function checkForLike(someUser, book){
    return(book.users.some(user => user.username === someUser.username))
}