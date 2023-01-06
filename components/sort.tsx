import Button from "react-bootstrap/Button";
import { TbArrowsSort } from "react-icons/tb";
import { useState } from "react";

export default function Sort({ handleConditions }: any) {
  const [direction, setDirection] = useState("ASC");

  const handleOnClick = (e: any) => {
    e.preventDefault();
    direction === "DESC" ? setDirection("ASC") : setDirection("DESC");
    handleConditions({
      orderAttribute: "price",
      orderDirection: direction,
    });
  };
  return (
    <div>
      <Button
        variant="light"
        size="sm"
        style={{
          color: "#6B9080",
          padding: "9px 20px",
          fontWeight: "500",
          width: "120px",
          boxShadow: "4px 8px 20px #bbbb",
          borderRadius: "9px",
          background:"#f5f5f5",
        }}
        onClick={(e: any) => handleOnClick(e)}
      >
        PRICE <TbArrowsSort />
      </Button>
    </div>
  );
}
