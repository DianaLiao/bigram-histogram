import React, { useState } from 'react'

const TextSubmitForm = ({ inputText, setInputText, handleSubmit, isLoading }) => {
  return (
    <div id="text-submit-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text-input" >
            Enter or paste some text here:
          </label>
          <br />
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="12"
          >
          </textarea>
        </div>

        <button
          id="submit-button"
          type="submit"
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? 'Analyzing...' : 'Get histogram!'}
        </button>
      </form>
    </div>
  )
}

export default TextSubmitForm