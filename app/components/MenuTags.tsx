"use client";

import styles from "@/styles/home.module.scss";

export default async function MenuTags() {
    return (
        <div className={styles.menuCateogories}>
            <ul>
                <li className={styles.tagActive}>All</li>
                <li>UI</li>
                <li>UX</li>
                <li>Enhacement</li>
                <li>Bug</li>
                <li>Feature</li>
            </ul>
        </div>
    );
}
