"use client";

import styles from "@/styles/home.module.scss";
import TagItem from "./TagItem";
import { useEffect, useRef, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

//Contains all tags allowed to be choosen
export default function MenuTags() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenuTags = () => {
        const menu = menuRef.current as HTMLDivElement;
        if (menu) {
            menu.classList.toggle(styles.hiddenMenu);
        }
    };

    useEffect(() => {
        setTimeout(() => {}, 3000);
    }, []);

    return (
        <div
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
