import Chapter from "../models/Chapter";

interface ChapterCardProps {

    chapter: Chapter;

    onEdit: (chapter: Chapter) => void;

    onDelete: (id: string) => void;

    onOpen: (id: string) => void;

}

export default function ChapterCard({

    chapter,

    onEdit,

    onDelete,

    onOpen

}: ChapterCardProps) {

    return (

        <article className="chapter-card">

            <div className="chapter-info">

                <span className="chapter-number">
                    Chapter {chapter.order}
                </span>

                <h3>
                    {chapter.title}
                </h3>

            </div>


            <div className="chapter-actions">

                <button
                    className="open-btn"
                    onClick={() => onOpen(chapter.id!)}
                >
                    Open
                </button>

                <button
                    className="edit-btn"
                    onClick={() => onEdit(chapter)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(chapter.id!)}
                >
                    Delete
                </button>

            </div>

        </article>

    );

}