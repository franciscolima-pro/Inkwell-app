import Book from "../models/Book.js";
import BookService from "../services/BookService.js";
import BookView from "../views/BookView.js";

export default class BookController {

    // Create the service and view used by the controller.
    constructor() {
        this.bookService = new BookService();
        this.bookView = new BookView();
    }

    // Start listening for the book form submission.
    init() {
        this.bookView.form.addEventListener(
            "submit",
            this.handleCreateBook.bind(this)
        );
    }

    // Handle the creation of a new book from the form data.
    async handleCreateBook(event) {
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

        // Save the new book through the service.
        await this.bookService.createBook(book);

        // Reset the form after a successful creation.
        this.bookView.clearForm();

        console.log("Book created successfully!", book);
    }

}