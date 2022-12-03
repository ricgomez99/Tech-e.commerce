import Button from "react-bootstrap/Button";
import {TbArrowsSort} from "react-icons/tb";
import {useState} from "react";

export default function Sort({handleConditions}: any) {
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
      <Button variant="light" onClick={(e) => handleOnClick(e)}>
        PRICE <TbArrowsSort />
      </Button>
    </div>
  );
}
