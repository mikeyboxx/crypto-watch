import { useState, useCallback } from 'react';

export default function useSortCoinGeckoData() {
  //   console.log('useSortCoinGeckoData');
  const [sortedData, setSortedData] = useState(null);

  const sortData = useCallback((data, sortParams) => {
    let sortableItems = [...data];
    sortableItems?.sort((a, b) => {
      if (a[sortParams?.key] < b[sortParams?.key]) {
        return sortParams?.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortParams?.key] > b[sortParams?.key]) {
        return sortParams?.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortableItems);
  }, []);

  return [sortedData, sortData];
}
