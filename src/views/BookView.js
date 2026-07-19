export default class BookView {

    constructor() {
        this.form = document.getElementById("book-form");

        this.titleInput = document.getElementById("title");
        this.descriptionInput = document.getElementById("description");
        this.visibilitySelect = document.getElementById("visibility");

        this.booksList = document.getElementById("books-list");
    }

    getFormData() {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            visibility: this.visibilitySelect.value
        };
    }

    clearForm() {

        this.form.reset();

    }

    /**
     * Fills the form with the selected book data.
     *
     * param {Book} book - Book to edit.
     */
    fillForm(book) {
        this.titleInput.value = book.title;
        this.descriptionInput.value = book.description;
        this.visibilitySelect.value = book.visibility;
    }

    renderBooks(books){
        this.booksList.innerHTML = "";

        books.forEach(book => {
            const bookItem = document.createElement("li");

            bookItem.classList.add("book-card");

            const title = document.createElement("h3");

            title.textContent = book.title;

            const description = document.createElement("p");

            description.textContent = book.description;

            const visibility = document.createElement("small");

            visibility.textContent = `Visibility: ${book.visibility}`;

            const actions = document.createElement("div");
            actions.classList.add("book-actions");

            const openButton = document.createElement("button");

            openButton.textContent = "Open";

            const editButton = document.createElement("button");

            editButton.textContent = "Edit";

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            actions.appendChild(openButton);
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            bookItem.appendChild(title);
            bookItem.appendChild(description);
            bookItem.appendChild(visibility);
            bookItem.appendChild(actions);
            
            deleteButton.addEventListener("click", () => {
                this.deleteHandler(book.id);
            });

            editButton.addEventListener("click", () => {
                this.editHandler(book);
            });

            openButton.addEventListener("click", () => {
                this.openHandler(book.id);
            });
            

            this.booksList.appendChild(bookItem);
        });
    }

    bindDeleteBook(handler) {
        this.deleteHandler = handler;
    }

    bindEditBook(handler) {
        this.editHandler = handler;
    }

    bindOpenBook(handler) {
        this.openHandler = handler;
    }
}