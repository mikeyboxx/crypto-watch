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
              column.name.length === 0 ? column.title : data[column.name]
            }
          />
        );
      })}
    </div>
  );
};

export default DataRow;
