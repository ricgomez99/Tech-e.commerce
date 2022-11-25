import React, { useState } from "react";
import { nameProduct } from "../services/productEndPoints";

export default function SearchBar() {

const [title, setTitle] = useState("");

  const handleSubmit = (e : any) => {
    e.preventDefault();
    if(title){
        nameProduct(title);
        console.log(nameProduct(title))
    } else {
        alert("enter correct value")
    }

  }

  const handleChange = (e: any) => {
    
    setTitle(e.target.value);
    

  };

  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="Search product..."
        onChange={handleChange}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
}
