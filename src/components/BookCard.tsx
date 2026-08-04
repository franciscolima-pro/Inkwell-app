import Book from "../models/Book";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onOpen: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function BookCard({ book, onEdit, onDelete, onOpen }: BookCardProps) {
    const navigate = useNavigate();
    return (
        <article className="book-card">
            <h3>{book.title}</h3>

            <p>{book.description ?? ""}</p>

            <small>
                Visibility: {book.visibility ?? "private"}
            </small>
            {book.id && (
                <>
                    <button
                        onClick={() => {
                            if (book.id) {
                                navigate(`/books/${book.id}`);
                            }
                        }}
                    >
                        Open
                    </button>

                    <button onClick={() => onEdit(book)}>
                        Edit
                    </button>

                    <button onClick={() => onDelete(book.id!)}>
                        Delete
                    </button>
                </>
            )}
        </article>
    );
}