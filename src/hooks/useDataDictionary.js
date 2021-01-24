import { useEffect, useState } from 'react';

export default function useDataDictionary() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cols = [
      {
        name: 'name',
        title: 'Coin',
        type: 'text',
        style: {
          minWidth: '120px',
          justifyContent: 'flex-start',
        },
      },
      {
        name: 'current_price',
        title: 'Last Price',
        type: 'number',
        style: {
          minWidth: '100px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'price_change_percentage_24h',
        title: '24h Change',
        type: 'percent',
        style: {
          minWidth: '100px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'high_24h',
        title: '24h High',
        type: 'number',
        style: {
          minWidth: '100px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'low_24h',
        title: '24h Low',
        type: 'number',
        style: {
          minWidth: '100px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'market_cap',
        title: 'Market Cap',
        type: 'currency',
        style: {
          minWidth: '150px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'total_volume',
        title: '24h Volume',
        type: 'number',
        style: {
          minWidth: '120px',
          justifyContent: 'flex-end',
        },
      },
      {
        name: '',
        title: 'Trade',
        type: 'button',
        style: {
          minWidth: '90px',
          justifyContent: 'center',
        },
      },
    ];
    setColumns(cols);
  }, []);

  return [columns];
}
