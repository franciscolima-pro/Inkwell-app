import Book from "./models/Book.js";
import BookService from "./services/BookService.js";
import BookController from "./controllers/BookController.js";

const service = new BookService();
const controller = new BookController();

controller.init();