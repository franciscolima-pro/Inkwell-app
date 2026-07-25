import { DocumentSnapshot } from "firebase/firestore";

interface ChapterData{
        id?: string | null;
        bookId: string;
        title: string;
        order?: number;
        createdAt?: Date;
        updatedAt?: Date
}

interface ChapterFirestoreData {
    bookId: string;
    title: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export default class Chapter {
    id: string | null;
    bookId: string;
    title: string;
    order: number;
    createdAt: Date;
    updatedAt: Date

    constructor({
        id = null,
        bookId,
        title,
        order = 0,
        createdAt = new Date(),
        updatedAt = new Date()
    }:ChapterData ){
        this.id = id;
        this.bookId = bookId;
        
        this.title = title;
        this.order = order;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    /**
     * Converts the Chapter object into a Firestore document.
     */
    toFirestore(): ChapterFirestoreData {
        return{
            bookId: this.bookId,
            title: this.title,
            order: this.order,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    /**
     * Creates a Chapter instance from a Firestore document.
     */
    static fromFirestore(docSnapshot: DocumentSnapshot): Chapter {
        const data = docSnapshot.data();

        if (!data) {
            throw new Error("Chapter document does not exist.");
        }

        return new Chapter({
            id: docSnapshot.id,
            bookId: data.bookId,
            title: data.title,
            order: data.order,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate()
        });
    }
}