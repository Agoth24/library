// Array for Book objects to be stored
const myLibrary = [];

// Grab the Book Form element
const bookForm = document.querySelector("form.book-form");

//Listen to the Submit button
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Create a key:value collection of all form fields and their values
  const formData = new FormData(e.target);
  // Create an object with properties and
  //  values from the iterable collection above
  const data = Object.fromEntries(formData.entries());

  // Pass in data object's values into a function to
  // create book objects and append to the library array.
  addBookToLibrary(
    data.title,
    data.author,
    data.pages,
    data.haveRead === "true"
  );

  displayLibrary();
  bookForm.reset();
});

class Book {
  constructor(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  info() {
    `${title} by ${author}, ${pages} pages, ${
    haveRead ? "read" : "not read"
  }.`
  }
  toggleRead() {
    this.haveRead = !this.haveRead;
  }
}

// // Book object constructor
// function Book(id, title, author, pages, haveRead) {
//   this.id = id;
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.haveRead = haveRead;
//   this.info = `${title} by ${author}, ${pages} pages, ${
//     haveRead ? "read" : "not read"
//   }.`;
// }

// Create a Book instance and add to library array
function addBookToLibrary(title, author, pages, haveRead) {
  const id = crypto.randomUUID();
  const bookInstance = new Book(id, title, author, pages, haveRead);
  myLibrary.push(bookInstance);
}

// Loop through library array and create cards for each book
// append those card divs to the DOM library
function displayLibrary() {
  const library = document.querySelector(".library");
  library.textContent = "";

  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    library.appendChild(bookCard);

    // Reset caret to first input box in the form
    document.querySelector("#title").focus();
  });
}

// Create a card DOM element out of a Book object
function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");

  const cardText = createCardText(book);
  const deleteSection = createDeleteSection(book);

  // Append the text and delete section divs to the card
  bookCard.appendChild(cardText);
  bookCard.appendChild(deleteSection);

  return bookCard;
}

// Convert book instance properties into
// DOM elements for the card's text
function createCardText(book) {
  const cardText = document.createElement("div");
  cardText.classList.add("card-text");

  const titlePara = document.createElement("p");
  titlePara.textContent = `Title: ${book.title}`;

  const authorPara = document.createElement("p");
  authorPara.textContent = `Author: ${book.author}`;

  const pagesPara = document.createElement("p");
  pagesPara.textContent = `Pages: ${book.pages}`;

  const readPara = document.createElement("p");
  readPara.textContent = `Completed: ${book.haveRead ? "Yes" : "No"}`;

  // Append all the DOM elements into the card text div
  cardText.append(titlePara, authorPara, pagesPara, readPara);
  return cardText;
}

// Add delete button and a 'read' toggler to a div,
// handle click events and run corresponding functions
function createDeleteSection(book) {
  const deleteSection = document.createElement("div");
  deleteSection.classList.add("delete-section");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteBookById(book.id);
    displayLibrary();
  });

  const readButton = document.createElement("button");
  readButton.classList.add("read-button");
  readButton.textContent = "Change Status";
  readButton.addEventListener("click", () => {
    book.toggleRead();
    displayLibrary();
  });

  deleteSection.append(deleteButton, readButton);
  return deleteSection;
}

// Get the index of a book object from the library array by using its ID
// and remove the element at that index of the array: (the book)
function deleteBookById(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// // Adding a function to the Book prototype for all Books to inherit,
// // change the state of haveRead to its negation
// Book.prototype.toggleRead = function () {
//   this.haveRead = !this.haveRead;
// };
