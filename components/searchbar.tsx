import React, { useState } from "react";
export interface SearchBarProps {
  onSearch(title: string): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(title);
        setTitle("")
      }}
    >
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
