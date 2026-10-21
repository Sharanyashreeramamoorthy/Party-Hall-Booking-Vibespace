import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import halls from '../data/halls';

function Booking() {
  const { id } = useParams();
  const hall = halls.find((h) => h.id === parseInt(id));
  const backupHall = halls.find((h) => h.id !== parseInt(id)) || halls[0];

  const [selectedDate, setSelectedDate] = useState('12 Oct');
  const [guestCount, setGuestCount] = useState(hall ? hall.capacity : 100);
  const [isBooked, setIsBooked] = useState(false);

  if (!hall) {
    return (
      <div className="page-container">
        <h2>Hall not found</h2>
        <Link to="/halls" className="btn-primary">Back to Halls</Link>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="page-container booking-container">
      {!isBooked ? (
        <div className="section-card">
          <h1>Complete Your Booking</h1>
          <p className="subtitle">Reserving <strong>{hall.name}</strong> ({hall.location})</p>

          <form onSubmit={handleBooking} className="booking-form">
            <div className="form-group">
              <label>Select Event Date</label>
              <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {hall.availability.map((slot, index) => (
                  <option key={index} value={slot.date} disabled={slot.status === 'booked'}>
                    {slot.date} — {slot.status.toUpperCase()} {slot.price ? `(₹${slot.price.toLocaleString('en-IN')})` : '(Not Available)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Expected Guest Count</label>
              <input 
                type="number" 
                value={guestCount} 
                onChange={(e) => setGuestCount(e.target.value)} 
                max={hall.capacity} 
                min="10" 
                required 
              />
              <small>Maximum capacity: {hall.capacity} guests</small>
            </div>

            <div className="backup-guarantee-box">
              <h3>🛡️ Automated Backup Hall Guarantee Included</h3>
              <p>If an emergency issue occurs with {hall.name}, your reservation automatically shifts to <strong>{backupHall.name}</strong> with zero additional penalty fee.</p>
            </div>

            <div className="price-summary">
              <div className="summary-row">
                <span>Base Hall Rent ({selectedDate})</span>
                <span>₹{hall.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Backup Hall Lock Fee</span>
                <span className="free-tag">FREE (VibeSpace Protection)</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total Amount Payable</span>
                <span>₹{hall.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button type="submit" className="btn-cta full-width">Confirm Booking & Protect Date</button>
          </form>
        </div>
      ) : (
        <div className="section-card booking-success-card">
          <div className="success-icon">🎉</div>
          <h1>Booking Confirmed!</h1>
          <p>Your venue reservation for <strong>{hall.name}</strong> on <strong>{selectedDate}</strong> has been secured.</p>

          <div className="confirmation-details">
            <div className="detail-box">
              <h4>Primary Venue</h4>
              <p><strong>{hall.name}</strong></p>
              <p>📍 {hall.location}</p>
            </div>
            <div className="detail-box backup">
              <h4>🛡️ Assigned Backup Venue</h4>
              <p><strong>{backupHall.name}</strong></p>
              <p>📍 {backupHall.location}</p>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/halls" className="btn-primary">Explore More Halls</Link>
            <Link to="/" className="btn-secondary">Go to Home Page</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;