import useStyleDataItem from '../hooks/useStyleDataItem';

const DataItem = ({ column, dataItem, handler }) => {
  const [styleRef] = useStyleDataItem(column, dataItem);

  const style = {
    button: {
      height: 25,
      width: 50,
      color: '#F0B90B',
      marginRight: -10,
      border: '1px solid #eaecef',
      borderRadius: 10,
      fontSize: '.84rem',
      fontWeight: 350,
      backgroundColor: 'white',
      cursor: 'pointer',
    },
    filler: {
      width: '1em',
      height: '1em',
    },
  };

  const handleOnClick = e => {
    e.preventDefault();
    handler();
  };

  const formatNumber = number => {
    return number > 1000000
      ? new Intl.NumberFormat().format((number / 1000000).toFixed(2)) + 'M'
      : new Intl.NumberFormat().format(number.toFixed(2));
  };

  const formatDataItem = () => {
    if (!dataItem) return ' ';

    switch (column.type) {
      case 'button':
        return (
          <button style={style.button} onClick={handleOnClick}>
            {dataItem}{' '}
          </button>
        );
      case 'number':
        return formatNumber(dataItem);
      case 'currency':
        return '$' + formatNumber(dataItem);
      case 'percent':
        return dataItem > 0
          ? '+' + dataItem.toFixed(2) + '%'
          : dataItem.toFixed(2) + '%';
      default: {
        return dataItem;
      }
    }
  };

  return (
    <div ref={styleRef}>
      {formatDataItem()}
      <svg viewBox="8 5 24 10" style={style.filler} />
    </div>
  );
};

export default DataItem;
