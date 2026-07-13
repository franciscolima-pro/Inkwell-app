export default class Chapter {
    constructor({
        id = null,
        bookId,
        title,
        order = 0,
    }){
        this.id = id;
        this.bookId = bookId;
        
        this.title = title;
        this.order = order;
    }
}