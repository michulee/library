
let myLibrary = []
const addBook = document.getElementById('addBook');
const modal = document.querySelector('.modal-background');
const cardPos = document.body.querySelector('.grid');

function Book(title, author, read, icon) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.icon = icon;
}

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

// Open modal form to add book
const modalOpenBtn = document.querySelector('.open');
modalOpenBtn.addEventListener('click', () => {
    modal.style.visibility = 'unset';

});
// Close modal form
const modalCloseBtn = document.querySelector('.close');
modalCloseBtn.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
});

// Click 'Submit' and create localStorage entry for book item
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
        localStorage.setItem('book', JSON.stringify(myLibrary));
        displayBookCard();
    }
}

// Display book as you add them to the library
function displayBookCard() {
    const book = myLibrary[myLibrary.length-1];
    const card = `
                <div class="card" data-id='${book.id}'>
                    <h2>${book.title}</h2>
                    <div>${book.author}</div>
                    <div class='read'><i class='read-icon material-icons ${book.icon}'>fiber_manual_record</i>${book.read}</div>
                    <button class='remove material-icons'>close</button>
                </div>`;
    cardPos.insertAdjacentHTML('afterbegin', card);
}

// Display all books upon loading page
function displayAllBookCards() {
    parseLocalStorage('book');
    myLibrary.forEach(book => {
        const card = `
                    <div class="card" data-id='${book.id}'>
                        <h2>${book.title}</h2>
                        <div>${book.author}</div>
                        <div class='read'>
                            <i class='read-icon material-icons ${book.icon}'>fiber_manual_record</i>
                            <p class='readText'>${book.read}</p>
                        </div>
                        <button class='remove material-icons'>close</button>
                    </div>`;
        cardPos.insertAdjacentHTML('afterbegin', card);
        
    });
}

// Parse localStorage objects into myLibrary array

function parseLocalStorage(key) {
    const localStorageArray = JSON.parse(localStorage.getItem(key));
    if(localStorageArray !== null) {
        localStorageArray.forEach(book => {
            book = new Book(book.title, book.author, book.read, book.icon);
            myLibrary.push(book);
        });
    }
}

/**
 * Window event listeners for removing a card component, and changing the
 * read status of a book
 */
window.addEventListener('click', (e) => {
    const cardPosition = getTargetElementPosition(e);
    const cardElement = e.target.parentElement;
    // Remove the card from display and localStorage when clicking on remove button
    if(e.target.classList.contains('remove')) {
        cardElement.remove(); //remove HTML
        console.log('remove position is ' + cardPosition) // remove entry from myLibrary arr
        myLibrary.splice(cardPosition, 1)
        localStorage.setItem('book', JSON.stringify(myLibrary)); // update localStorage entry
    }
    // Toggle read status (text and icon) of book
    else if(cardElement.classList.contains('read')) {
        const icon = cardElement.querySelector('.read-icon');
        if(myLibrary[cardPosition].read == 'Already Read') {
            myLibrary[cardPosition].setReadStatus(false);
            localStorage.setItem('book', JSON.stringify(myLibrary));
            if(e.target.classList.contains('readText')) {
                e.target.innerText = 'Want to Read';
                icon.classList.remove('icon-green-circle');
                icon.classList.add('icon-red-circle');
            }
        } else {
            myLibrary[cardPosition].setReadStatus(true);
            localStorage.setItem('book', JSON.stringify(myLibrary));
            if(e.target.classList.contains('readText')) {
                e.target.innerText = 'Already Read';
                icon.classList.remove('icon-red-circle');
                icon.classList.add('icon-green-circle');
            }
        }
    }
});

/**
 * Get position of the closest card component starting from the target element
 * @param {*} e - The target element 
 */
function getTargetElementPosition(e) {
    const clickedElement = e.target.closest('.card');
    if(clickedElement !== null) {
        let sibling = clickedElement.nextElementSibling;
        let cardPosition = 0;
        while(sibling !== null) {
            cardPosition++;
            sibling = sibling.nextElementSibling;
        }
        return cardPosition;
    }
}


