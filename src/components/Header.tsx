import { Link } from "react-router-dom";

export default function Header() {

    return (

        <header className="app-header">

            <div className="header-content">

                <Link
                    to="/"
                    className="brand"
                >

                    <span className="brand-icon">
                        ✦
                    </span>

                    <span className="brand-name">
                        Inkwell
                    </span>

                </Link>

                <div className="header-divider"></div>

                <div className="header-info">

                    <span className="header-title">
                        Your personal library
                    </span>

                    <span className="header-subtitle">
                        Create, organize and manage your books.
                    </span>

                </div>

            </div>

        </header>

    );

}