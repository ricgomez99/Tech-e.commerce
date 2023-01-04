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
    try {
      const data = async () => {
        await logicDelete(id, enable);
      };
      data();
    } catch (error) {
      console.log(error);
    }
  }, [enable]);

  return (
    <div>
      {enable ? (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleClick}
        >
          Disable
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleClick}
        >
          Enable
        </button>
      )}
    </div>
  );
}
