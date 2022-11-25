import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import SignInModal from "../pages/signinmodal";

import styles from "../styles/navbar.module.css"


// const MENU_LIST = [
//     { text: "Home", href: "/" },
//     { text: "About", href: "/about" },
//     { text: "Store", href: "/store" },
    
// ];

export const getServerSideProps =  async (context: any) => {
   const session =  await getSession(context)
//    if(!session) return {
//     redirect: {
//         destination: "/"
//     }
//    }
    return {
        props: {
            session,
        }
    }
}
const Navbar = ({session}: any) => {
    const [navActive, setNavActive] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const router = useRouter();


    return (
        <header>
            <nav className={styles.navbar}>
            <Link href="/" className="ps-3 navbar-brand">
                <Image src="/img/e-commerce.png" alt="logo" width={35} height={35} />
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
                    {/* {MENU_LIST.map((menu, idx) => (
                        <div
                            onClick={() => {
                                setActiveIdx(idx);
                                setNavActive(false);
                            }}
                            key={menu.text}
                        >
                            <NavItem active={activeIdx === idx} {...menu} />
                        </div>
                    ))} */}
                    <Link href="/">
                    Home
                    </Link>
                    <Link href="/about">
                    About
                    </Link>
                    <Link href="/store">
                    Store
                    </Link>
                    {/* {router.query.signInModal && (
                        <SingInModal singinmodal={router.query.singinmodal}/>
                    ) } */}
                    { !session  && <Link href="/?signinmodal">
                    Sing In
                    </Link>}
                    { session &&
                    <h3 onClick={() => signOut()}>
                    Sign Out
                    </h3>}
                    
            
                </div>
            </nav>
        </header>
    );
};

export default Navbar;