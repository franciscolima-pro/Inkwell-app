import { useEffect, useState } from "react";
import Page from "../models/Page";

interface PageFormProps {
    chapterId: string;
    editingPage: Page | null;
    onSubmit: (page: Page) => Promise<void>;
}

export default function PageForm({
    chapterId,
    editingPage,
    onSubmit
}: PageFormProps) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [order, setOrder] = useState(1);

    useEffect(() => {

        if (editingPage) {

            setTitle(editingPage.title);
            setContent(editingPage.content);
            setOrder(editingPage.order);

        } else {

            setTitle("");
            setContent("");
            setOrder(1);

        }

    }, [editingPage]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const page = new Page({

            id: editingPage?.id ?? null,

            chapterId,

            title,

            content,

            order

        });

        await onSubmit(page);

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

            <textarea
                placeholder="Content"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">

                {editingPage ? "Update Page" : "Create Page"}

            </button>

        </form>

    );

}