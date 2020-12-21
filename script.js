let myLibrary = []
// @@ because we use id='addBook', we have to add our own validations
// const addBook = document.getElementById('addBook');
const addBook = document.querySelector('modal-submit');
const modal = document.querySelector('.modal-background');

function Book() {
}

Book.prototype.isRead = () => {
    
}
displayAllBookCards();

// Open modal form to add book to library
const modalOpenBtn = document.querySelector('.modal-open');
modalOpenBtn.addEventListener('click', () => {
    modal.style.visibility = 'unset';
});
// Close modal form to add book to library
const modalCloseBtn = document.querySelector('.modal-close');
modalCloseBtn.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
});

// says is not a function
function setVisibility(boolean) {
    console.log('works')
    // if(boolean) {
    //     return this.style.visibility = 'hidden';
    // } else {
    //     return this.style.visibility = 'unset';
    // }
}

// Click 'Submit' to create localStorage entry for book item
// @@ because we use id='addBook', we have to add our own validations
addBook.addEventListener('click', addBookToLibrary);
function addBookToLibrary(e) {
    e.preventDefault();
    const book = new Book();
    book.id = localStorage.length;
    book.author = document.getElementById('author').value;
    book.title = document.getElementById('title').value;
    book.isRead = document.getElementById('read').value;
    myLibrary.push(book);
    // localStorage.setItem(localStorage.length, JSON.stringify(myLibrary))
    localStorage.setItem(localStorage.length, JSON.stringify(book))
    console.log(localStorage);
    // modal.setVisibility(false);
    setVisibility(false);
    displayBookCard();
}

// Display last book in myLibrary array
function displayBookCard() {
    const cardPos = document.body.querySelector('.grid');
    // Retrieve the last book in myLibrary array
    const book = myLibrary[myLibrary.length-1];
    // Display last book
        const card = `
                    <div class="card" data-id='${book.id}'>
                        <h2>${book.title}</h2>
                        <p>by ${book.author}</p>
                        <p>${book.isRead}</p>
                        <button class='remove'>Remove</button>
                    </div>`;
        cardPos.insertAdjacentHTML('afterbegin', card);
}

// Display all books upon loading page
// @@ deleting items will leave index gaps
function displayAllBookCards() {
    if(localStorage.length)
    for(let i = 0; i < localStorage.length; i++) {
        const cardPos = document.body.querySelector('.grid');
        // JSON.parse() can only parse one object at a time, not an array of objects
        const book = JSON.parse(localStorage.getItem(i));
        // console.log(book[i])
        const card = `
                    <div class="card" data-id='${book.id}'>
                        <h2>${book.title}</h2>
                        <p>by ${book.author}</p>
                        <p>${book.isRead}</p>
                        <button class='remove'>Remove</button>
                    </div>`;
        cardPos.insertAdjacentHTML('afterbegin', card);
    }
}

// removing single book that user clicked
window.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove')) {
        const card = e.target.parentElement;
        //remove() removes HTML
        card.remove(); 
        const id = card.getAttribute('data-id');
        console.log(id);
        localStorage.removeItem(id);
        // find entry in localStorage and delete it 
        // find index
    }
})


