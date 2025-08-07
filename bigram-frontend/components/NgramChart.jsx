import { AgCharts } from 'ag-charts-react'

const NgramChart = ({ ngramData }) => {
  const chartOptions = {
    data: ngramData,
    title: {
      text: 'N-gram Histogram',
      fontSize: 18,
      fontWeight: 'bold'
    },
    series: [{
      type: 'bar',
      direction: 'horizontal',
      xKey: 'ngram',
      yKey: 'count',
    }]
  }

  return <AgCharts options={chartOptions} />
}

export default NgramChart