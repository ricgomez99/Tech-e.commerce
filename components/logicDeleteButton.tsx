import { useState, useEffect } from "react";
import { logicDelete } from "services/productEndPoints";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LogicDeleteButton({ id, enabled }: any) {
  const actualState = enabled;
  const [enable, setEnable] = useState(actualState);

  const handleClick = async () => {
    setEnable(!enable);
  };

  useEffect(() => {
    const data = async () => {
      await logicDelete(id, enable);
    };
    data();
  }, [enable]);

  return (
    <div>
      {enable ? (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleClick}
        >
          Disabled
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleClick}
        >
          Enabled
        </button>
      )}
    </div>
  );
}
