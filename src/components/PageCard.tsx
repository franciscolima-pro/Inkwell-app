import Page from "../models/Page";

interface PageCardProps {

    page: Page;

    onEdit: (page: Page) => void;

    onDelete: (id: string) => void;

}

export default function PageCard({

    page,

    onEdit,

    onDelete

}: PageCardProps) {

    return (

        <article className="page-card">

            <div className="page-info">

                <span className="page-label">
                    Page {page.order}
                </span>

                <h3>
                    {page.title}
                </h3>

                <p>
                    {page.content ||
                        "No content available."}
                </p>

            </div>


            <div className="page-actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(page)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(page.id!)}
                >
                    Delete
                </button>

            </div>

        </article>

    );

}