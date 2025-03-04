import React from "react";
import "./styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search for a dataset..."
      value={searchTerm}
      onChange={onSearch}
      className="search-bar"
    />
  );
}
