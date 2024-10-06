import React from 'react'
import { SiBinance } from "react-icons/si";

export const Header = () => {
    return (
        <> <header className="header">
            <div className="logo"  >
                <SiBinance /> <b>Binance</b> |
                <span>Market Data</span>
            </div>
        </header></>
    )
}
