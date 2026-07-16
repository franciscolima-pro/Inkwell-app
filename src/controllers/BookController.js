import Book from "../models/Book.js";
import BookService from "../services/BookService.js";
import BookView from "../views/BookView.js";

export default class BookController {

    // Create the service and view used by the controller.
    constructor() {
        this.bookService = new BookService();
        this.bookView = new BookView();

        // Stores the book currently being edited.
        // Null means the form is in "create" mode.
        this.editingBook = null;
    }

    // Start listening for the book form submission.
    init() {
        this.bookView.form.addEventListener(
            "submit",
            this.handleSaveBook.bind(this)
        );

        this.bookView.bindDeleteBook(
            this.handleDeleteBook.bind(this)
        );

        this.bookView.bindEditBook(
            this.handleEditBook.bind(this)
        );

        this.loadBooks();
    }

    // Handle the creation of a new book from the form data.
    async handleSaveBook(event) {
        event.preventDefault();

        // Get the current values from the form.
        const formData = this.bookView.getFormData();

        // Build a new book object with the submitted data.
        const book = new Book({
            title: formData.title,
            description: formData.description,
            visibility: formData.visibility,

            authorId: "123456"
        });

        if (this.editingBook) {
            // Keep the original Firestore document ID.
            book.id = this.editingBook.id;

            if (!confirm("Are you sure you want to update this book?")) {
                return;
            }

            await this.bookService.updateBook(book);

            this.editingBook = null;

            console.log("Book updated successfully!", book);

        } else {

            // Save the new book through the service.
            await this.bookService.createBook(book);

            console.log("Book created successfully!", book);
        }

        // Reset the form after saving the book.
        this.bookView.clearForm();

        await this.loadBooks();
    }

    async loadBooks() {
        const books = await this.bookService.getAllBooks();

        this.bookView.renderBooks(books);
    }

    async handleDeleteBook(bookId) {

        if (!bookId) {
            console.error("Book ID is required for deletion.");
            return;
        }

        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }

        await this.bookService.deleteBook(bookId);

        this.loadBooks();
    }

    async handleEditBook(book) {

        if (!book) {
            console.error("Book data is required for editing.");
            return;
        }

        // Store the selected book.
        this.editingBook = book;

        // Fill the form with the book data.
        this.bookView.fillForm(book);


    }

}