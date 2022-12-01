import '../App.css';
import { useState } from 'react';
import TopPanel from './TopPanel';
import MiddlePanel from './MiddlePanel';
import BottomPanel from './BottomPanel';
import TradePopUp from './TradePopUp';

const App = () => {
  // console.log('App');
  const [tradePopUpCoin, setTradePopUpCoin] = useState(null);
  const [tradeCoin, setTradeCoin] = useState(null);
  const [tradeCoinAmount, setTradeCoinAmount] = useState(0);
  const [tradeBalance, setTradeBalance] = useState(100000);

  const style = {
    container: {
      display: 'flex',
      flexFlow: 'column',
    },
  };

  const handlerMiddlePanel = coin => {
    setTradeBalance(bal => bal + coin.coinAmount * coin.coin.current_price);
    setTradeCoin(null);
  };

  const handlerBottomPanel = coin => setTradePopUpCoin(coin);

  const handlerTradePopUp = (numberOfTokens, purchaseAmount) => {
    if (numberOfTokens > 0) {
      setTradeCoin(tradePopUpCoin);
      setTradePopUpCoin(null);
      setTradeBalance(bal => bal - purchaseAmount);
      setTradeCoinAmount(numberOfTokens);
    } else setTradePopUpCoin(null);
  };

  return (
    <main>
      <div style={style.container}>
        <TopPanel balance={tradeBalance} />

        <MiddlePanel
          coin={tradeCoin}
          coinAmount={tradeCoinAmount}
          handler={handlerMiddlePanel}
        />

        <BottomPanel handler={handlerBottomPanel} />

        {tradePopUpCoin && (
          <TradePopUp
            coin={tradePopUpCoin}
            balance={tradeBalance}
            handler={handlerTradePopUp}
          />
        )}
      </div>
    </main>
  );
};

export default App;
