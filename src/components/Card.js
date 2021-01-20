import useHover from '../hooks/useHover';

const Card = ({ card, handler }) => {
  //   console.log('Card');
  const [hoverRef, isHovered] = useHover();
  const style = {
    container: {
      flex: 1,
      maxWidth: '47%',
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      boxShadow: !isHovered
        ? '0px 0px 20px rgba(0, 0, 0, 0.04)'
        : 'rgba(0,0,0,0.15) 0px 0px 20px 0px',
    },
  };

  const handleSellButton = e => {
    e.preventDefault();
    handler(card);
  };

  return (
    <>
      <div style={style.container} ref={hoverRef}>
        <div>{card.coin.name}</div>
        <div>{card.coin.current_price}</div>
        <div>{card.coinAmount}</div>
        <div>{(card.coinAmount * card.coin.current_price).toFixed(2)}</div>
        <button onClick={handleSellButton}>sell</button>
      </div>
    </>
  );
};

export default Card;
