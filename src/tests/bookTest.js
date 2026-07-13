import Book from "../models/Book.js";
import BookService from "../services/BookService.js";
import BookController from "../controllers/BookController.js";

const service = new BookService();
const controller = new BookController();

const bookId = "WuGxmJhAD2DpPTQ713Or";

controller.init();

// const book = new Book({
//     title: "My first book",
//     description: "Testing Firestore",
//     authorId: "123456"
// });

// const savedBook = await service.createBook(book);

// console.log(savedBook);

///////////////////////////////////////////////////////////////

// const book = await service.getBookById(bookId);

// console.log("Before update:", book);

// book.description = "My Updated description test";

// await service.updateBook(book);

// console.log("After update:", book);

//////////////////////////////////////////////////////////////////

// await service.deleteBook(bookId);