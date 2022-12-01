import { useState, useCallback } from 'react';

export default function useFilterCoinGeckoData() {
  const [filteredData, setFilteredData] = useState(null);

  const filterData = useCallback((data, filterParams) => {
    const filterableItems = data?.filter(item => {
      let conditionMet = true;

      filterParams?.forEach(param => {
        if (param.operator === 'eq') {
          !param.value.some(value => value === item[param.key]) &&
            (conditionMet = false);
        }

        if (param.operator === 'gt') {
          !param.value.some(value => value <= item[param.key]) &&
            (conditionMet = false);
        }

        if (param.operator === 'lt') {
          !param.value.some(value => value >= item[param.key]) &&
            (conditionMet = false);
        }
      });

      return conditionMet;
    });

    setFilteredData(filterableItems);
  }, []);

  return [filteredData, filterData];
}
