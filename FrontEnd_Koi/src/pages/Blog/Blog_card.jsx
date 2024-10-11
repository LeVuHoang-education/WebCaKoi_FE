import "../assets/css/card.css";

// eslint-disable-next-line react/prop-types
const Card = ({ image, title, description, date, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-link"
    >
      <div className="card">
        <img src={image} alt={title} className="card-img" />
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <small>{date}</small>
        </div>
      </div>
    </a>
  );
};

export default Card;
