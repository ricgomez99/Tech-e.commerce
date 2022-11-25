import React, { useState } from "react";
import { nameProduct } from "../services/productEndPoints";

export interface SearchBarProps {
    onSearch(title: string): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

const [title, setTitle] = useState("");



//   const handleSubmit = (e : any) => {
//     e.preventDefault();
//     if(title){
//         nameProduct(title);
//         console.log(nameProduct(title))
//     } else {
//         alert("enter correct value")
//     }

//   }

//   const handleClick = () => {
    
//     onSearch(title);

//   };

  return (
    <form 
    onSubmit={(e) => {
        e.preventDefault();
        onSearch(title);
    }}>
    <div>
      <input
        type="text"
        value={title}
        placeholder="Search product..."
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <button onClick={handleClick}>Search</button> */}
      <button type="submit">Search</button>
    </div>
    </form>
  );
}

export default SearchBar;