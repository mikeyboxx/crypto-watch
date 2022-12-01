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
  };

  const handleOnClick = e => {
    e.preventDefault();
    handler();
  };

  return (
    <div ref={styleRef}>
      {column.type === 'button' && (
        <button style={style.button} onClick={handleOnClick}>
          {dataItem}
        </button>
      )}
    </div>
  );
};

export default DataItem;
