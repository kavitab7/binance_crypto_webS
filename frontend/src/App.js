import { useEffect, useState } from 'react';
import './App.css';
import useWebSocket from './WebSocketConn';
import { LineChart } from './components/LineChart';
import { CandlestickChart } from './components/CandlestickChart';
import { Header } from './components/Header'
import SideMenu from './components/SideMenu';

function App() {
  const [symbol, setSymbol] = useState('ethusdt');
  const [interval, setInterval] = useState('1m')
  const [ohlcChartData, setOhlcChartData] = useState({ labels: [], datasets: [{ data: [] }] })
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Close Price',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(symbol)) || { labels: [], datasets: [{ data: [] }] }
    storedData.labels = storedData.labels.filter(label => !isNaN(new Date(label)))

    if (storedData) {
      setOhlcChartData(storedData);
      const lineData = {
        labels: [...storedData.labels],
        datasets: [{
          label: 'Close Price',
          data: storedData.datasets[0].data.map(item => item.c),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]

      }
      setLineChartData(lineData);
    }
  }, [symbol])
  useWebSocket(symbol, interval, ({ ohlc, line }) => {
    setOhlcChartData(ohlc)
    setLineChartData(line)
  });
  return (
    <>
      <Header />
      <div className="container">
        <div className="left-container">
          <SideMenu />
        </div>
        <div className="right-container">
          <div className='box'>
            <h1>Cryptocurrency Charts</h1>
            <select onChange={(e) => setSymbol(e.target.value)} value={symbol}>
              <option value="ethusdt">ETH/USDT</option>
              <option value="bnbusdt">BNB/USDT</option>
              <option value="dotusdt">DOT/USDT</option>
            </select>
            <select onChange={(e) => setInterval(e.target.value)} value={interval}>
              <option value="1m" >1 Minute</option>
              <option value="3m" >3 Minutes </option>
              <option value="5m">5 Minutes</option>
            </select>
          </div>
          <div className='box'>
            <CandlestickChart chartData={ohlcChartData} />
          </div>
          <div className='box'>
            <LineChart chartData={lineChartData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
