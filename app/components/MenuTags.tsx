"use client";

import styles from "@/styles/home.module.scss";
import TagItem from "./TagItem";
import { useRef } from "react";

import { GiHamburgerMenu } from "react-icons/gi";

//Contains all tags allowed to be choosen
export default function MenuTags() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenuTags = () => {
        const menu = menuRef.current as HTMLDivElement;
        if (menu) {
            menu.classList.toggle(styles.hiddenMenu);
        }
    };

    return (
        <div
            data-testid="menutags"
            ref={menuRef}
            className={`${styles.menuCateogories} ${styles.hiddenMenu}`}
        >
            <button type="button" onClick={toggleMenuTags}>
                <GiHamburgerMenu />
            </button>

            <ul>
                <TagItem tag="all" />
                <TagItem tag="ui" />
                <TagItem tag="ux" />
                <TagItem tag="enhancement" />
                <TagItem tag="bug" />
                <TagItem tag="feature" />
            </ul>
        </div>
    );
}
