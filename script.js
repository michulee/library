
let myLibrary = []
const addBook = document.getElementById('addBook');
const modal = document.querySelector('.modal-background');
const cardPos = document.body.querySelector('.grid');

function Book() {
}

Book.prototype.isRead = function(isRead) {
    if(isRead) {
        this.read = "Already Read";
    } else {
        this.read = "Want to Read";
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
        book.id = localStorage.length;
        book.author = document.getElementById('author').value;
        book.title = document.getElementById('title').value;
        book.isRead(document.getElementById('read').checked);
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

function parseLocalStorage() {
    for(book of Object.keys(localStorage)) {
        myLibrary.push(JSON.parse(localStorage.getItem(book)));
    }
}

// Remove book upon clicking 'Remove'
window.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove')) {
        const card = e.target.parentElement;
        // remove HTML
        card.remove(); 
        const id = card.getAttribute('data-id');
        // remove entry from myLibrary arr
        myLibrary.forEach(book => {
            if(book.id == id) {
                myLibrary.splice(book, 1);
            }
        });
        // remove localStorage entry
        localStorage.removeItem(id);
    }
})

// Toggle read status of book
window.addEventListener('click', (e) => {
    if(e.target.classList.contains('read')) {
        const card = e.target.parentElement;
        const id = card.getAttribute('data-id');
        myLibrary.forEach(book => {
            if(book.id == id) {
                console.log(book.read);
                // change read status and set values for myLibrary and localStorage
                if(book.read == 'Already Read') {
                    book.isRead(false);
                } else {
                    // book.read = 'set';
                    book.isRead(true);
                }
            }
        });
    }
});


