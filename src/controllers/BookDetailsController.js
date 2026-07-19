import BookService from "../services/BookService.js";
import BookDetailsView from "../views/BookDetailsView.js";
import ChapterService from "../services/ChapterService.js";
import Chapter from "../models/Chapter.js";

export default class BookDetailsController {

    constructor() {
        this.bookService = new BookService();
        this.chapterService = new ChapterService();
        this.bookDetailsView = new BookDetailsView();

        this.currentBook = null;
        this.editingChapter = null;
    }

    async init() {
        const bookId = new URLSearchParams(window.location.search).get("id");

        this.currentBook = await this.bookService.getBookById(bookId);

        this.bookDetailsView.renderBookDetails(this.currentBook);

        await this.loadChapters();

        this.bookDetailsView.bindBackButton(() => {
            window.location.href = "index.html";
        });

        this.bookDetailsView.chapterForm.addEventListener(
            "submit",
            this.handleSaveChapter.bind(this)
        );

        this.bookDetailsView.bindDeleteChapter(
            this.handleDeleteChapter.bind(this)
        );

        this.bookDetailsView.bindEditChapter(
            this.handleEditChapter.bind(this)
        );

        this.bookDetailsView.bindOpenChapter(
            this.handleOpenChapter.bind(this)
        );
    }

    async handleSaveChapter(event) {
         event.preventDefault();
        
        // Get the current values from the form.
        const formData = this.bookDetailsView.getChapterFormData();

        // Build a new chapter object with the submitted data.
        const chapter = new Chapter({
            bookId: this.currentBook.id,
            title: formData.title,
            order: formData.order,
        });

        if (this.editingChapter) {
            chapter.id = this.editingChapter.id;

            if (!confirm("Are you sure you want to update this chapter?")) {
                return;
            }

            await this.chapterService.updateChapter(chapter);
            this.editingChapter = null; // Reset the editing state.
        }
        else{
            if(!confirm("Are you sure you want to create this chapter?")) {
                return;
            }

            await this.chapterService.createChapter(chapter);
        }

        // Reset the form after saving the book.
        this.bookDetailsView.clearChapterForm();

        await this.loadChapters();
    }

    async loadChapters() {
        const chapters = await this.chapterService.getChaptersByBookId(this.currentBook.id);

        this.bookDetailsView.renderChapters(chapters);
    }

    /**
     * Deletes a chapter and refreshes the chapter list.
     *
     * param {string} chapterId - ID of the chapter to delete.
     */
    async handleDeleteChapter(chapterId) {

        if (!chapterId) {
            console.error("Chapter ID is required.");
            return;
        }

        if (!confirm("Are you sure you want to delete this chapter?")) {
            return;
        }

        // Delete the chapter from Firestore.
        await this.chapterService.deleteChapter(chapterId);

        // Reload the chapter list.
        await this.loadChapters();

    }

    /**
     * Puts the selected chapter into edit mode.
     *
     * param {Chapter} chapter - Chapter selected for editing.
     */
    handleEditChapter(chapter) {

        if (!chapter) {
            console.error("Chapter is required.");
            return;
        }

        // Store the selected chapter.
        this.editingChapter = chapter;

        // Fill the form with the chapter data.
        this.bookDetailsView.fillChapterForm(chapter);

    }

    handleOpenChapter(chapterId) {

        window.location.href = `chapter.html?id=${chapterId}`;

    }

}