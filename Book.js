class Book extends Library {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }

    setRead(status = false) {
        if(status === true) {
            this.read = "Want to Read";
            this.icon = "icon-red-circle";
        } else {
            this.read = "Already Read";
            this.icon = "icon-green-circle";
        }
    }

    getRead() {
        return this.read;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setAuthor(author) {
        this.author = author;
    }

    getAuthor() {
        return this.author;
    }

    displayBook(title, authhor, read) {
        
    }


}