import Tickers from './components/Tickers';
import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { updateTickers } from './redux/slices/tickers';


const socket = io('http://localhost:4000', {
  autoConnect: false
})

function App() {
  const [isActive, setIsActive] = useState(null)
  const tickers = useSelector(store=>store.tickers)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connected: ", socket.connected);
    });

    socket.emit('start');

    socket.on('ticker', function(response) {
      dispatch(updateTickers(response))
    });
    setIsActive(false)

    return () => {
      socket.close()
    }

  }, [])

  const onoftickers = () => {
    if (!isActive) {
      socket.off('ticker');
      setIsActive(true)
    } else {
      socket.on('ticker', function(response) {
        dispatch(updateTickers(response))
      });
      setIsActive(false)
    }
  }

  return (
    <div className='wrapper'>
      <div className='title'>Price Ticker service</div>
      <div className='information'>
        <div className='inc'>increment</div>
        <div className='dec'>reduction</div>
      </div>
      <Tickers tickers={tickers.tickers} />
      <div className='on-off'>
        <button onClick={onoftickers}>
          {isActive ? 'on tickers' : 'off tickers' }
        </button>
      </div>
    </div>
  );
}

export default App;
