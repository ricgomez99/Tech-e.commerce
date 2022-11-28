import Filter from "./filter";
import Sort from "./sort";
import styles from "styles/filtersort.module.css"
import { useState, useEffect } from "react";

export default function Filtersort({categories, onFilterSort}:any) {
  const [conditions, setConditions] = useState({})
  
  const handleConditions = (values:any) => {
    setConditions({...conditions, ...values})
  }

  useEffect(() => {
    onFilterSort(conditions)
  }, [conditions])
  
  return (
    <div className={styles.filter_sorter}>
      <button onClick={()=>setConditions({})}> Refresh </button>
      <div className={styles.sort}>        
        <Sort handleConditions={handleConditions} />
      </div>
      <div className={styles.categories}>
        <Filter categories={categories} handleConditions={handleConditions} />
      </div>
    </div>
    
  )
}
