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

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <br />

            <textarea
                placeholder="Description"
                required
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br />

            <select
                value={visibility}
                required
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

            <br />

            <button type="submit">

                {editingBook

                    ? "Update Book"

                    : "Create Book"}

            </button>

        </form>

    );
}