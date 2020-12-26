
let myLibrary = []
const addBook = document.getElementById('addBook');
const modal = document.querySelector('.modal-background');
const cardPos = document.body.querySelector('.grid');

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.setReadStatus = function(isRead) {
    if(isRead) {
        this.read = "Already Read";
        console.log('set to already read');
    } else {
        this.read = "Want to Read";
        console.log('set to want to read');
    }
}
displayAllBookCards();

// Open modal form to add book to library
const modalOpenBtn = document.querySelector('.open');
modalOpenBtn.addEventListener('click', () => {
    modal.style.visibility = 'unset';
});
// Close modal form to add book to library
const modalCloseBtn = document.querySelector('.close');
modalCloseBtn.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
});

// Click 'Submit' to create localStorage entry for book item
addBook.addEventListener('click', addBookToLibrary);
function addBookToLibrary(e) {
    if(document.getElementById('title').value === '') {
        // Do nothing
    } else {
        e.preventDefault();
        const book = new Book();
        book.title = document.getElementById('title').value;
        book.author = document.getElementById('author').value;
        book.setReadStatus(document.getElementById('read').checked);
        myLibrary.push(book);
        // localStorage.setItem(myLibrary.length-1, JSON.stringify(book))
        localStorage.setItem('book', JSON.stringify(myLibrary));
        displayBookCard();
    }
}

// Display last book in myLibrary array
function displayBookCard() {
    const book = myLibrary[myLibrary.length-1];
    let readStatus;
    if(book.read == 'Already Read') {
        readStatus = 'icon-green-circle';
    } else {
        readStatus = 'icon-red-circle';
    }
    const card = `
                <div class="card" data-id='${book.id}'>
                    <h2>${book.title}</h2>
                    <div>${book.author}</div>
                    <div class='read'><i class='material-icons ${readStatus}'>fiber_manual_record</i>${book.read}</div>
                    <button class='remove material-icons'>close</button>
                </div>`;
    cardPos.insertAdjacentHTML('afterbegin', card);
}

// Display all books upon loading page
function displayAllBookCards() {
    parseLocalStorage();
    myLibrary.forEach(book => {
        let readStatus;
        if(book.read == 'Already Read') {
            readStatus = 'icon-green-circle';
        } else {
            readStatus = 'icon-red-circle';
        }
        const card = `
                    <div class="card" data-id='${book.id}'>
                        <h2>${book.title}</h2>
                        <div>${book.author}</div>
                        <div class='read'><i class='material-icons ${readStatus}'>fiber_manual_record</i>${book.read}</div>
                        <button class='remove material-icons'>close</button>
                    </div>`;
        cardPos.insertAdjacentHTML('afterbegin', card);
    });
}

// https://stackoverflow.com/questions/5873624/parse-json-string-into-a-particular-object-prototype-in-javascript
// Parse localStorage into myLibrary
function parseLocalStorage() {
    const localStorageArray = JSON.parse(localStorage.getItem('book'));
    localStorageArray.forEach(book => {
        
        // don't use setPrototypeOf()
        // Object.setPrototypeOf(book, new Book);
        // myLibrary.push(book);

        book = new Book(book.title, book.author, book.read);
        myLibrary.push(book);
    });
}

// Window listeners
window.addEventListener('click', (e) => {
    const cardPosition = getTargetElementPosition(e);

    // Remove the card from display and localStorage when clicking on remove button
    if(e.target.classList.contains('remove')) {
        const cardElement = e.target.parentElement;

        // remove HTML
        cardElement.remove(); 

        // remove entry from myLibrary arr
        console.log('remove position is ' + cardPosition)
        myLibrary.splice(cardPosition, 1)

        // update localStorage entry
        localStorage.setItem('book', JSON.stringify(myLibrary));
    }
    // Toggle read status of book
    else if(e.target.classList.contains('read')) {
        console.log(e.target)
        if(myLibrary[cardPosition].read == 'Already Read') {
            console.log(myLibrary[cardPosition].read);
            // myLibrary[cardPosition].setReadStatus(false);
            // change HTML to 'want to read', DOM manipulation
        } else {
            // myLibrary[cardPosition].setReadStatus(true);
            // change HTML to 'already read', DOM manipulation
        }
    }
});

function getTargetElementPosition(e) {
    const clickedElement = e.target.parentElement;
    let sibling = clickedElement.nextElementSibling;
    let cardPosition = 0;
    while(sibling !== null) {
        cardPosition++;
        sibling = sibling.nextElementSibling;
    }
    return cardPosition;
}




