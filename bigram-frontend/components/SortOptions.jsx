import React, { useState } from 'react'

const SortOptions = ({ sortBy, setSortBy }) => {
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div id="sort-options">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="alpha">Alphabetical</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        <option value="">None</option>
      </select>
    </div>
  )
}

export default SortOptions