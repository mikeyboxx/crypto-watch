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
        //generate extra column, prev_price
        if (queryParams?.reqType === 'detail')
          setData(old => {
            if (!old) data.prev_price = data.current_price;
            else data.prev_price = old.current_price;
            return { ts: performance.now() + Date.now(), ...data };
          });
        else
          setData(old => {
            const transformedData = data?.map((item, idx) => {
              if (!old) item.prev_price = item.current_price;
              else item.prev_price = old[idx].current_price;
              return { ts: performance.now() + Date.now(), ...item };
            });
            return transformedData;
          });
      } catch (err) {
        console.error(err);
        setData(err);
      }
    };
    fetchData();
  }, []);

  return [data, getData];
}
