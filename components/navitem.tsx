import Link from "next/link";

import styles from "../styles/navbar.module.css"

type Data = {
    text: string;
    href: string;
    active: boolean;
};

const NavItem = ({ text, href, active }: Data) => {
    return (
        <Link href={href}>
            <p className={styles.navlink}>{text}</p>
        </Link>
    );
};

export default NavItem;