import React, { useState } from 'react'

const TextSubmitForm = ({ inputText, setInputText, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text-input" >
          Enter or paste some text here:
        </label>
        <textarea
          id="text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="8"
        >
        </textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? 'Analyzing...' : 'Get histogram!'}
      </button>
    </form>
  )
}

export default TextSubmitForm