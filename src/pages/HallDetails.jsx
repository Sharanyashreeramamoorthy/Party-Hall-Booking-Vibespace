
import { useParams, Link } from 'react-router-dom';
import halls from '../data/halls';

function HallDetails() {
  const { id } = useParams();
  const hall = halls.find((h) => String(h.id) === id);

  if (!hall) {
    return (
      <div className="page-container hall-not-found">
        <span className="details-eyebrow">VIBESPACE COLLECTION</span>
        <h1>Our apologies ✨</h1>
        <p>We couldn't find this venue in our collection.</p>
        <Link to="/halls" className="btn-cta">
          Explore Party Halls
        </Link>
      </div>
    );
  }

  const report = hall.realityReport || {};
  const metrics = [
    { label: 'Crowd Comfort & Spacing', value: report.crowdComfort },
    { label: 'Parking Convenience', value: report.parking },
    { label: 'A/C Performance', value: report.acPerformance },
    { label: 'Management Responsiveness', value: report.management },
    { label: 'Vendor Flexibility', value: report.vendorFlexibility },
    { label: 'True Value Score', value: report.trueValue, highlight: true },
  ];

  const facilities = [
    { icon: '❄️', label: 'Air Conditioning' },
    { icon: '🚗', label: 'Parking' },
    { icon: '🍽️', label: 'Catering Options' },
    { icon: '✨', label: 'Event Styling' },
  ];

  return (
    <main className="page-container luxury-details">
      <Link to="/halls" className="back-link">
        ← Back to Explore Halls
      </Link>

      <header className="details-hero">
        <span className="details-eyebrow">
          ✦ THE VIBESPACE VENUE COLLECTION ✦
        </span>

        <h1>{hall.name}</h1>

        <p className="details-location">
          <span>⌖</span> {hall.location}
          <span className="location-divider">•</span>
          <span className="details-rating">★ {hall.rating}</span>
        </p>

        <div className="details-hero-sparkles" aria-hidden="true">
          ✧　✦　✧　·　✦
        </div>
      </header>

      <section className="venue-gallery">
        <div className="venue-main-image">
          <img src={hall.image} alt={`Interior of ${hall.name}`} />
          <span className="gallery-label">A SPACE FOR YOUR MOMENTS</span>
        </div>

        <div className="venue-image-side">
          <div className="venue-image-placeholder">
            <span>✧</span>
            <p>Your celebration, beautifully imagined.</p>
          </div>

          <div className="venue-capacity">
            <span className="capacity-icon">♧</span>
            <span className="capacity-label">GUEST CAPACITY</span>
            <strong>Up to {hall.capacity}</strong>
            <span className="capacity-small">guests</span>
          </div>
        </div>
      </section>

      <section className="venue-intro">
        <div>
          <span className="details-eyebrow">THE PERFECT SETTING</span>
          <h2>Make it a moment to remember.</h2>
          <p>
            Discover a venue for your special occasion, compare available
            dates, and plan your celebration with VibeSpace.
          </p>
        </div>

        <div className="intro-price">
          <span>Starting from</span>
          <strong>₹{Number(hall.price).toLocaleString('en-IN')}</strong>
          <span>Venue price as listed</span>
        </div>
      </section>

      <section className="facilities-section">
        <span className="details-eyebrow">THE LITTLE DETAILS</span>
        <h2>Designed for your celebration</h2>

        <div className="facilities-grid">
          {facilities.map((facility) => (
            <div className="facility-item" key={facility.label}>
              <span>{facility.icon}</span>
              <p>{facility.label}</p>
            </div>
          ))}
        </div>

        <p className="facilities-note">
          Please confirm individual facilities with the venue before booking.
        </p>
      </section>

      <div className="details-grid luxury-details-grid">
        <section className="details-left">
          <div className="section-card luxury-section-card">
            <span className="details-eyebrow">PLAN WITH CONFIDENCE</span>
            <h2>📅 Availability & Pricing</h2>
            <p className="section-description">
              Review the listed dates and prices before planning your event.
            </p>

            {hall.availability?.length > 0 ? (
              <div className="availability-grid">
                {hall.availability.map((slot, index) => (
                  <div
                    key={`${slot.date}-${index}`}
                    className={`slot-card ${String(slot.status).toLowerCase()}`}
                  >
                    <span className="slot-date">{slot.date}</span>
                    <span className="slot-status">
                      {String(slot.status).toUpperCase()}
                    </span>
                    <span className="slot-price">
                      {slot.price != null
                        ? `₹${Number(slot.price).toLocaleString('en-IN')}`
                        : 'Price unavailable'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="section-description">
                No availability dates have been added yet. Contact the venue
                to confirm your preferred date.
              </p>
            )}

            <p className="availability-note">
              Availability shown here reflects the project's listed data.
              Confirm dates and prices with the venue before paying.
            </p>
          </div>

          <div className="section-card luxury-section-card">
            <span className="details-eyebrow">A CLOSER LOOK</span>
            <h2>🤖 AI Reality Report</h2>
            <p className="section-description">
              Explore the venue scores recorded in this project's data.
            </p>

            <div className="metrics-list">
              {metrics.map((metric) => (
                <div
                  className={`metric-item ${metric.highlight ? 'highlight' : ''}`}
                  key={metric.label}
                >
                  <div className="metric-label-row">
                    <span>{metric.label}</span>
                    <strong className="metric-score">
                      {typeof metric.value === 'number'
                        ? `${metric.value}%`
                        : 'Not available'}
                    </strong>
                  </div>

                  {typeof metric.value === 'number' && (
                    <div
                      className="metric-track"
                      role="img"
                      aria-label={`${metric.label}: ${metric.value}%`}
                    >
                      <div
                        className="metric-fill"
                        style={{
                          width: `${Math.max(0, Math.min(100, metric.value))}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="availability-note">
              Scores are displayed from the current project data. They are
              not independently verified, and should not be treated as
              live AI analysis unless a real review-analysis service is connected.
            </p>
          </div>
        </section>

        <aside className="details-right">
          <div className="booking-box luxury-booking-box">
            <span className="booking-sparkle">✧</span>
            <span className="details-eyebrow">YOUR CELEBRATION STARTS HERE</span>
            <h2>Love this venue?</h2>
            <p>
              Take the next step towards creating something unforgettable.
            </p>

            <div className="booking-price">
              <span>Starting from</span>
              <strong>₹{Number(hall.price).toLocaleString('en-IN')}</strong>
            </div>

            <Link
              to={`/booking/${hall.id}`}
              className="btn-cta full-width luxury-booking-button"
            >
              Book This Hall <span>→</span>
            </Link>

            <div className="booking-divider">
              <span>OR PLAN TOGETHER</span>
            </div>

            <Link
              to={`/poll/${hall.id}`}
              className="btn-secondary full-width margin-top luxury-poll-button"
            >
              ♡ Share Family Poll
            </Link>

            <p className="booking-footnote">
              ✦ Make the decision together, make the memories forever.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default HallDetails;
