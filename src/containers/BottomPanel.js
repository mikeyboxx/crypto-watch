import { useState, useEffect, useCallback } from 'react';
import useCoinGeckoApiDaemon from '../hooks/useCoinGeckoApiDaemon';
import useDataDictionary from '../hooks/useDataDictionary';
import HeadingRow from './HeadingRow';
import DataRow from './DataRow';

const BottomPanel = ({ handler }) => {
  // console.log('BottomPanel');
  const [
    sortedAndFilteredApiData,
    runDaemon,
    setSortParams,
    // setFilterParams,
  ] = useCoinGeckoApiDaemon();
  const [columns] = useDataDictionary();
  const [sortColumn, setSortColumn] = useState({
    key: 'market_cap',
    direction: 'descending',
  });

  const style = {
    container: {
      display: 'flex',
      flex: 1,
      flexFlow: 'column',
      maxHeight: 680,
      margin: 17,
      padding: 10,
      borderRadius: 10,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.04)',
      backgroundColor: 'white',
      overflow: 'auto',
    },
  };

  const sortHandler = useCallback(column => {
    const sortCol = { key: column.name, direction: 'descending' };
    setSortColumn(old => {
      if (old.key === sortCol.key) {
        old.direction === 'descending'
          ? (sortCol.direction = 'ascending')
          : (sortCol.direction = 'descending');
      }
      return sortCol;
    });
  }, []);

  const handleTradeButton = useCallback(dataRow => handler(dataRow), [handler]);

  // starts the CoinGecko data retrieval. Pass time interval to control how often data gets refreshed. Optionally pass it default sort column, and/or filter criteria.
  useEffect(() => {
    runDaemon(true, 30000);
  }, [runDaemon]);

  useEffect(() => {
    setSortParams(sortColumn);
  }, [sortColumn, setSortParams]);

  return (
    <div style={style.container}>
      {sortedAndFilteredApiData && (
        <HeadingRow
          columns={columns}
          sortCol={sortColumn}
          sortHandler={sortHandler}
        />
      )}

      {sortedAndFilteredApiData &&
        sortedAndFilteredApiData.map((dataRow, idx) => (
          <DataRow
            key={idx}
            columns={columns}
            handleTradeButton={handleTradeButton}
            data={dataRow}
          />
        ))}
    </div>
  );
};

export default BottomPanel;
