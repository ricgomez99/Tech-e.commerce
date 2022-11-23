import Link from "next/link";
//import style from "../styles/menu.module.css";

export default function Navbar() {

    return (
        <nav>
            <div>
                <h1>La NAVBAR va aquí, links finales pendientes</h1>
                <Link href="/">
                    Home
                </Link>
                <Link href="/store">
                    Store
                </Link>
                <Link href="/about">
                    About
                </Link>
            </div>
        </nav>
    );
};