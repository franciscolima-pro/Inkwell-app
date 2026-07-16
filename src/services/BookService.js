import {db} from '../config/firebase.js';
import {collection, doc,  addDoc, getDoc, updateDoc, deleteDoc, getDocs} from 'firebase/firestore';

import Book from '../models/Book.js';

export default class BookService{
    async createBook(book) {

        // 1. Verifica se recebeu um Book
        if (!(book instanceof Book)) {
            throw new Error("The parameter must be a Book.");
        }

        // 2. Salva no Firestore
        const docRef = await addDoc(
            collection(db, "books"),
            book.toFirestore()
        );

        // 3. Atualiza o objeto com o id gerado
        book.id = docRef.id;
        console.log("Book created with ID: ", book.id);
    }

    async getBookById(bookId) {
        if (!bookId) {
            throw new Error("Book ID is required.");
        }

        const docRef = doc(db, 'books', bookId);
        
        const bookSnapshot = await getDoc(docRef);

        // Check if the document exists and return a Book instance if it does
        if (bookSnapshot.exists()) {
            return Book.fromFirestore(bookSnapshot);
        }

        return null // Return null if the book does not exist
    }

    /**
     * Retrieves all books stored in Firestore.
     *
     * returns {Promise<Book[]>} A list of Book objects.
     */
    async getAllBooks() {
        // Reference to the "books" collection.
        const booksCollection = collection(db, 'books');

        // Retrieve every document from the collection.
        const booksSnapshot = await getDocs(booksCollection);

        // Convert each Firestore document into a Book model.
        return booksSnapshot.docs.map(doc => Book.fromFirestore(doc));
    }

    async updateBook(book){
        if (!(book instanceof Book)) {
            throw new Error("The parameter must be a Book.");
        }

        if (!book.id) {
            throw new Error("Book ID is required for update.");
        }

        const docRef = doc(db, 'books', book.id);

        await updateDoc(docRef, book.toFirestore());

        return book; // Return the updated book instance
    }

    async deleteBook(bookId){
        if (!bookId) {
            throw new Error("Book ID is required for deletion.");
        }

        const docRef = doc(db, 'books', bookId);

        await deleteDoc(docRef);
    }
}