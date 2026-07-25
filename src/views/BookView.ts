import Book from "../models/Book";

export default class BookView {

    form: HTMLFormElement;
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    visibilitySelect: HTMLSelectElement;
    booksList: HTMLUListElement;

    deleteHandler!: (bookId: string) => void;
    editHandler!: (book: Book) => void;
    openHandler!: (bookId: string) => void;

    constructor() {
        const form = document.getElementById("book-form");

        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");
        const visibilitySelect = document.getElementById("visibility");

        const booksList = document.getElementById("books-list");

        if (
            !form ||
                !titleInput ||
                !descriptionInput ||
                !visibilitySelect ||
                !booksList
            ) {
                throw new Error("Book view elements not found.");
        }

        this.form = form as HTMLFormElement;

        this.titleInput = titleInput as HTMLInputElement;

        this.descriptionInput = descriptionInput as HTMLInputElement;

        this.visibilitySelect = visibilitySelect as HTMLSelectElement;

        this.booksList = booksList as HTMLUListElement;
    }

    getFormData() {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            visibility: this.visibilitySelect.value
        };
    }

    clearForm(): void {

        this.form.reset();

    }

    /**
     * Fills the form with the selected book data.
     *
     * param {Book} book - Book to edit.
     */
    fillForm(book: Book): void {
        this.titleInput.value = book.title;
        this.descriptionInput.value = book.description ?? "";
        this.visibilitySelect.value = book.visibility ?? "Private";
    }

    renderBooks(books: Book[]): void{
        this.booksList.innerHTML = "";

        books.forEach(book => {
            const bookItem = document.createElement("li");

            bookItem.classList.add("book-card");

            const title = document.createElement("h3");

            title.textContent = book.title;

            const description = document.createElement("p");

            description.textContent = book.description ?? "";

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
                    if (!book.id) {
                        return;
                    }
                this.deleteHandler(book.id);
            });

            editButton.addEventListener("click", () => {
                this.editHandler(book);
            });

            openButton.addEventListener("click", () => {
                    if (!book.id) {
                        return;
                    }
                this.openHandler(book.id);
            });
            

            this.booksList.appendChild(bookItem);
        });
    }

    bindDeleteBook(handler: (bookId: string) => void): void {
        this.deleteHandler = handler;
    }

    bindEditBook(handler: (book: Book) => void): void {
        this.editHandler = handler;
    }

    bindOpenBook(handler: (bookId: string) => void): void {
        this.openHandler = handler;
    }
}