// Array for Book objects to be stored
const myLibrary = [];
const deleteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>trash-can</title>
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" fill="currentColor"/>
  </svg>`;
// Grab the Book Form element
const bookForm = document.querySelector("form.book-form");
//Listen to the Submit button
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  addBookToLibrary(
    data.title,
    data.author,
    data.pages,
    data.haveRead === "true"
  );
  displayLibrary();
  bookForm.reset();
});

// Book object constructor
function Book(id, title, author, pages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = `${title} by ${author}, ${pages} pages, ${
    haveRead ? "read" : "not read"
  }.`;
}

function addBookToLibrary(title, author, pages, haveRead) {
  const id = crypto.randomUUID();
  const bookInstance = new Book(id, title, author, pages, haveRead);
  myLibrary.push(bookInstance);
}

function displayLibrary() {
  const library = document.querySelector(".library");
  library.textContent = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const deleteSection = document.createElement("div");
    deleteSection.classList.add("delete-section");

    const titlePara = document.createElement("p");
    titlePara.textContent = `Title: ${book.title}`;
    const authorPara = document.createElement("p");
    authorPara.textContent = `Author: ${book.author}`;
    const pagesPara = document.createElement("p");
    pagesPara.textContent = `Pages: ${book.pages}`;
    const readPara = document.createElement("p");
    readPara.textContent = `Completed: ${book.haveRead ? "Yes" : "No"}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = "Change Status";

    cardText.appendChild(titlePara);
    cardText.appendChild(authorPara);
    cardText.appendChild(pagesPara);
    cardText.appendChild(readPara);

    deleteButton.addEventListener("click", () => {
      deleteBookById(book.id);
      displayLibrary();
    });

    readButton.addEventListener("click", () => {
        book.toggleRead();
        displayLibrary();
    })
    bookCard.appendChild(cardText);
    bookCard.appendChild(deleteSection);

    deleteSection.appendChild(deleteButton);
    deleteSection.appendChild(readButton);
    library.appendChild(bookCard);
    document.querySelector("#title").focus();
  });
}

function deleteBookById(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

Book.prototype.toggleRead = function () {
  this.haveRead = !this.haveRead;
};
