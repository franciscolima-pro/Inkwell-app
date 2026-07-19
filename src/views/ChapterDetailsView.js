export default class ChapterDetailsView {

    constructor() {

        this.backButton = document.getElementById("back-button");

        this.title = document.getElementById("chapter-title");
        this.order = document.getElementById("chapter-order");

        this.pageForm = document.getElementById("page-form");

        this.pageTitleInput = document.getElementById("page-title");
        this.pageOrderInput = document.getElementById("page-order");
        this.pageContentInput = document.getElementById("page-content");

        this.pagesList = document.getElementById("pages-list");

    }

    fillPageForm(page) {

        this.pageTitleInput.value = page.title;

        this.pageOrderInput.value = page.order;

        this.pageContentInput.value = page.content;

    }

    getPageFormData() {

        return {

            title: this.pageTitleInput.value.trim(),

            order: Number(this.pageOrderInput.value),

            content: this.pageContentInput.value.trim()

        };

    }

    clearPageForm() {

        this.pageForm.reset();

    }

    /**
     * Displays all pages of the current chapter.
     *
     * param {Page[]} pages
     */
    renderPages(pages) {

        this.pagesList.innerHTML = "";

        pages.forEach(page => {
            const pageItem = document.createElement("div");

            pageItem.classList.add("page-card");

            const title = document.createElement("h3");

            title.textContent = page.title;

            const order = document.createElement("small");

            order.textContent = `Page ${page.order}`;


            // Itl will be added to improve the user interface, but for now, we will focus on the others functionalities.

            // const openButton = document.createElement("button");
            // openButton.textContent = "Open";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            pageItem.appendChild(title);

            pageItem.appendChild(order);

            // pageItem.appendChild(openButton);

            pageItem.appendChild(editButton);

            pageItem.appendChild(deleteButton);

            deleteButton.addEventListener("click", () => {
                this.deleteHandler(page.id);
            });

            editButton.addEventListener("click", () => {
                this.editHandler(page);
            });

            this.pagesList.appendChild(pageItem);
        });

    }

    /**
     * Displays the chapter information.
     *
     * param {Chapter} chapter
     */
    renderChapterDetails(chapter) {

        this.title.textContent = chapter.title;

        this.order.textContent = `Chapter ${chapter.order}`;

    }

    bindBackButton(handler) {

        this.backButton.addEventListener("click", handler);

    }

    /**
     * Registers the delete handler.
     *
     * param {Function} handler
     */
    bindDeletePage(handler) {
        this.deleteHandler = handler;
    }

    /**
    * Registers the edit handler.
    *
    * param {Function} handler
    */
    bindEditPage(handler) {
        this.editHandler = handler;
    }

}