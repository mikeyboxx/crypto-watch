import { useState, useEffect, useCallback } from 'react';
import useGetCoinGeckoData from './useGetCoinGeckoData';
import useSortCoinGeckoData from './useSortCoinGeckoData';
import useFilterCoinGeckoData from './useFilterCoinGeckoData';

export default function useCoinGeckoApiDaemon() {
  //   console.log('useCoinGeckoDaemon');
  const [apiData, getApiData] = useGetCoinGeckoData();
  const [sortedApiData, sortApiData] = useSortCoinGeckoData();
  const [filteredApiData, filterApiData] = useFilterCoinGeckoData();
  const [sortParams, setSortParams] = useState({});
  const [filterParams, setFilterParams] = useState([]);
  const [startDaemon, setStartDaemon] = useState(false);
  const [timerCount, setTimerCount] = useState(0);

  const runDaemon = useCallback((startDaemon, sortParams, filterParams) => {
    sortParams && setSortParams(sortParams);
    filterParams && setFilterParams(filterParams);
    setStartDaemon(startDaemon);
  }, []);

  useEffect(() => {
    const tick = async () => {
      console.log('tick');
      getApiData();
      setTimeout(() => setTimerCount(timerCount + 1), 3000);
    };

    startDaemon && tick();
  }, [startDaemon, timerCount, getApiData]);

  useEffect(() => {
    if (apiData) {
      apiData instanceof Error
        ? setStartDaemon(false)
        : apiData.length > 0 && sortApiData(apiData, sortParams);
    }
  }, [apiData, sortParams, sortApiData]);

  useEffect(() => {
    if (sortedApiData) {
      sortedApiData.length > 0 && filterApiData(sortedApiData, filterParams);
    }
  }, [sortedApiData, filterParams, filterApiData]);

  return [filteredApiData, runDaemon, setSortParams, setFilterParams];
}
