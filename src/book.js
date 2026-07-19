import Book from "./models/Book.js";
import BookService from "./services/BookService.js";
import BookController from "./controllers/BookController.js";

import BookDetailsController from "./controllers/BookDetailsController.js";

const detailsController = new BookDetailsController();

detailsController.init();