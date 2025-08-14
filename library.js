const myLibrary = [];

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Please make use of the new Keyword");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayBook() {
  let libraryContainer =document.querySelector("#library");
  libraryContainer.textContent = ""; // Clear previous display

  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Title
    const titleE1 = document.createElement("h3");
    titleE1.classList.add("book-title");
    titleE1.textContent = book.title;

    // Author
    const authorE1 = document.createElement("p");
    authorE1.classList.add("book-author");
    const authorLabel = document.createElement("strong");
    authorLabel.textContent = "Author: ";
    authorE1.appendChild(authorLabel);
    authorE1.appendChild(document.createTextNode(book.author));

    // Pages 
    const pagesE1 = document.createElement("p");
    pagesE1.classList.add("book-pages");
    const pagesLabel = document.createElement("strong");
    pagesLabel.textContent = "Pages: ";
    pagesE1.appendChild(pagesLabel);
    pagesE1.appendChild(document.createTextNode(book.pages));

    // Read status
    const readE1 = document.createElement("p");
    readE1.classList.add("book-read");
    const readLabel = document.createElement("strong");
    readLabel.textContent = "Read: ";
    readE1.appendChild(readLabel);
    readE1.appendChild(document.createTextNode(book.isRead ? "Yes" : "No"));

    // Remove Btn
    const removeBtn =document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      RemoveBook(book.id);
    });
    // Toggle 
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBook();
    })


    // Add everything to the card
    bookCard.appendChild(titleE1);
    bookCard.appendChild(authorE1);
    bookCard.appendChild(pagesE1);
    bookCard.appendChild(readE1);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(toggleBtn);

    // Add card to the container
    libraryContainer.appendChild(bookCard);
  });
}
document.querySelector("#newBookBtn").addEventListener("click", () => {
  const form = document.querySelector("#bookForm");
  form.style.display = form.style.display === "block" ? "none" : "block";
});
// Handle form submit
document.querySelector("#bookForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = Number(document.querySelector("#pages").value);
  const isRead = document.querySelector("#isRead").checked;
  addBookToLibrary(title, author, pages, isRead);
  displayBook();
  //  Reset and hide form
  event.target.reset();
  event.target.style.display = "none";
});
// Remove Function 
function RemoveBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBook();
  }
}
// Book prototype 
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
}

// Add example books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);

// Display them
displayBook();
