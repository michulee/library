
let myLibrary = []
const addBook = document.getElementById('addBook');
const modal = document.querySelector('.modal-background');
const cardPos = document.body.querySelector('.grid');
console.log(localStorage)
const localStorageKeys = Object.keys(localStorage);
let localStorageItem = [];


function Book() {
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
        // book.id = localStorage.length;
        book.author = document.getElementById('author').value;
        book.title = document.getElementById('title').value;
        book.setReadStatus(document.getElementById('read').checked);
        myLibrary.push(book);
        localStorage.setItem(myLibrary.length-1, JSON.stringify(book))
        console.log(localStorage);
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

// Parse localStorage keys into an array
function parseLocalStorage() {
    // let localStorageItem;
    for(book of localStorageKeys) {
        // console.log(book)
        // localStorage values are strings, so must set parsed items to prototype
        localStorageItem = JSON.parse(localStorage.getItem(book));

        const setPrototype = new Book;
        Object.setPrototypeOf(localStorageItem, setPrototype);
        console.log(localStorageItem);
        
        myLibrary.push(localStorageItem);
    }
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

        // remove localStorage entry
        const removeStorageKey = localStorageKeys[cardPosition];
        localStorage.removeItem(removeStorageKey);
    }
    // Toggle read status of book
    else if(e.target.classList.contains('read')) {
        if(myLibrary[cardPosition].read == 'Already Read') {
            console.log(myLibrary[cardPosition].read);
            myLibrary[cardPosition].setReadStatus(false);
            //localStorage
            // position needs to be first in Object.keys, take obj from myLibrary
            // localStorage.setItem(?, JSON.stringify(myLibrary[cardPosition]));
            // change HTML to 'want to read'
        } else {
            myLibrary[cardPosition].setReadStatus(true);
            //localStorage
            // localStorage.setItem(?, JSON.stringify(myLibrary[cardPosition]));
            // change HTML to 'already read'
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




