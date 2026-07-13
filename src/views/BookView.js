export default class BookView {

    constructor() {
        this.form = document.getElementById("book-form");

        this.titleInput = document.getElementById("title");
        this.descriptionInput = document.getElementById("description");
        this.visibilitySelect = document.getElementById("visibility");

        this.booksList = document.getElementById("books-list");
    }

    getFormData() {
        return {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            visibility: this.visibilitySelect.value
        };
    }

    clearForm() {

        this.form.reset();

    }
}