const HeadingItem = ({ column, sortHandler }) => {
  const style = {
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent:
        column.justify === 'center' ? 'center' : 'flex-' + column.justify,
      minWidth: column.width,
      borderBottom: '1px solid #eaecef',
      fontSize: '.73rem',
      color: '#76808F',
      backgroundColor: '#fafafa',
      cursor: `${column.name.length > 0 ? 'pointer' : ''}`,
    },
    arrow: {
      width: '1.9em',
      height: '1.2em',
      cursor: 'pointer',
    },
  };

  const handleClick = () => column.name.length > 0 && sortHandler(column);

  return (
    <div style={style.container} onClick={handleClick}>
      {column.title}
      {column.name.length > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="8 5 24 10"
          style={style.arrow}
        >
          <path
            d="M9 10.368v-1.4L11.968 6l2.968 2.968v1.4H9zM14.936 13v1.4l-2.968 2.968L9 14.4V13h5.936z"
            fill="#C1C6CD"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default HeadingItem;
