import { db } from "../config/firebase.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where
} from "firebase/firestore";

import Page from "../models/Page.js";


export default class PageService {


    /**
     * Creates a new page in Firestore.
     *
     * param {Page} page - Page to be saved.
     */
    async createPage(page) {

        if (!(page instanceof Page)) {
            throw new Error("The parameter must be a Page.");
        }

        const docRef = await addDoc(
            collection(db, "pages"),
            page.toFirestore()
        );

        page.id = docRef.id;

        console.log("Page created with ID:", page.id);
    }

    /**
     * Returns all pages that belong to a chapter.
     *
     * param {string} chapterId - Chapter identifier.
     * returns {Promise<Page[]>}
     */
    async getPagesByChapterId(chapterId) {

        if (!chapterId) {
            throw new Error("Chapter ID is required.");
        }

        const q = query(
            collection(db, "pages"),
            where("chapterId", "==", chapterId)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => Page.fromFirestore(doc));

    }

    /**
     * Returns a page by its ID.
     *
     * param {string} pageId - Page identifier.
     * returns {Promise<Page|null>}
     */
    async getPageById(pageId) {

        if (!pageId) {
            throw new Error("Page ID is required.");
        }

        const pageRef = doc(db, "pages", pageId);

        const pageSnapshot = await getDoc(pageRef);

        if (pageSnapshot.exists()) {
            return Page.fromFirestore(pageSnapshot);
        }

        return null;

    }

    /**
     * Updates an existing page.
     *
     * param {Page} page - Page to update.
     */
    async updatePage(page) {

        if (!(page instanceof Page)) {
            throw new Error("The parameter must be a Page.");
        }

        const pageRef = doc(db, "pages", page.id);

        await updateDoc(pageRef, page.toFirestore());

        console.log("Page updated successfully:", page.id);

    }

    /**
     * Deletes a page by its ID.
     *
     * param {string} pageId - Page identifier.
     */
    async deletePage(pageId) {

        if (!pageId) {
            throw new Error("Page ID is required.");
        }

        const pageRef = doc(db, "pages", pageId);

        await deleteDoc(pageRef);

        console.log("Page deleted successfully:", pageId);

    }

}