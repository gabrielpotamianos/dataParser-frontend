import React from "react";
import "./FilterBar.css";

export default function FilterBar({ value, onSearch }) {
  return (
    <div className="filter-bar-wrapper">
      <div className="filter-bar">
        <input
          type="text"
          value={value}
          placeholder="Search candidates, positions, skills, companies..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      </div>
    </div>
  );
}
