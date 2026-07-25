import { QueryDocumentSnapshot, DocumentData} from "firebase/firestore";

interface PageData{
    id?: string | null;
    chapterId: string;
    title: string;
    content: string;
    order: number
}

export default class Page {
    id: string | null;
    chapterId: string;
    title: string;
    content: string;
    order: number

    constructor({
        id = null,
        chapterId,
        title,
        content,
        order
    }: PageData) {

        this.id = id;
        this.chapterId = chapterId;
        this.title = title;
        this.content = content;
        this.order = order;

    }


    // Convert Page object into Firestore document format
    toFirestore(): Omit<PageData, "id"> {

        return {
            chapterId: this.chapterId,
            title: this.title,
            content: this.content,
            order: this.order
        };

    }


    // Convert Firestore document into Page object
    static fromFirestore(doc: QueryDocumentSnapshot<DocumentData>): Page {

        const data = doc.data();

        return new Page({

            id: doc.id,

            chapterId: data.chapterId,

            title: data.title,

            content: data.content,

            order: data.order

        });

    }

}