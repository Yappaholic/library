const button = document.querySelector(".book-add")
const modal = document.querySelector("dialog")
const cancel = document.querySelector("#cancel")
const form = document.querySelector("form")
const shelf = document.querySelector(".shelf")
button.addEventListener("click", () => {
  modal.showModal()
});
modal.addEventListener("click", e => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
  }
});
cancel.addEventListener("click", () => {
  modal.close();
});
let bookName
let bookAuthor
let bookPages
let read
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  bookName = formData.get("name");
  bookAuthor = formData.get("author")
  bookPages = formData.get("pages")
  read = formData.get("read")
  addBookToLibrary();
  modal.close();
  form.reset();
});

let library = []
let index = 0

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
};

function addBookToLibrary() {
  var book = new Book(bookName, bookAuthor, bookPages, read, index)
  library.push(book)
  index++
  addBookToSite(book)
};
function addBookToSite(book) {
  const node = document.createElement("div");

  node.classList.add("node")
  node.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.pages}</p>
  `
  const readButton = document.createElement("button")
  readButton.setAttribute("id", book.index)
  const removeButton = document.createElement("button")
  removeButton.setAttribute("id", "-" + book.index)
  removeButton.textContent = "Remove Book"
  if (book.read == "on") {
    readButton.textContent = "Read"
    readButton.classList.add("read")
  } else if (book.read == null) {
    readButton.textContent = "Not Read"
    readButton.classList.add("not-read")
  }
  readButton.addEventListener("click", () => {
    if (readButton.classList.contains("read")) {
      readButton.classList.remove("read");
      readButton.classList.add("not-read");
      readButton.textContent = "Not Read"
    } else {
      readButton.classList.remove("not-read");
      readButton.classList.add("read");
      readButton.textContent = "Read"
    }
  });
  removeButton.addEventListener("click", () => {
    node.remove()
  })
  node.appendChild(readButton)
  node.appendChild(removeButton)
  shelf.appendChild(node)
}

