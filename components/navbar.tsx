import { useAppContext } from "./statewrapper";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import SignInModal from "./signinmodal";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import UserOptions from "./userOptionsModal";
import { BsPersonCircle } from "react-icons/bs";
import { useScrollBlock } from "utils/scrollblock";
import { findUniqueUser } from "services/userEndPoints";

export default function Navbar() {
  const router = useRouter();
  const cart = useAppContext();
  const [navActive, setNavActive] = useState<boolean>(false);

  //User Options State (Modal)
  const [show, setShow] = useState<boolean>(false);
  //Block Sroll bar
  const [blockScroll, allowScroll] = useScrollBlock();

  const { data: session } = useSession();

  function handleOpenCart() {
    cart.openCart();
  }

  const [cartCounter, setCartCounter] = useState<any>(0);

  const handlerRefresh = () => {
    router.push({
      pathname: "/store",
      query: { refresh: "true" },
    });
  };
  
  useEffect(() => {
    setCartCounter(cart.getNumberOfItems());
  }, [cart.addItemToCart, cart.deleteItem]);
  const image: any = session?.user?.image

  return (
    <header>
      <nav className={styles.navbar}>
        <Link href="/" className="ps-3 navbar-brand">
          <Image
            src="https://res.cloudinary.com/davixx5su/image/upload/v1670005747/folder/e-commerce_ctrsgi.png"
            alt="logo"
            width={35}
            height={35}
          />
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
            onClick={
              router.pathname === "/store" ? () => handlerRefresh() : () => null
            }
            style={{ textDecoration: "none", color: "black" }}
          >
            Store
          </Link>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
          <div>
            <button onClick={handleOpenCart}>Cart({cartCounter})</button>
          </div>
          {!session && <SignInModal />}
          {session && (
            <>
              <BsPersonCircle
                onClick={() => {
                  setShow(true);
                  blockScroll();
                }}
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
              <UserOptions
                onClose={() => {
                  setShow(false);
                  allowScroll();
                }}
                show={show}
              >
                <Image
                  src={image}
                  alt="profile picture"
                  className={styles.profilePicture}
                  width={160}
                  height={160}
                />
                <h3>{session.user?.name?.split(" ")[0]}</h3>
                <div className={styles.buttons}>
                  <a
                    className={`btn btn-secondary ${styles.signOutBtn}`}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </a>
                  <Link href="#">
                    <button
                      // onClick={() => {
                      //   setShow(false);
                      //   allowScroll();
                      // }}
                      className={`btn btn-outline-success ${styles.userDetailsBtn}`}
                    >
                      User details
                    </button>
                  </Link>
                  <Link href="/profile/admin" scroll={true}>
                    <button
                      onClick={() => {
                        setShow(false);
                        allowScroll();
                      }}
                      className={`btn btn-outline-success ${styles.userDetailsBtn}`}
                    >
                      Admin Tools
                    </button>
                  </Link>
                </div>
              </UserOptions>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
