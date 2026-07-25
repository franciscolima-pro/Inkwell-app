import {
    DocumentSnapshot,
    QueryDocumentSnapshot,
    DocumentData
} from "firebase/firestore";

interface BookData{
    id?: string | null;
    title: string;
    description?: string;
    authorId: string;
    visibility?: string;
    coverUrl?: string;
    createdAt?: Date;
    updatedAt?: Date
}

export default class Book {

    id: string | null;
    title: string;
    description?: string;
    authorId: string;
    visibility?: string;
    coverUrl?: string;
    createdAt?: Date;
    updatedAt?: Date

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
    }: BookData){
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
    toFirestore(): Omit<BookData, "id"> {
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
    static fromFirestore(doc: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>): Book {
        const data = doc.data();

        if (!data) {
            throw new Error("Book document does not exist.");
        }

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