/*
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

//import style from "../styles/navBar.module.css";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top main-navigation">
            <Link href="/" className="ps-3 navbar-brand">
                <Image src="/img/e-commerce.png" alt="logo" width={35} height={35} />
            </Link>

            <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
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
                {/* falta agregar boton de carrito */ /*}
</div>
</nav>
);
} 
*/

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import NavItem from "./navitem";

import styles from "../styles/navbar.module.css"

const MENU_LIST = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Store", href: "/store" },
];
const Navbar = () => {
    const [navActive, setNavActive] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState(-1);

    return (
        <header>
            <nav className={styles.navbar}>
                <Link href={"/"}>
                    <h1>Logo</h1>

                </Link>
                <div
                    onClick={() => setNavActive(!navActive)}
                    className={styles.nav__menu_bar}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`${navActive ? `${styles.nav__menu_list + ' ' + styles.nav__menu_list_active}` : `${styles.nav__menu_list}`} `}>
                    {MENU_LIST.map((menu, idx) => (
                        <div
                            onClick={() => {
                                setActiveIdx(idx);
                                setNavActive(false);
                            }}
                            key={menu.text}
                        >
                            <NavItem active={activeIdx === idx} {...menu} />
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;