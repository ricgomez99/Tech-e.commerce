import Link from "next/link";
//import style from "../styles/navBar.module.css";

export default function NavBar() {

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
                {/* falta agregar boton de carrito */}
            </div>
        </nav>
    );
};