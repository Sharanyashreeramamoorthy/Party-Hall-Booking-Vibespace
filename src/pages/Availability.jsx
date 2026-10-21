import { useState } from 'react';
import halls from '../data/halls';
import { Link } from 'react-router-dom';

function Availability() {
  const [selectedHallId, setSelectedHallId] = useState(
    String(halls[0]?.id ?? '')
  );

  const selectedHall = halls.find(
    (hall) => String(hall.id) === selectedHallId
  );

  return (
    <div className="page-container availability-page">
      <div className="halls-heading">
        <p className="halls-eyebrow">✦ PLAN WITH CONFIDENCE</p>
        <h1>Hall Availability Heatmap</h1>
        <p>
          Explore listed dates and prices before choosing your venue.
        </p>
      </div>

      <div className="availability-selector">
        <label htmlFor="availability-hall">Choose your hall</label>

        <select
          id="availability-hall"
          value={selectedHallId}
          onChange={(event) => setSelectedHallId(event.target.value)}
        >
          {halls.map((hall) => (
            <option key={hall.id} value={String(hall.id)}>
              {hall.name}
            </option>
          ))}
        </select>
      </div>

      {selectedHall && (
        <section className="availability-card">
          <div className="availability-hall-heading">
            <div>
              <p className="halls-eyebrow">YOUR SELECTED VENUE</p>
              <h2>{selectedHall.name}</h2>
              <p>{selectedHall.location}</p>
            </div>

            <div className="availability-capacity">
              <span>Guest capacity</span>
              <strong>{selectedHall.capacity}</strong>
            </div>
          </div>

          <div className="availability-legend">
            <span><i className="status-dot available-dot" /> Available</span>
            <span><i className="status-dot limited-dot" /> Limited</span>
            <span><i className="status-dot booked-dot" /> Booked</span>
          </div>

          <div className="availability-grid">
            {selectedHall.availability.map((slot, index) => (
              <div
                key={`${selectedHall.id}-${slot.date}-${index}`}
                className={`availability-day status-${slot.status}`}
              >
                <span className="availability-date">{slot.date}</span>

                <strong>
                  {slot.status === 'available'
                    ? 'Available'
                    : slot.status === 'limited'
                    ? 'Limited'
                    : 'Booked'}
                </strong>

                <span className="availability-price">
                  {slot.price != null
                    ? `₹${Number(slot.price).toLocaleString('en-IN')}`
                    : 'No price listed'}
                </span>
              </div>
            ))}
          </div>

          <p className="availability-note">
            These are sample dates and statuses stored in the project.
            They are not live booking availability.
          </p>

          <Link
            to={`/booking/${selectedHall.id}`}
            className="btn-primary availability-book-button"
          >
            Continue to Booking →
          </Link>
        </section>
      )}
    </div>
  );
}

export default Availability;