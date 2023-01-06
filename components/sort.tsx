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
          padding: "6px 20px",
          fontWeight: "500",
          width: "120px"
        }}
        onClick={(e: any)=> handleOnClick(e)}
      >
        PRICE <TbArrowsSort />
      </Button>
    </div>
  );
}
