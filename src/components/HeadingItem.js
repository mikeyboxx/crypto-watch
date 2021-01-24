import { BsArrowUpDown, BsArrowUp, BsArrowDown } from 'react-icons/bs';

const HeadingItem = ({ column, sortCol, sortHandler }) => {
  const style = {
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #eaecef',
      fontSize: '.73rem',
      color: '#76808F',
      backgroundColor: '#fafafa',
      cursor: `${column.name.length > 0 ? 'pointer' : ''}`,
      ...column.style,
    },
  };

  const handleClick = () => column.name.length > 0 && sortHandler(column);

  return (
    <div style={style.container} onClick={handleClick}>
      {column.title}
      {column.name.length > 0 &&
        (column.name === sortCol.key ? (
          sortCol.direction === 'ascending' ? (
            <BsArrowUp />
          ) : (
            <BsArrowDown />
          )
        ) : (
          <BsArrowUpDown />
        ))}
    </div>
  );
};

export default HeadingItem;
