export default class Chapter {
    constructor({
        id = null,
        bookId,
        title,
        order = 0,
        createdAt = new Date(),
        updatedAt = new Date()
    }){
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
    toFirestore() {
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
    static fromFirestore(docSnapshot) {
        const data = docSnapshot.data();
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