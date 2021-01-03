import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';

/// CoinGecko API Key
const COINGECKO_HEADERS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '7e3d61519emsh748d639db16a48fp154cddjsn756669cf1b3e',
    'x-rapidapi-host': 'coingecko.p.rapidapi.com',
  },
};

////////   <App></App>
const App = () => {
  console.log('App');
  const [token, setToken] = useState({});

  /// Set Token to pass to TokenData and TokenList
  const handleAddToken = useCallback(token => setToken({ ...token }), []);

  return (
    <div>
      <main className="app">
        <TokenInput handler={handleAddToken} />
        <TokenData token={token} />
        <TokenList newToken={token} />
      </main>
    </div>
  );
};

///////  <TokenInput></TokenInput>
const TokenInput = ({ handler }) => {
  console.log('TokenInput');

  const [tokens, setTokens] = useState([]);
  const [text, setText] = useState('');
  const handleText = useCallback(e => {
    e.preventDefault();
    setText(e.target.value.toUpperCase());
  }, []);

  /// Validate if exists on Token Master List
  const handleSubmit = e => {
    console.log('handleSubmit');
    e.preventDefault();

    if (text.length > 0) {
      const token = tokens.find(el => el.symbol === text.toLowerCase());
      if (!token) {
        alert('NOT FOUND');
      } else {
        handler(token);
        setText('');
      }
    }
  };
  /// Get Token Master List
  useEffect(() => {
    (async () => {
      await fetch(
        'https://coingecko.p.rapidapi.com/coins/list',
        COINGECKO_HEADERS
      )
        .then(response => response.json())
        .then(response => setTokens(response))
        .catch(err => console.error(err));
    })();
  }, []);

  return (
    <div className="container">
      <h2>Token price lookup</h2>
      <div className="form2">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form__input"
            placeholder="Token"
            onChange={handleText}
            value={text}
          />
          <button className="form__btn">&rarr;</button>
          <label className="form__label">(ex: BTC)</label>
        </form>
      </div>
    </div>
  );
};

///// <TokenData></TokenData>
const TokenData = ({ token }) => {
  console.log('TokenData');
  const [tokenData, setTokenData] = useState({});

  /// Get Token Data
  useEffect(() => {
    if (Object.keys(token).length === 0) return;
    const promiseApi = () => {
      return fetch(
        `https://coingecko.p.rapidapi.com/coins/${token.id}?developer_data=true&market_data=true&sparkline=false&community_data=true&localization=true&tickers=true`,
        COINGECKO_HEADERS
      ).then(response => response.json());
    };

    (async () => {
      await promiseApi()
        .then(response => {
          setTokenData({ promiseApi, ...response });
        })
        .catch(err => console.error(err));
    })();
  }, [token]);

  /// The Token Data Description contains HTML
  useEffect(() => {
    document.getElementById('description').innerHTML =
      tokenData?.description?.en || '';
  }, [tokenData]);

  return (
    <div className="container2">
      <h2>
        {tokenData?.name}
        <img src={tokenData?.image?.thumb} alt={tokenData?.name} />
      </h2>
      <div id="description"></div>
    </div>
  );
};

///// <TokenList></TokenList>
const TokenList = ({ newToken }) => {
  console.log('TokenList');
  const [list, setList] = useState([]);

  /// Add newToken to Token List, if not in the list
  useEffect(() => {
    if (Object.keys(newToken).length === 0) return;

    setList(list => {
      if (!list.find(el => el.symbol === newToken.symbol.toLowerCase()))
        return list.concat([newToken]);
      else return list;
    });
  }, [newToken]);

  const handleRemove = useCallback(token => {
    // handler(newToken);
    console.log('handleRemove');
    setList(list => list.filter(el => el.symbol !== token.symbol));
  }, []);

  return (
    <div className="movements">
      <h2>My List</h2>
      {list.map(el => (
        <TokenRow key={el.id} token={el} handler={handleRemove} />
      ))}
    </div>
  );
};

///// <TokenRow></TokenRow>
const TokenRow = ({ token, handler }) => {
  //   console.log('TokenRow');
  const [tokenData, setTokenData] = useState({});
  const isTickOn = useRef(true);

  const handleClick = e => {
    e.preventDefault();
    console.log('handleclick');
    isTickOn.current = false;
    handler(token);
  };

  /// Refresh Token Data every 2 seconds
  /// Controlled by isTickOn useRef
  const tick = useCallback(async () => {
    if (!isTickOn.current) return;

    // console.log(token);
    await fetch(
      `https://coingecko.p.rapidapi.com/coins/${token?.id}?developer_data=true&market_data=true&sparkline=false&community_data=true&localization=true&tickers=true`,
      COINGECKO_HEADERS
    )
      .then(response => response.json())
      .then(response => {
        setTokenData(old => {
          const logo = response.image.thumb;
          const asOfDate = new Date(response.market_data.last_updated);
          const price = response.market_data.current_price.usd;
          const initialPrice = !old?.initialPrice ? price : old.initialPrice;
          const arrow =
            price !== initialPrice ? (
              price < initialPrice ? (
                <b>&darr;</b>
              ) : (
                <b>&uarr;</b>
              )
            ) : (
              ''
            );
          return {
            logo,
            asOfDate,
            initialPrice,
            price,
            arrow,
            ...response,
          };
        });
      })
      .catch(err => console.error(err));

    setTimeout(tick, 2000);
  }, [token]);

  /// Launch Token Data Refresh Daemon
  useEffect(() => {
    // isTickOn.current = true;
    tick();
  }, [tick]);

  return (
    <div className="movements__row">
      <label className="">{tokenData?.initialPrice}</label>
      <label className="balance__label">{tokenData?.arrow}</label>
      <img src={tokenData?.logo} alt={tokenData?.name} />
      <label className="balance__label">
        {tokenData?.price < 1
          ? tokenData?.price?.toFixed(8)
          : tokenData?.price?.toFixed(2)}
      </label>
      <label className="">{tokenData?.asOfDate?.toLocaleTimeString()}</label>
      {tokenData && (
        <button className="" onClick={handleClick}>
          Remove
        </button>
      )}
    </div>
  );
};

export default App;
