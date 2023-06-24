"use client";

import styles from "@/styles/home.module.scss";
import TagItem from "./TagItem";

export default function MenuTags() {
    return (
        <div className={styles.menuCateogories}>
            <ul>
                <TagItem tag="All" />
                <TagItem tag="UI" />
                <TagItem tag="UX" />
                <TagItem tag="Enhancement" />
                <TagItem tag="Bug" />
                <TagItem tag="Feature" />
            </ul>
        </div>
    );
}
