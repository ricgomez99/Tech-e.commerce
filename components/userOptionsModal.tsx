import styles from "../styles/userOptions.module.css";
import { ReactNode } from "react";
import { BsFillXCircleFill } from "react-icons/bs";

type Action = {
  show?: any;
  onClose?: any;
  children?: ReactNode;
};

export default function UserOptions(props: Action) {
  if (!props.show) return null;

  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <BsFillXCircleFill
            className={styles.button}
            onClick={props.onClose}
          />
        </div>
        <div className={styles.modal_body}>{props.children}</div>
        <div className={styles.modal_footer}></div>
      </div>
    </div>
  );
}
