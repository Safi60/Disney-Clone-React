const Cards = ({ thumbnail }) => {
  return <img className="Card" src={thumbnail.url} alt={thumbnail.title} />;
};

export default Cards;
