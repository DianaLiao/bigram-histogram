import { useState } from 'react'
import './App.css'
import TextSubmitForm from '../components/TextSubmitForm.jsx'
import NgramChart from '../components/NgramChart.jsx'

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ngramData, setNgramData] = useState(null)

  const convertDataForChart = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      ngram: key,
      count: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    const requestBody = {
      text: inputText
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/bigrams_count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setNgramData(convertDataForChart(data))
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

return (
    <>
      <div>
        <TextSubmitForm
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
      <div>
        <NgramChart ngramData={ngramData} />
      </div>
    </>
  )
}

export default App
