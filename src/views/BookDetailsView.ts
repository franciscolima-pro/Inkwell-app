import Book from "../models/Book";
import Chapter from "../models/Chapter";

export default class BookDetailsView {
    title: HTMLElement;
    description: HTMLElement;
    visibility: HTMLElement;

    backButton: HTMLButtonElement;

    chaptersList: HTMLDivElement;

    chapterForm: HTMLFormElement;

    chapterTitleInput: HTMLInputElement;
    chapterOrderInput: HTMLInputElement;


    deleteHandler!: (chapterId: string) => void;
    editHandler!: (chapter: Chapter) => void;
    openHandler!: (chapterId: string) => void;

    constructor() {

        const title = document.getElementById("book-title");
        const description = document.getElementById("book-description");
        const visibility = document.getElementById("book-visibility");

        const backButton = document.getElementById("back-button");

        const chaptersList = document.getElementById("chapters-list");

        const chapterForm = document.getElementById("chapter-form");

        const chapterTitleInput = document.getElementById("chapter-title");

        const chapterOrderInput = document.getElementById("chapter-order");


        if (
            !title ||
            !description ||
            !visibility ||
            !backButton ||
            !chaptersList ||
            !chapterForm ||
            !chapterTitleInput ||
            !chapterOrderInput
        ) {
            throw new Error("Book details elements not found.");
        }


        this.title = title;

        this.description = description;

        this.visibility = visibility;


        this.backButton = backButton as HTMLButtonElement;

        this.chaptersList = chaptersList as HTMLDivElement;

        this.chapterForm = chapterForm as HTMLFormElement;


        this.chapterTitleInput = chapterTitleInput as HTMLInputElement;

        this.chapterOrderInput = chapterOrderInput as HTMLInputElement;

    }

    /**
     * Returns the current chapter form values.
     */
    getChapterFormData() {
        return {
            title: this.chapterTitleInput.value.trim(),
            order: Number(this.chapterOrderInput.value)
        };
    }

    /**
     * Fills the chapter form with the selected chapter data.
     *
     * param {Chapter} chapter - Chapter to edit.
     */
    fillChapterForm(chapter: Chapter): void{

        this.chapterTitleInput.value = chapter.title;

        this.chapterOrderInput.value = String(chapter.order);

    }

    clearChapterForm(): void {
        this.chapterForm.reset();
    }

    renderBookDetails(book: Book): void {
        this.title.textContent = book.title;
        this.description.textContent = book.description ?? "";
        this.visibility.textContent = `Visibility: ${book.visibility}`;
    }

    bindBackButton(handler: () => void): void {
        this.backButton.addEventListener("click", handler);
    }

    /**
     * Renders all chapters of the current book.
     *
     * param {Chapter[]} chapters - List of chapters to display.
     */
    renderChapters(chapters: Chapter[]): void {
        this.chaptersList.innerHTML = "";

        chapters.forEach(chapter => {
            const chapterItem = document.createElement("div");

            chapterItem.classList.add("chapter-card");

            const title = document.createElement("h3");

            title.textContent = chapter.title;

           const order = document.createElement("small");

            order.textContent = `Chapter ${chapter.order}`;

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            const editButton = document.createElement("button");

            editButton.textContent = "Edit";

            const openButton = document.createElement("button");

            openButton.textContent = "Open";

            chapterItem.appendChild(title);
            chapterItem.appendChild(order);
            chapterItem.appendChild(openButton);
            chapterItem.appendChild(editButton);
            chapterItem.appendChild(deleteButton);

            deleteButton.addEventListener("click", () => {
                    if (!chapter.id) {
                        return;
                    }
                this.deleteHandler(chapter.id);
            });

            editButton.addEventListener("click", () => {
                this.editHandler(chapter);
            });

            openButton.addEventListener("click", () => {
                if (!chapter.id) {
                    return;
                }
                this.openHandler(chapter.id);
            });

            this.chaptersList.appendChild(chapterItem);
        });
    }

    /**
     * Registers the delete handler.
     *
     * param {Function} handler - Function called when a chapter is deleted.
     */
    bindDeleteChapter(handler: (chapterId: string) => void): void {
        this.deleteHandler = handler;
    }

    /**
     * Registers the edit handler.
     *
     * param {Function} handler - Function called when a chapter is selected for editing.
     */
    bindEditChapter(handler: (chapter: Chapter) => void): void {
        this.editHandler = handler;
    }

    /**
     * Registers the open chapter handler.
     *
     * param {Function} handler - Function called when a chapter is opened.
     */
    bindOpenChapter(handler: (chapterId: string) => void) {
        this.openHandler = handler;
    }

}