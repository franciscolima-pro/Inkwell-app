import { Routes, Route } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";

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

        </Routes>

    );

}