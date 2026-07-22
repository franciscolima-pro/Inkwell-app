import ChapterService from "../services/ChapterService.js";
import PageService from "../services/PageService.js";
import ChapterDetailsView from "../views/ChapterDetailsView.js";
import Page from "../models/Page.js";

export default class ChapterDetailsController {

    constructor() {

        this.chapterService = new ChapterService();

        this.pageService = new PageService();

        this.chapterDetailsView = new ChapterDetailsView();

        this.currentChapter = null;

        this.editingPage = null;

    }
    
    async init() {
        const chapterId = new URLSearchParams(window.location.search).get("id");

        this.currentChapter = await this.chapterService.getChapterById(chapterId);

        this.chapterDetailsView.renderChapterDetails(this.currentChapter);

        await this.loadPages();

        this.chapterDetailsView.bindDeletePage(
            this.handleDeletePage.bind(this)
        );

        this.chapterDetailsView.pageForm.addEventListener(
            "submit",
            this.handleSavePage.bind(this)
        );

        this.chapterDetailsView.bindEditPage(
            this.handleEditPage.bind(this)
        );

        this.chapterDetailsView.bindBackButton(() => {
            window.location.href = "book.html";
        });
    }

    async handleSavePage(event) {

        event.preventDefault();

        const formData = this.chapterDetailsView.getPageFormData();

        const page = new Page({
            chapterId: this.currentChapter.id,
            title: formData.title,
            content: formData.content,
            order: formData.order
        });

        if (this.editingPage) {
            page.id = this.editingPage.id;

            if(!confirm("Are you sure you want to update this page?")){
                return;
            }

            await this.pageService.updatePage(page);

            this.editingPage = null;
        }
        else{

            if(!confirm("Are you sure you want to create this page?")){
                return;
            }

            await this.pageService.createPage(page);
        }

        this.chapterDetailsView.clearPageForm();

        await this.loadPages();

    }

    async handleDeletePage(pageId) {

        if (!pageId) {
            console.error("Page ID is required.");
            return;
        }

        if (!confirm("Are you sure you want to delete this page?")) {
            return;
        }

        await this.pageService.deletePage(pageId);

        await this.loadPages();

    }

    handleEditPage(page) {

        if (!page) {
            console.error("Page is required.");
            return;
        }

        this.editingPage = page;

        this.chapterDetailsView.fillPageForm(page);

    }

    /**
     * Loads all pages that belong to the current chapter.
     */
    async loadPages() {

        const pages = await this.pageService.getPagesByChapterId(
            this.currentChapter.id
        );

        this.chapterDetailsView.renderPages(pages);

    }

}