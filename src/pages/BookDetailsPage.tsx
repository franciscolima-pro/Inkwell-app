import { useParams } from "react-router-dom";

export default function BookDetailsPage() {

    const { bookId } = useParams();

    return (

        <main>

            <h1>Book Details</h1>

            <p>Book ID: {bookId}</p>

        </main>

    );

}