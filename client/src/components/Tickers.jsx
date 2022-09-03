import React from "react";
import { useDispatch} from 'react-redux'
import { lockTickers } from "../redux/slices/tickers";

const Tickers = ({ tickers }) => {
  const dispatch = useDispatch()

  const lockTicker = (tickerName) => {
    dispatch(lockTickers(tickerName))
  }

  return (
    <div className="tickers-body">
      <div className="ticker">
        <div className="cell ticker-name">NAME</div>
        <div className="cell ticker-exchange">EXCHANGE</div>
        <div className="cell ticker-price">PRICE</div>
        <div className="cell ticker-change">CHANGE</div>
        <div className="cell ticker-change_percent">CHANGE, %</div>
        <div className="cell ticker-dividend">DIVIDEND</div>
        <div className="cell ticker-last_trade_time">DATE</div>
        <div className="cell ticker-lock">LOCK</div>
      </div>
      {tickers &&
        tickers.map((el) => {
          let time = Date.parse(el.last_trade_time);
          return (
            <div key={el.ticker} className="ticker" style={{ background: el.bg }}>
              <div className="cell ticker-name">{el.ticker}</div>
              <div className="cell ticker-exchange">{el.exchange}</div>
              <div className="cell ticker-price">{el.price}</div>
              <div className="cell ticker-change">{el.change}</div>
              <div className="cell ticker-change_percent">
                {Math.floor(el.change_percent * 100)}
              </div>
              <div className="cell ticker-dividend">{el.dividend}</div>
              <div className="cell ticker-last_trade_time">
                {Math.floor((time / 1000 / 60 / 60) % 24)}:
                {Math.floor((time / 1000 / 60) % 60)}
                ({el.last_trade_time.split('T')[0]})
              </div>
              <div className="cell ticker-lock">
                <input type="checkbox" checked={el.lock} value={el.lock} onChange={()=>lockTicker(el.ticker)}/>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Tickers;
