

export default class Page {
    constructor({
        id = null,
        chapterId,
        title,
        content = "",
        order = 0
    }){
        this.id = id;
        this.chapterId = chapterId;
        this.title = title;

        this.content = content;
        this.order = order;
    }
}