import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';

const MiddlePanel = ({ coin, coinAmount, handler }) => {
  //   console.log('MiddlePanel');
  const [coinList, setCoinList] = useState([]);
  const [cards, setCards] = useState(null);

  const style = {
    container: {
      display: 'flex',
      flex: 1,
      flexFlow: 'column',
      maxHeight: 272,
      backgroundColor: '#fafafa',
      overflow: 'auto',
    },
    row: {
      flex: 1,
      display: 'flex',
      minHeight: 135,
    },
  };

  const handleSellButton = useCallback(
    token => {
      setCoinList(list => list.filter(el => el.coin.id !== token.coin.id));
      handler(token);
    },
    [handler]
  );

  useEffect(() => {
    coin &&
      setCoinList(list => {
        const newList = [...list];
        const coinIdx = newList.findIndex(el => el.coin.id === coin.id);
        if (coinIdx === -1) newList.push({ coin, coinAmount });
        else newList[coinIdx].coinAmount += coinAmount;
        return newList;
      });
  }, [coin, coinAmount]);

  useEffect(() => {
    let cardRows = [];
    let row = [];

    coinList.forEach((el, idx) => {
      row.push(el);
      if ((idx + 1) % 2 === 0) {
        cardRows.push(row);
        row = [];
      }
    });
    row.length > 0 && cardRows.push(row);

    setCards(cardRows);
  }, [coinList]);

  return (
    <div style={style.container}>
      {cards?.map((arr, idx) => {
        return (
          <div key={idx} style={style.row}>
            {arr.map((el, idx) => {
              return <Card key={idx} card={el} handler={handleSellButton} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
export default MiddlePanel;
