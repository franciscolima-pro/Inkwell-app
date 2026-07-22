import {db} from '../config/firebase.js';
import {collection, doc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy} from 'firebase/firestore';
import Chapter from '../models/Chapter.js';

export default class ChapterService {
    async createChapter(chapter){
        if (!(chapter instanceof Chapter)) {
            throw new Error("The parameter must be a Chapter.");
        }

        const docRef = await addDoc(
            collection(db, "chapters"),
            chapter.toFirestore()
        )

        chapter.id = docRef.id;
        console.log("Chapter created with ID: ", chapter.id);
    }

    async getChaptersByBookId(bookId) {
        if (!bookId) {
            throw new Error("Book ID is required.");
        }
        // Create a query to get chapters by bookId
        const q = query(
            collection(db, "chapters"),
            where("bookId", "==", bookId),
            orderBy("order")
        );

        const chaptersSnapshot = await getDocs(q);

        // Filter chapters by bookId
        const chapters = chaptersSnapshot.docs
            .map(doc => Chapter.fromFirestore(doc))
        
        return chapters;
    }

    async getChapterById(chapterId) {
        if (!chapterId) {
            throw new Error("Chapter ID is required.");
        }

        const docRef = doc(db, "chapters", chapterId);
        const chapterDoc = await getDoc(docRef);

        if (!chapterDoc.exists()) {
            throw new Error("Chapter not found.");
        }
        
        return Chapter.fromFirestore(chapterDoc);
    }

    async deleteChapter(chapterId) {
        if (!chapterId) {
            throw new Error("Chapter ID is required for deletion.");
        }

        const docRef = doc(db, 'chapters', chapterId);

        await deleteDoc(docRef);
    }

    async updateChapter(chapter) {

        if (!(chapter instanceof Chapter)) {
            throw new Error("The parameter must be a Chapter.");
        }

        const chapterRef = doc(db, "chapters", chapter.id);

        await updateDoc(chapterRef, chapter.toFirestore());

        console.log("Chapter updated successfully:", chapter.id);
    }
}