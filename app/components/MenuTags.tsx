"use client";

import styles from "@/styles/home.module.scss";
import TagItem from "./TagItem";

export default function MenuTags() {
    return (
        <div className={styles.menuCateogories}>
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
