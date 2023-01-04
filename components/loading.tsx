import styles from "styles/loading.module.css"

export default function Loading(){
    return (
        <div className={styles.spinner}>
  <span></span>
  <span></span>
  <span></span>
</div>
    )
};