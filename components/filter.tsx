import styles from "styles/filter.module.css";
import { useEffect, useState } from "react";

interface Cat {
  id: number;
  categories: string;
}

export default function Filter({ categories, handleConditions }: any) {
  const [state, setState] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log("papa",e)
    if(e.target.value === "ALL" ){
      setState("");
    }
    state === e.target.value ? setState("") : setState(e.target.value);
  };

  useEffect(() => {
    handleConditions({ categories: state });
  }, [state]);
  console.log(categories)

  return (
    <div className={styles.container}>
      <select onChange={(e) => handleClick(e)}>
        <option value= "ALL" >ALL</option>
        {categories?.map((e: Cat)=>(
          <option key={e.id} value={e.categories}>
            {e.categories}
          </option>
        ))}
      </select>   
     
    </div>
  );
}
// {categories?.map((e: any) => (
//   <div
//     key={e.id}
//     onClick={(e) => handlerOnClick(e)}
//     className={state === e.categories ? styles.filtered : styles.filter}
//   >
//     {e.categories}
//   </div>
// ))}