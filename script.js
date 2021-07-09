
let myLibrary = [];
const btnAddBook = document.querySelector('.btn-submit');
const btnOpenLibraryForm = document.querySelector('.btn-open');
const btnCloseLibraryForm = document.querySelector('.btn-close');
const cardPos = document.body.querySelector('.grid');
const bookKey = 'book';

function Book(title, author, read, icon) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.icon = icon;
}

/**
 * Set read status of book object
 * @param {boolean} isRead - Read status of book
 */
Book.prototype.setReadStatus = function(isRead) {
    if(isRead) {
        this.read = 'Already Read';
        this.icon = 'icon-green-circle';
    } else {
        this.read = 'Want to Read';
        this.icon = 'icon-red-circle';
    }
}
displayAllBookCards();

btnOpenLibraryForm.addEventListener('click', function() {
    setModalVisibility(true);
});

btnCloseLibraryForm.addEventListener('click', function() {
    setModalVisibility(false);
});

btnAddBook.addEventListener('click', addBookToLibrary);

/**
 * Set visibility of modal library form
 * @param {boolean} setVisibility - Visibility of modal box
 */
function setModalVisibility(setVisibility) {
    const modal = document.querySelector('.modal-background');
    if(setVisibility) {
        modal.style.visibility = 'unset';
    } else {
        modal.style.visibility = 'hidden';
    }
}

/**
 * Add localStorage entry for book object
 * @param {*} e - A click event
 */
function addBookToLibrary(e) {
    if(document.getElementById('title').value === '') {
        // Do nothing
    } else {
        e.preventDefault();
        const book = new Book();
        const now = new Date();

        // set metadata of item
        book.title = document.getElementById('title').value;
        book.author = document.getElementById('author').value;
        book.setReadStatus(document.getElementById('read').checked);

        // set expired time for item
        // (num * 1000) = TTL or time to live in sec converted to ms
        // e.g. if num = 60 sec then 6000 ms
        // 604800 sec = 7 days
        book.expiry = now.getTime() + (604800 * 1000);

        // set item to array and localStorage
        myLibrary.push(book);
        localStorage.setItem(bookKey, JSON.stringify(myLibrary));

        // display iteme to screen
        displayBookCard();
    }
}

/**
 * Display book as you add them to the library
 */
function displayBookCard() {
    const book = myLibrary[myLibrary.length-1];
    const card = `
                <div class="card" data-id='${book.id}'>
                    <p class="title">${book.title}</p>
                    <div class="desc">${book.author}</div>
                    <div class='read'>
                        <i class='read-icon material-icons ${book.icon}'>fiber_manual_record</i>
                        <p class='readText'>${book.read}</p>
                    </div>
                    <button class='remove material-icons'>close</button>
                </div>`;
    cardPos.insertAdjacentHTML('afterbegin', card);
}

/**
 * Display all books upon loading page
 */
function displayAllBookCards() {
    myLibrary = parseLocalStorageBook(bookKey);
    if(myLibrary.length !== 0) {
        myLibrary.forEach(book => {
            const card = `
                        <div class="card" data-id='${book.id}'>
                            <p class="title">${book.title}</p>
                            <div class="desc">${book.author}</div>
                            <div class='read'>
                                <i class='read-icon material-icons ${book.icon}'>fiber_manual_record</i>
                                <p class='readText'>${book.read}</p>
                            </div>
                            <button class='remove material-icons'>close</button>
                        </div>`;
            cardPos.insertAdjacentHTML('afterbegin', card);
        });
    }
}

/**
 * Parse localStorage objects into myLibrary array
 * @param {string} key - The localStorage key
 * @returns {Array<Object>} Book objects
 */
function parseLocalStorageBook(key) {
    const localStorageArray = JSON.parse(localStorage.getItem(key));
    const now = new Date();
    let libraryArray = [];
    
    if(localStorageArray !== null) {
        localStorageArray.forEach((book) => {
            // compare expired time of item with current time
            if(now.getTime() > book.expiry) {
                localStorage.removeItem(key);
            }

            // Set objects to Book from localStorage to array
            book = new Book(book.title, book.author, book.read, book.icon);
            libraryArray.push(book);
        });
    }
    return libraryArray;
}

/**
 * Window event listeners for removing a card component, and changing the
 * read status of a book
 */
window.addEventListener('click', (e) => {
    const cardPosition = getCardPosition(e);
    if(cardPosition !== -1) {
        const cardElement = e.target.parentElement;
        // Listener to remove the card from display and localStorage when clicking on remove button
        if(e.target.classList.contains('remove')) {
            cardElement.remove(); //remove HTML
    
            myLibrary.splice(cardPosition, 1); // remove entry from myLibrary arr
    
            // update or remove localStorage entry
            if(myLibrary.length === 0) {
                localStorage.removeItem(bookKey);
            } else {
                localStorage.setItem(bookKey, JSON.stringify(myLibrary)); 
            }
        }
        // Listener to toggle read status (text and icon) of book
        else if(cardElement.classList.contains('read')) {
            const icon = cardElement.querySelector('.read-icon');
            const book = myLibrary[cardPosition];
    
            if(book.read == 'Already Read') {
                book.setReadStatus(false);
                localStorage.setItem(bookKey, JSON.stringify(myLibrary));
                if(e.target.classList.contains('readText')) {
                    e.target.innerText = 'Want to Read';
                    icon.classList.remove('icon-green-circle');
                    icon.classList.add('icon-red-circle');
                }
            } else {
                book.setReadStatus(true);
                localStorage.setItem(bookKey, JSON.stringify(myLibrary));
                if(e.target.classList.contains('readText')) {
                    e.target.innerText = 'Already Read';
                    icon.classList.remove('icon-red-circle');
                    icon.classList.add('icon-green-circle');
                }
            }
        }
    }
});

/**
 * Get position of the closest card component
 * @param {*} e - The click event
 * @returns {number} Position of card 
 */
function getCardPosition(e) {
    const clickedElement = e.target.closest('.card');
    let cardPosition = 0;
    if(clickedElement !== null) {
        let sibling = clickedElement.nextElementSibling;
        while(sibling !== null) {
            cardPosition++;
            sibling = sibling.nextElementSibling;
        }
    }
    return cardPosition;
}


