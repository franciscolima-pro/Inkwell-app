export default class Page {

    constructor({
        id = null,
        chapterId,
        title,
        content,
        order
    }) {

        this.id = id;
        this.chapterId = chapterId;
        this.title = title;
        this.content = content;
        this.order = order;

    }


    // Convert Page object into Firestore document format
    toFirestore() {

        return {
            chapterId: this.chapterId,
            title: this.title,
            content: this.content,
            order: this.order
        };

    }


    // Convert Firestore document into Page object
    static fromFirestore(doc) {

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