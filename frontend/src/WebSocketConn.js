import { useEffect } from "react"

const useWebSocket = (symbol, interval, updateChart) => {
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`)

        const handleMessage = (event) => {
            const message = JSON.parse(event.data)
            const candlestick = message.k;
            const time = isNaN(new Date(candlestick.t)) ? null : new Date(candlestick.t).toISOString();
            if (!time) {
                console.warn("Received invalid timestamp in WebSocket data:", candlestick.t)
                return;
            }
            const ohlc = {
                t: time,  // Timestamp
                o: parseFloat(candlestick.o), // Open price
                h: parseFloat(candlestick.h), // High price
                l: parseFloat(candlestick.l), // Low price
                c: parseFloat(candlestick.c)  // Close price
            };

            const storedData = JSON.parse(localStorage.getItem(symbol)) || { labels: [], datasets: [{ data: [] }] }

            if (!storedData.labels.includes(time)) {
                storedData.labels.push(time)
                storedData.datasets[0].data.push(ohlc)
                localStorage.setItem(symbol, JSON.stringify(storedData));
                updateChart(storedData)
            } else {
                console.log('Duplicate time entry, skipping...');
            }

            //for line chart
            const lineData = {
                labels: [...storedData.labels],
                datasets: [{
                    label: 'Close Price',
                    data: storedData.datasets[0].data.map(item => item.c),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
            };

            localStorage.setItem(symbol, JSON.stringify(storedData));
            updateChart({ ohlc: storedData, line: lineData })

        }

        const handleError = (error) => {
            console.error("WebSocket Error:", error)
        };

        const handleClose = () => {
            console.log("WebSocket Closed")
        };

        ws.onmessage = handleMessage;
        ws.onerror = handleError
        ws.onclose = handleClose;

        return () => {
            if (ws) {
                ws.close()
            }
        };

    }, [symbol, interval, updateChart])

}

export default useWebSocket;