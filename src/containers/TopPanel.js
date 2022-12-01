const TopPanel = ({ balance }) => {
  // console.log('TopPanel');
  const style = {
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      height: 65,
      marginBottom: 5,
      padding: 15,
      color: '#F0B90B',
      backgroundColor: '#12161C',
    },
    left: {
      display: 'flex',
      flex: 1,
      flexFlow: 'column',
      fontSize: 18,
    },
    balance: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: -18,
      marginTop: -15,
    },
    balanceLabel: {
      marginBottom: -3,
    },
    balanceValue: { margin: 20, fontSize: 30 },
    date: {
      marginTop: -5,
      fontSize: '.6rem',
    },
    right: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      height: 31,
      backgroundColor: '#F0B90B',
      color: '#12161C',
      fontWeight: 600,
      cursor: 'pointer',
      borderRadius: 30,
    },
  };

  const currDate = new Date();

  return (
    <div style={style.container}>
      <div style={style.left}>
        <div style={style.balance}>
          <div style={style.balanceLabel}>
            Current balance:
          </div>
          <div style={style.balanceValue}>
            {'$' + new Intl.NumberFormat().format(balance.toFixed(2))}
          </div>
        </div>
        <div style={style.date}>
          As of <span>{currDate.toDateString()}</span>
        </div>
      </div>

      <div style={style.right}>
        <button style={style.button}>Start Game</button>
      </div>
    </div>
  );
};

export default TopPanel;
