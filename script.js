const myLibrary = [];

function Book(id, title, author, pages, haveRead = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function info() {
    switch (haveRead) {
      case true:
        return `${title} by ${author}, ${pages} pages, read.`;
      case false:
        return `${title} by ${author}, ${pages} pages, not read yet.`;
    }
  };
}

function addBookToLibrary(title, author, pages, haveRead) {
  const id = crypto.randomUUID();
  const bookInstance = new Book(id, title, author, pages, haveRead)
  myLibrary.push(bookInstance);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    // Add each book to the page, formatted.
  });
}



// const testBook = new Book("Test Vol 1", "John Doe", 200)
// bookList.forEach((book) => {console.log(book.info)})
