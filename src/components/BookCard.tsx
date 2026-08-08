import Book from "../models/Book";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
    onOpen: (id: string) => void;
}

export default function BookCard({
    book,
    onEdit,
    onDelete,
    onOpen
}: BookCardProps) {

    return (

        <article className="book-card">

            <div className="book-header">

                <div>

                    <h3>📖 {book.title}</h3>

                    <p>
                        {book.description || "No description provided."}
                    </p>

                </div>

                <span
                    className={`badge ${book.visibility}`}
                >
                    {book.visibility}
                </span>

            </div>

            <div className="book-actions">

                <button
                    className="open-btn"
                    onClick={() => onOpen(book.id!)}
                >
                    Open
                </button>

                <button
                    className="edit-btn"
                    onClick={() => onEdit(book)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(book.id!)}
                >
                    Delete
                </button>

            </div>

        </article>

    );

}
