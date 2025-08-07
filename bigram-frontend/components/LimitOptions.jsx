import React, { useState } from 'react'

const LimitOptions = ({ dataLimit, setDataLimit }) => {
  const handleLimitChange = (e) => {
    setDataLimit(e.target.value)
  }

  return (
    <div id="limit-options">
      <label htmlFor="limit-select">Limit results to:</label>
      <select id="limit-select" value={dataLimit} onChange={handleLimitChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="">None</option>
      </select>
    </div>
  )
}

export default LimitOptions