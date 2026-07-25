import Chapter from "../models/Chapter";
import Page from "../models/Page";

export default class ChapterDetailsView {
    backButton: HTMLButtonElement;

    title: HTMLElement;
    order: HTMLElement;

    pageForm: HTMLFormElement;

    pageTitleInput: HTMLInputElement;
    pageOrderInput: HTMLInputElement;
    pageContentInput: HTMLTextAreaElement;

    pagesList: HTMLDivElement;


    deleteHandler!: (pageId: string) => void;
    editHandler!: (page: Page) => void;


    constructor() {

        const backButton = document.getElementById("back-button");

        const title = document.getElementById("chapter-title");
        const order = document.getElementById("chapter-order");

        const pageForm = document.getElementById("page-form");

        const pageTitleInput = document.getElementById("page-title");
        const pageOrderInput = document.getElementById("page-order");
        const pageContentInput = document.getElementById("page-content");

        const pagesList = document.getElementById("pages-list");


        if (
            !backButton ||
            !title ||
            !order ||
            !pageForm ||
            !pageTitleInput ||
            !pageOrderInput ||
            !pageContentInput ||
            !pagesList
        ) {
            throw new Error("Chapter details elements not found.");
        }


        this.backButton = backButton as HTMLButtonElement;

        this.title = title;

        this.order = order;


        this.pageForm = pageForm as HTMLFormElement;


        this.pageTitleInput = pageTitleInput as HTMLInputElement;

        this.pageOrderInput = pageOrderInput as HTMLInputElement;

        this.pageContentInput = pageContentInput as HTMLTextAreaElement;


        this.pagesList = pagesList as HTMLDivElement;

    }

    fillPageForm(page: Page): void {

        this.pageTitleInput.value = page.title;

        this.pageOrderInput.value = String(page.order);

        this.pageContentInput.value = page.content;

    }

    getPageFormData() {

        return {

            title: this.pageTitleInput.value.trim(),

            order: Number(this.pageOrderInput.value),

            content: this.pageContentInput.value.trim()

        };

    }

    clearPageForm(): void {

        this.pageForm.reset();

    }

    /**
     * Displays all pages of the current chapter.
     *
     * param {Page[]} pages
     */
    renderPages(pages: Page[]): void {

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
                if (!page.id) {
                    return;
                }
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
    renderChapterDetails(chapter: Chapter): void  {

        this.title.textContent = chapter.title;

        this.order.textContent = `Chapter ${chapter.order}`;

    }

    bindBackButton(handler: () => void): void {

        this.backButton.addEventListener("click", handler);

    }

    /**
     * Registers the delete handler.
     *
     * param {Function} handler
     */
    bindDeletePage(handler: (pageId: string) => void): void {
        this.deleteHandler = handler;
    }

    /**
    * Registers the edit handler.
    *
    * param {Function} handler
    */
    bindEditPage(handler: (page: Page) => void) {
        this.editHandler = handler;
    }

}