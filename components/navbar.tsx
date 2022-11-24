import Link from "next/link";
import Image from "next/image";

//import style from "../styles/navBar.module.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/" className="ps-3 navbar-brand">
        <Image src="/img/e-commerce.png" alt="logo" width={35} height={35} />
      </Link>
      <div className="container-fluid navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link className="nav-link" href="/store">
          Store
        </Link>
        <Link className="nav-link" href="/about">
          About
        </Link>
        {/* falta agregar boton de carrito */}
      </div>
    </nav>
  );
}
