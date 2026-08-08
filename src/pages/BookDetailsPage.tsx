import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Book from "../models/Book";
import Chapter from "../models/Chapter";
import ChapterCard from "../components/ChapterCard";
import ChapterForm from "../components/ChapterForm";
import Header from "../components/Header";

import BookService from "../services/BookService";
import ChapterService from "../services/ChapterService";

export default function BookDetailsPage() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

    const bookService = new BookService();
    const chapterService = new ChapterService();

    useEffect(() => {

        loadBook();
        loadChapters();

    }, []);

    async function loadBook() {

        if (!bookId) return;

        const data = await bookService.getBookById(bookId);

        setBook(data);

    }

    async function loadChapters() {

        if (!bookId) return;

        const data = await chapterService.getChaptersByBookId(bookId);

        setChapters(data);

    }

    const handleEdit = (
        chapter: Chapter
    ) => {

        setEditingChapter(chapter);

    };

    const handleDelete = async (id: string) => {

        if (!confirm("Delete this chapter?")) {
            return;
        }

        await chapterService.deleteChapter(id);

        await loadChapters();

    };

    const handleOpen = (id: string) => {

        navigate(`/chapters/${id}`);

    };

    const handleSave = async (
        chapter: Chapter
    ) => {

        if (editingChapter) {

            await chapterService.updateChapter(chapter);

            setEditingChapter(null);

        } else {

            await chapterService.createChapter(chapter);

        }

        await loadChapters();

    };
return (

    <>

        <Header />

        <main className="container">

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Books
            </button>


            {/* ==========================
                BOOK HEADER
            ========================== */}

            <section className="details-hero">

                <div className="details-icon">
                    📖
                </div>

                <div className="details-content">

                    <h1>
                        {book?.title}
                    </h1>

                    <p>
                        {book?.description || "No description provided."}
                    </p>

                    <span
                        className={`badge ${book?.visibility}`}
                    >
                        {book?.visibility}
                    </span>

                </div>

            </section>


            {/* ==========================
                CHAPTER FORM
            ========================== */}

            <section className="content-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            {editingChapter
                                ? "Edit Chapter"
                                : "Add Chapter"}
                        </h2>

                        <p>
                            Create and organize the chapters of your book.
                        </p>

                    </div>

                    <span className="section-icon">
                        ✚
                    </span>

                </div>

                {book && (

                    <ChapterForm

                        bookId={book.id!}

                        editingChapter={editingChapter}

                        onSubmit={handleSave}

                    />

                )}

            </section>


            {/* ==========================
                CHAPTERS LIST
            ========================== */}

            <section className="content-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            Chapters
                        </h2>

                        <p>
                            Explore and manage the chapters in this book.
                        </p>

                    </div>

                    <span className="section-icon">
                        📑
                    </span>

                </div>


                <div className="chapters-list">

                    {chapters.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                📑
                            </div>

                            <h3>
                                No chapters yet
                            </h3>

                            <p>
                                Add your first chapter above.
                            </p>

                        </div>

                    ) : (

                        chapters.map(chapter => (

                            <ChapterCard

                                key={chapter.id}

                                chapter={chapter}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                                onOpen={handleOpen}

                            />

                        ))

                    )}

                </div>

            </section>

        </main>

    </>

);

}