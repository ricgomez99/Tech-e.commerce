import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import SignInModal from "./signinmodal";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean>(false);

  const { data: session } = useSession();

  return (
    <header>
      <nav className={styles.navbar}>
        <Link href="/" className="ps-3 navbar-brand">
          <Image src="/img/e-commerce.png" alt="logo" width={35} height={35} />
        </Link>
        <div>
          {session ? (
            <span>Hello, {session.user?.name?.split(" ")[0]}</span>
          ) : null}
        </div>
        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.nav__menu_bar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          className={`${
            navActive
              ? `${styles.nav__menu_list + " " + styles.nav__menu_list_active}`
              : `${styles.nav__menu_list}`
          } `}
        >
          <Link
            href="/store"
            style={{ textDecoration: "none", color: "black" }}
          >
            Store
          </Link>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
          {!session && <SignInModal />}
          {session && (
            <a className="a_pointer" onClick={() => signOut()}>
              Sign Out
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
