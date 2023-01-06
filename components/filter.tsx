import styles from "styles/filter.module.css";
import { useEffect, useState } from "react";

interface Cat {
  id: number;
  categories: string;
}

export default function Filter({
  categories,
  handleConditions,
}: any): JSX.Element {
  const [state, setState] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.value === "All") {
      setState("");
    } else {
      state === e.target.value ? setState("") : setState(e.target.value);
    }
  };

  useEffect(() => {
    handleConditions({ categories: state });
  }, [state]);

  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={(e) => handleClick(e)}>
        <option value="All" className={styles.option}>
          All
        </option>
        {categories?.map((e: Cat) => (
          <option key={e.id} value={e.categories} className={styles.option}>
            {e.categories}
          </option>
        ))}
      </select>
    </div>
  );
}
