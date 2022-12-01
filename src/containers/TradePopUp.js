import { useState, useEffect } from 'react';
import useGetCoinGeckoData from '../hooks/useGetCoinGeckoData';

const TradePopUp = ({ coin, balance, handler }) => {
  //   console.log('TradePopUp');
  const [apiData, getApiData] = useGetCoinGeckoData();
  const [tokenData, setTokenData] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  const [amount, setAmount] = useState('');

  const style = {
    modal: {
      display: 'flex',
      flexFlow: 'column',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '70%',
      padding: '1rem',
      fontSize: 11,
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      boxShadow: '0 3rem 5rem rgba(0, 0, 0, 0.3)',
      zIndex: 10,
      backgroundImage: 'linear-gradient(to top left, #f3f3f3, #ffcb03)',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(3px)',
      zIndex: 5,
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 25,
      paddingBottom: 10,
      marginBottom: 15,
      borderBottom: '1px solid gray',
    },
    logo: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    balance: {
      display: 'flex',
      justifyContent: 'flex-start',
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
      borderBottom: '1px solid gray',
      paddingBottom: 5,
    },
    balanceAmount: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600,
    },
    balanceLabel: {
      fontWeight: 600,
      width: '100px',
      marginLeft: 8,
      marginRight: 10,
    },
    closeButton: {
      fontSize: 30,
      color: '#333',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
    },
    name: {
      marginRight: 10,
      fontSize: 30,
      fontWeight: 600,
    },
    dataEntry: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    amount: {
      flex: 1,
      padding: 5,
      fontSize: 12,
      borderRadius: 20,
      border: '2px solid #eaecef',
    },
    buyButton: {
      flex: 1,
      height: 25,
      width: 35,
      color: 'white',
      borderRadius: 10,
      fontSize: '.84rem',
      fontWeight: 500,
      backgroundColor: 'green',
      cursor: 'pointer',
    },
    priceLabel: {
      fontSize: 18,
      textAlign: 'right',
      fontWeight: 600,
      width: '150px',
      marginRight: 25,
    },
    price: {
      fontSize: 25,
      textAlign: 'right',
      fontWeight: 600,
    },
    description: {
      height: '200px',
      fontSize: 12,
      overflow: 'scroll',
      padding: 5,
      marginTop: 2,
    },
    hidden: {
      display: 'none',
    },
  };

  const handleInput = e => {
    setAmount(e.target.value);
  };

  const buyButtonHandler = e => {
    e.preventDefault();
    if (balance - Number(amount) * coin.current_price < 0) {
      alert('You do not have enough money!');
    } else {
      setAmount('');
      setIsClosed(true);
      handler(Number(amount), Number(amount) * coin.current_price);
    }
  };

  const closeButtonHandler = e => {
    handler(0);
    setIsClosed(true);
  };

  useEffect(() => {
    getApiData({ reqType: 'detail', coinId: coin.id });
  }, [coin, getApiData]);

  useEffect(() => {
    if (apiData && apiData?.length !== 0) {
      setTokenData(apiData);
      setIsClosed(false);
    }
  }, [apiData]);

  return (
    <>
      <div
        style={
          isClosed || !apiData
            ? { ...style.modal, ...style.hidden }
            : style.modal
        }
      >
        <div style={style.top}>
          <div style={style.logo}>
            <div style={style.name}>{tokenData?.name}</div>
            <img src={tokenData?.image?.small} alt={tokenData?.name} />
          </div>

          <div>
            <button style={style.closeButton} onClick={closeButtonHandler}>
              &times;
            </button>
          </div>
        </div>

        <div style={style.dataEntry}>
          <form>
            <input
              type="number"
              step="0.01"
              style={style.amount}
              placeholder="Enter Token Amount"
              onChange={handleInput}
              value={amount}
            />
            <button style={style.buyButton} onClick={buyButtonHandler}>
              Buy
            </button>
          </form>
          <div style={style.priceLabel}>Last Price:</div>
          <div style={style.price}>
            {'$' +
              new Intl.NumberFormat().format(
                tokenData?.market_data?.current_price?.usd.toFixed(2)
              )}
          </div>
        </div>

        <div style={style.balance}>
          <div style={style.balanceLabel}>Current balance:</div>
          <div style={style.balanceAmount}>
            {'$' + new Intl.NumberFormat().format(balance.toFixed(2))}
          </div>
        </div>

        {tokenData?.description?.en.length > 0 && (
          <div>
            <h2>Description:</h2>
            <div
              style={style.description}
              dangerouslySetInnerHTML={{ __html: tokenData?.description?.en }}
            ></div>
          </div>
        )}
      </div>
      <div
        style={isClosed ? { ...style.overlay, ...style.hidden } : style.overlay}
      ></div>
    </>
  );
};

export default TradePopUp;
