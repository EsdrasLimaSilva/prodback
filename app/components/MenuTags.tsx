"use client";

import styles from "@/styles/home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag, selectTag } from "../redux/slices/tagSlice";
import { useState } from "react";

function TagItem({ tag }: { tag: string }) {
    const { tagsActive } = useSelector(selectTag);
    const [active, setActive] = useState(tagsActive.includes(tag));
    const dispatch = useDispatch();

    const toggleTag = () => {
        if (!active) dispatch(addTag(tag));
        else dispatch(removeTag(tag));

        setActive(!active);
    };

    return (
        <li className={active ? styles.tagActive : ""} onClick={toggleTag}>
            {tag}
        </li>
    );
}

export default async function MenuTags() {
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
