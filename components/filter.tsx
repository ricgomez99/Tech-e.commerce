import { getProducts2 } from "services/productEndPoints";
import styles from "styles/filter.module.css";

export default function Filter({ categories }: any) {
  const handlerOnClick = (e:any) => {
    e.preventDefault()
    console.log(e.target.outerText)
  }
  return (
    <div className={styles.container}>
      {categories?.map((e:any) => (
        <div key={e.id} onClick = {(e)=>handlerOnClick(e)}  > {e.categories} </div>
      ))}
    </div>
  )
}
