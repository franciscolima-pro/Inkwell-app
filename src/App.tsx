import { Routes, Route } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ChapterDetailsPage from "./pages/ChapterDetailsPage";

export default function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<BooksPage />}
            />

            <Route
                path="/books/:bookId"
                element={<BookDetailsPage />}
            />

            <Route
                path="/chapters/:chapterId"
                element={<ChapterDetailsPage />}
            />

        </Routes>

    );

}