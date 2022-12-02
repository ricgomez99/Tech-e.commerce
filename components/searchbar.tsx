import React, {useState} from "react";

const SearchBar = ({handleConditions}: any) => {
  const [title, setTitle] = useState("");

  const handlerOnSubmit = (e: any) => {
    e.preventDefault();
    handleConditions({title});
    setTitle("");
  };

  return (
    <form onSubmit={(e) => handlerOnSubmit(e)}>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Search product..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
