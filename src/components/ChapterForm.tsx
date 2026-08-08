import { useEffect, useState } from "react";
import Chapter from "../models/Chapter";

interface ChapterFormProps {
    editingChapter: Chapter | null;
    bookId: string;
    onSubmit: (chapter: Chapter) => Promise<void>;
}

export default function ChapterForm({
    editingChapter,
    bookId,
    onSubmit
}: ChapterFormProps) {

    const [title, setTitle] = useState("");
    const [order, setOrder] = useState(1);

    useEffect(() => {

        if (editingChapter) {

            setTitle(editingChapter.title);
            setOrder(editingChapter.order);

        } else {

            setTitle("");
            setOrder(1);

        }

    }, [editingChapter]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const chapter = new Chapter({

            id: editingChapter?.id ?? null,

            bookId,

            title,

            order

        });

        await onSubmit(chapter);

    }

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="number"
                placeholder="Order"
                value={order}
                required
                min={1}
                onChange={(e) => setOrder(Number(e.target.value))}
            />

            <button type="submit">

                {editingChapter ? "Update Chapter" : "Create Chapter"}

            </button>

        </form>

    );

}