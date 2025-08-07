import { AgCharts } from 'ag-charts-react'

const NgramChart = ({ ngramData }) => {
  const chartOptions = {
    data: ngramData,
    title: {
      text: 'Bigram Histogram',
      fontSize: 18,
      fontWeight: 'bold'
    },
    series: [{
      type: 'bar',
      direction: 'horizontal',
      xKey: 'ngram',
      yKey: 'count',
    }],
    axes: [
      {
        type: 'category',
        position: 'left',
      },
      {
        type: 'number',
        position: 'bottom',
        interval: { step: 1 }
      }]
  }

  return <AgCharts
            options={chartOptions}
            id="histogram"
            style={{ height: '500px', width: '100%' }}
          />
}

export default NgramChart