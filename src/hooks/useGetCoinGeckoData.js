import { useState, useCallback } from 'react';

export default function useGetCoinGeckoData() {
  //   console.log('useGetCoinGeckoData');
  const [data, setData] = useState(null);

  const getData = useCallback(queryParams => {
    let url = '';
    switch (queryParams?.reqType) {
      case 'markets':
        url = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&ids=${queryParams.coinId.replace(
          ',',
          '%2C'
        )}&per_page=100&order=market_cap_desc'`;
        break;

      case 'detail':
        url = `https://coingecko.p.rapidapi.com/coins/${queryParams.coinId}?developer_data=true&market_data=true&sparkline=false&community_data=true&localization=true&tickers=true`;
        break;

      default: {
        url = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc`;
      }
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '7e3d61519emsh748d639db16a48fp154cddjsn756669cf1b3e',
            'x-rapidapi-host': 'coingecko.p.rapidapi.com',
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err);
        setData(err);
      }
    };
    fetchData();
  }, []);

  return [data, getData];
}
