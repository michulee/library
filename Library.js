class Library {
    constructor(bookList = []) {
        this.bookList = bookList;
    }

    addBook(book = new Book()) {
        this.bookList.push(book);
    }

    //FIXME get by ISBN
    getBook(index) {
        return this.bookList[index];
    }

    getAllBooks() {
        return this.bookList;
    }

    removeBook(arr, index) {
        return arr.splice(index, 1);
    }

    removeAllBooks(arr) {
        return arr = [];
    }
}