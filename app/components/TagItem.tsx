"use client";

import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag, selectTag } from "../redux/slices/tagSlice";
import { memo, useState } from "react";

import styles from "@/styles/home.module.scss";

/*
This is the component of all tags shown in the side menu on the home page
*/
const TagItem = ({ tag }: { tag: string }) => {
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
};

export default memo(TagItem);
