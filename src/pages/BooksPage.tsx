import { useEffect, useState } from "react";
import BookService from "../services/BookService";
import { useNavigate } from "react-router-dom";
import Book from "../models/Book";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import Header from "../components/Header";

export default function BooksPage() {

    const [books, setBooks] = useState<Book[]>([]);
    const bookService = new BookService();
    const navigate = useNavigate();

    const [editingBook, setEditingBook] = useState<Book | null>(null);

const loadBooks = async () => {

    const data = await bookService.getAllBooks();

    setBooks(data);

};

useEffect(() => {

    loadBooks();

}, []);

const handleOpen = (id: string) => {
    navigate(`/books/${id}`);
};

const handleEdit = (book: Book) => {
    setEditingBook(book);
};

const handleDelete = async (id: string) => {

    if (!confirm("Delete this book?")) {
        return;
    }

    const service = new BookService();

    await service.deleteBook(id);

    setBooks(books.filter(book => book.id !== id));
};


const handleSaveBook = async (
    book: Book
) => {

    if (editingBook) {

        await bookService.updateBook(book);

        setEditingBook(null);

    } else {

        await bookService.createBook(book);

    }

    await loadBooks();

};

    return (
        <>

        <Header />
        
        <main  className="container">
            <h1>Inkwell App</h1>
            <p className="page-subtitle">
                Create, organize and manage your digital library.
            </p>

            <h2>Books</h2>

            <div className="dashboard">
                <BookForm
                onSubmit={handleSaveBook}
                editingBook={editingBook}
                />

                <section className="books-list">
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onOpen={handleOpen}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </section>
            </div>
        </main>
    </>
    );
}