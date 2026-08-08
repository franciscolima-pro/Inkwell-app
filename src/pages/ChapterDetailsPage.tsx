import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../models/Page";
import PageService from "../services/PageService";
import ChapterService from "../services/ChapterService";
import PageForm from "../components/PageForm";
import Chapter from "../models/Chapter";
import PageCard from "../components/PageCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
    

export default function ChapterDetailsPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);

    const pageService = new PageService();
    const chapterService = new ChapterService();
    const navigate = useNavigate();

    const { chapterId } = useParams();

    async function loadChapter() {

        if (!chapterId) return;
        const data = await chapterService.getChapterById(chapterId);
        setChapter(data);
    }

    async function loadPages() {

        if (!chapterId) return;

        const data =
            await pageService.getPagesByChapterId(chapterId);

        setPages(data);

    }

    useEffect(() => {

        loadChapter();
        loadPages();

    }, []);

    const handleSave = async (
        page: Page
    ) => {

        if (editingPage) {

            await pageService.updatePage(page);

            setEditingPage(null);

        } else {

            await pageService.createPage(page);

        }

        await loadPages();

    };

    const handleEdit = (
        page: Page
    ) => {

        setEditingPage(page);

    };

    const handleDelete = async (
        id: string
    ) => {

        if (!confirm("Delete this page?")) {
            return;
        }

        await pageService.deletePage(id);

        await loadPages();

    };

return (

    <>

        <Header />

        <main className="container">

            <button
                className="back-button"
                onClick={() => navigate(`/books/${chapter?.bookId}`)}
            >
                ← Back to Book
            </button>


            {/* ==========================
                CHAPTER HEADER
            ========================== */}

            {chapter && (

                <section className="details-hero">

                    <div className="details-icon">
                        📑
                    </div>

                    <div className="details-content">

                        <span className="chapter-number">
                            Chapter {chapter.order}
                        </span>

                        <h1>
                            {chapter.title}
                        </h1>

                    </div>

                </section>

            )}


            {/* ==========================
                PAGE FORM
            ========================== */}

            <section className="content-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            {editingPage
                                ? "Edit Page"
                                : "Add Page"}
                        </h2>

                        <p>
                            Create and organize the pages of this chapter.
                        </p>

                    </div>

                    <span className="section-icon">
                        ✚
                    </span>

                </div>

                {chapter && (

                    <PageForm

                        chapterId={chapter.id!}

                        editingPage={editingPage}

                        onSubmit={handleSave}

                    />

                )}

            </section>


            {/* ==========================
                PAGES LIST
            ========================== */}

            <section className="content-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            Pages
                        </h2>

                        <p>
                            Manage the pages in this chapter.
                        </p>

                    </div>

                    <span className="section-icon">
                        📄
                    </span>

                </div>


                <div className="pages-list">

                    {pages.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                📄
                            </div>

                            <h3>
                                No pages yet
                            </h3>

                            <p>
                                Add your first page above.
                            </p>

                        </div>

                    ) : (

                        pages.map(page => (

                            <PageCard

                                key={page.id}

                                page={page}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                            />

                        ))

                    )}

                </div>

            </section>

        </main>

    </>

);

}