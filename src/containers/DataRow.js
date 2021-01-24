import DataItem from '../components/DataItem';

const DataRow = ({ columns, data, handleTradeButton }) => {
  //   console.log('DataRow');
  const style = {
    container: {
      display: 'flex',
      minHeight: 45,
      minWidth: 800,
    },
  };

  const handleTradeButtonClick = () => {
    handleTradeButton(data);
  };

  return (
    <div style={style.container}>
      {columns.map((column, index) => {
        return (
          <DataItem
            key={index}
            column={column}
            handler={handleTradeButtonClick}
            dataItem={
              column.name.length === 0
                ? column.title
                : // if column is current_price, pass object with current and prev price, to be used for stying logic
                column.name === 'current_price'
                ? {
                    current_price: data.current_price,
                    prev_price: data.prev_price,
                  }
                : data[column.name]
            }
          />
        );
      })}
    </div>
  );
};

export default DataRow;
