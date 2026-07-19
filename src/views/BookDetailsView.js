export default class BookDetailsView {

    constructor() {
        this.title = document.getElementById("book-title");

        this.description = document.getElementById("book-description");

        this.visibility = document.getElementById("book-visibility");

        this.backButton = document.getElementById("back-button");

        this.chaptersList = document.getElementById("chapters-list");

        this.chapterForm = document.getElementById("chapter-form");

        this.chapterTitleInput = document.getElementById("chapter-title");

        this.chapterOrderInput = document.getElementById("chapter-order");
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
    fillChapterForm(chapter) {

        this.chapterTitleInput.value = chapter.title;

        this.chapterOrderInput.value = chapter.order;

    }

    clearChapterForm() {
        this.chapterForm.reset();
    }

    renderBookDetails(book) {
        this.title.textContent = book.title;
        this.description.textContent = book.description;
        this.visibility.textContent = `Visibility: ${book.visibility}`;
    }

    bindBackButton(handler) {
        this.backButton.addEventListener("click", handler);
    }

    /**
     * Renders all chapters of the current book.
     *
     * param {Chapter[]} chapters - List of chapters to display.
     */
    renderChapters(chapters) {
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
                this.deleteHandler(chapter.id);
            });

            editButton.addEventListener("click", () => {
                this.editHandler(chapter);
            });

            openButton.addEventListener("click", () => {
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
    bindDeleteChapter(handler) {
        this.deleteHandler = handler;
    }

    /**
     * Registers the edit handler.
     *
     * param {Function} handler - Function called when a chapter is selected for editing.
     */
    bindEditChapter(handler) {
        this.editHandler = handler;
    }

    /**
     * Registers the open chapter handler.
     *
     * param {Function} handler - Function called when a chapter is opened.
     */
    bindOpenChapter(handler) {
        this.openHandler = handler;
    }

}