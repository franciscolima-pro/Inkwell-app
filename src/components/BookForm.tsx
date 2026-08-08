import {useEffect, useState } from "react";
import Book from "../models/Book";

interface BookFormProps {
    editingBook: Book | null;
    onSubmit: (book: Book) => void;
}

export default function BookForm({
    editingBook,
    onSubmit
}: BookFormProps) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [visibility, setVisibility] = useState("private");

 useEffect(() => {

    if (editingBook) {

        setTitle(editingBook.title);

        setDescription(
            editingBook.description ?? ""
        );

        setVisibility(
            editingBook.visibility ?? "private"
        );

    } else {

        setTitle("");

        setDescription("");

        setVisibility("private");

    }

}, [editingBook]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const book = new Book({

            title,

            description,

            visibility,

            authorId: "123456"

        });

        if (editingBook) {

            book.id = editingBook.id;

        }

        onSubmit(book);

        setTitle("");
        setDescription("");
        setVisibility("private");
    };

    return (

    <aside className="book-form-card">

        <h2>
            {editingBook
                ? "Edit Book"
                : "Create Book"}
        </h2>

        <form
            className="book-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>Title</label>

                <input
                    type="text"
                    placeholder="Book title"
                    required
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

            </div>

            <div className="form-group">

                <label>Description</label>

                <textarea
                    rows={5}
                    placeholder="Write a short description..."
                    required
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

            </div>

            <div className="form-group">

                <label>Visibility</label>

                <select
                    value={visibility}
                    onChange={(e) =>
                        setVisibility(e.target.value)
                    }
                >

                    <option value="private">
                        Private
                    </option>

                    <option value="public">
                        Public
                    </option>

                </select>

            </div>

            <button
                className="primary-button"
                type="submit"
            >

                {editingBook
                    ? "Update Book"
                    : "Create Book"}

            </button>

        </form>

    </aside>

);
}