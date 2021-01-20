import { useEffect, useState } from 'react';

export default function useDataDictionary() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cols = [
      {
        name: 'name',
        title: 'Coin',
        type: 'text',
        width: '120px',
        justify: 'start',
      },
      {
        name: 'current_price',
        title: 'Last Price',
        type: 'number',
        width: '100px',
        justify: 'end',
      },
      {
        name: 'price_change_percentage_24h',
        title: '24h Change',
        type: 'percent',
        width: '100px',
        justify: 'end',
      },
      {
        name: 'high_24h',
        title: '24h High',
        type: 'number',
        width: '100px',
        justify: 'end',
      },
      {
        name: 'low_24h',
        title: '24h Low',
        type: 'number',
        width: '100px',
        justify: 'end',
      },
      {
        name: 'market_cap',
        title: 'Market Cap',
        type: 'currency',
        width: '150px',
        justify: 'end',
      },
      {
        name: 'total_volume',
        title: '24h Volume',
        type: 'number',
        width: '120px',
        justify: 'end',
      },
      {
        name: '',
        title: 'Trade',
        type: 'button',
        width: '90px',
        justify: 'center',
        //   buttonHandler: handler,
      },
    ];
    setColumns(cols);
  }, []);

  return [columns];
}
