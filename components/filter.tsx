import styles from "styles/filter.module.css";
import {useEffect, useState} from "react";

export default function Filter({categories, handleConditions}: any) {
  const [state, setState] = useState("");

  const handlerOnClick = (e: any) => {
    e.preventDefault();
    state === e.target.outerText ? setState("") : setState(e.target.outerText);
  };

  useEffect(() => {
    handleConditions({categories: state});
  }, [state]);

  return (
    <div className={styles.container}>
      {categories?.map((e: any) => (
        <div
          key={e.id}
          onClick={(e) => handlerOnClick(e)}
          className={
            state === e.categories
              ? styles.filtered
              : styles.filter
          }
        >
          {e.categories}
        </div>
      ))}
      <div></div>
    </div>
  );
}
