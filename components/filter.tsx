import styles from "styles/filter.module.css";

export default function Filter({ categories, handleConditions }: any) {
  const handlerOnClick = (e: any) => {
    e.preventDefault();
    handleConditions({ categories: e.target.outerText });
  };
  return (
    <div className={styles.container}>
      {categories?.map((e: any) => (
        <div
          key={e.id}
          onClick={(e) => handlerOnClick(e)}
          style={{ cursor: "pointer" }}
        >
          {" "}
          {e.categories}{" "}
        </div>
      ))}
    </div>
  );
}
