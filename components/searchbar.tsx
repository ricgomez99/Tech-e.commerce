import React, { useState } from "react";
import styles from "../styles/searchBar.module.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ handleConditions }: any) {
  const [title, setTitle] = useState("");

  const handlerOnSubmit = (e: any) => {
    e.preventDefault();
    handleConditions({ title });
    setTitle("");
  };

  return (
    <form onSubmit={(e) => handlerOnSubmit(e)}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={title}
          placeholder="Search product..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.submitBtn} type="submit">
          <FiSearch className={styles.searchIcon} />
        </button>
      </div>
    </form>
  );
}
