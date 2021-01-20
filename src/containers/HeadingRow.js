import HeadingItem from '../components/HeadingItem';

const HeadingRow = ({ columns, sortHandler }) => {
  // console.log('HeadingRow');
  const style = {
    container: {
      flex: 1,
      display: 'flex',
      minHeight: 50,
    },
  };

  return (
    <div style={style.container}>
      {columns.map((column, index) => {
        return (
          <HeadingItem key={index} column={column} sortHandler={sortHandler} />
        );
      })}
    </div>
  );
};

export default HeadingRow;
