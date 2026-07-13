

export default class Book {
    // Create a new book with the provided data.
    constructor({
        id = null,
        title,
        description = "",
        authorId,
        visibility = "private",
        coverUrl = "",
        createdAt = new Date(),
        updatedAt = new Date()
    }){
        this.id = id;
        this.title = title;
        this.description = description;

        this.authorId = authorId;
        this.visibility = visibility;
        this.coverUrl = coverUrl;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Prepare the book data for Firestore storage.
    toFirestore() {
        return {
            title: this.title,
            description: this.description,
            authorId: this.authorId,
            visibility: this.visibility,
            coverUrl: this.coverUrl,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Build a Book instance from a Firestore document.
    static fromFirestore(doc) {
        const data = doc.data();

        return new Book({
            id: doc.id,
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            visibility: data.visibility,
            coverUrl: data.coverUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }
}