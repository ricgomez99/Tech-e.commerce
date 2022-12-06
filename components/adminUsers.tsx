import styles from "../styles/UsersAdmin.module.css";

export default function AdminUsers() {
  return(
    <div className={styles.title}>
      <h3>Users</h3>
      <div className={styles.usersContainer}>
        <div className={styles.userDetail}>
          <h5>User Detail</h5>
          <div className={styles.detail}>
            detalle de usuario
          </div>
        </div>
        <div className={styles.all}>
          todos los usuarios
        </div>
      </div>
    </div>
  );
};