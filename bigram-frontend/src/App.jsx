import { useState, useMemo } from 'react'
import './App.css'
import TextSubmitForm from '../components/TextSubmitForm.jsx'
import NgramChart from '../components/NgramChart.jsx'
import SortOptions from '../components/SortOptions.jsx'
import LimitOptions from '../components/LimitOptions.jsx'

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ngramData, setNgramData] = useState(null)
  const [sortBy, setSortBy] = useState("desc")
  const [dataLimit, setDataLimit] = useState("")

  const convertDataForChart = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      ngram: key,
      count: value
    }))
  }

  const processedData = useMemo(() => {
    if (!ngramData) return []

    const sortedData = ngramData.sort((a, b) => {
      if (sortBy === 'alpha') {
        return a.ngram.localeCompare(b.ngram)
      } else if (sortBy === 'desc') {
        return b.count - a.count
      } else if (sortBy === 'asc') {
        return a.count - b.count
      }
      return 0
    })

    if (dataLimit) {
      return sortedData.slice(0, parseInt(dataLimit))
    } else {
      return sortedData
    }
  }, [ngramData, sortBy, dataLimit])


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
    <main>
      <TextSubmitForm
        inputText={inputText}
        setInputText={setInputText}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <div>
        <NgramChart ngramData={processedData} />
      </div>
      <div>
        {error && <p className="error">{error}</p>}
        {ngramData && (
          <div id="options-container">
            <SortOptions
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <LimitOptions
              dataLimit={dataLimit}
              setDataLimit={setDataLimit}
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default App
