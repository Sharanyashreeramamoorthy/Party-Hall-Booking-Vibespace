
import { Link } from 'react-router-dom';

function HallCard({ hall }) {
  return (
    <article className="hall-card luxury-hall-card">
      <div className="hall-image-wrap">
        <img
          src={hall.image}
          alt={hall.name}
          className="card-img"
          loading="lazy"
        />

        <span className="hall-image-badge">
          ✨ VIBESPACE SELECT
        </span>

        <span className="hall-rating-badge">
          ★ {hall.rating}
        </span>
      </div>

      <div className="card-body">
        <p className="hall-kicker">YOUR SPECIAL OCCASION</p>

        <h2>{hall.name}</h2>

        <div className="hall-info">
          <p>
            <span>⌖</span> {hall.location}
          </p>

          <p>
            <span>♧</span> Up to {hall.capacity} guests
          </p>
        </div>

        <div className="card-footer luxury-card-footer">
          <div className="hall-price-block">
            <span className="hall-price-label">Starting from</span>
            <span className="price">
              ₹{Number(hall.price).toLocaleString('en-IN')}
            </span>
          </div>

          <span className="hall-price-note">✦ Elegant events</span>
        </div>

        <Link
          to={`/halls/${hall.id}`}
          className="btn-secondary luxury-hall-button"
        >
          View Hall & AI Report <span>→</span>
        </Link>
      </div>
    </article>
  );
}

export default HallCard;
