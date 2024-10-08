import "./Card.css";

interface ICard {
    img: string;
    title: string;
}

const Card = ({ img, title }: ICard) => {
    return (
        <div className="card-container">
            <img className="card-img" src={img} alt="card-img" />
            <p className="card-title">{title}</p>
        </div>
    );
};

export default Card;