import { useState } from 'react';
import { Link } from 'react-router-dom';
import halls from '../data/halls';

function Compare() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedHalls = halls.filter((hall) =>
    selectedIds.includes(hall.id)
  );

  const toggleHall = (id) => {
    setSelectedIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((hallId) => hallId !== id);
      }

      if (previous.length >= 3) {
        alert('You can compare up to 3 halls at a time.');
        return previous;
      }

      return [...previous, id];
    });
  };

  const getBestValue = (key, mode = 'max') => {
    if (!selectedHalls.length) return null;

    return selectedHalls.reduce((best, hall) => {
      const currentValue = Number(hall[key]);
      const bestValue = Number(best[key]);

      return mode === 'min'
        ? currentValue < bestValue ? hall : best
        : currentValue > bestValue ? hall : best;
    });
  };

  const getBestScore = (key) => {
    if (!selectedHalls.length) return null;

    return selectedHalls.reduce((best, hall) => {
      return Number(hall.realityReport?.[key] ?? 0) >
        Number(best.realityReport?.[key] ?? 0)
        ? hall
        : best;
    });
  };

  const cheapestHall = getBestValue('price', 'min');
  const highestRatedHall = getBestValue('rating');

  const rows = [
    {
      label: 'Starting price',
      getValue: (hall) =>
        `₹${Number(hall.price).toLocaleString('en-IN')}`,
      best: cheapestHall,
    },
    {
      label: 'Guest capacity',
      getValue: (hall) => `${hall.capacity} guests`,
      best: getBestValue('capacity'),
    },
    {
      label: 'Customer rating',
      getValue: (hall) => `★ ${hall.rating}`,
      best: highestRatedHall,
    },
    {
      label: 'Crowd comfort',
      getValue: (hall) =>
        `${hall.realityReport?.crowdComfort ?? 'N/A'}%`,
      best: getBestScore('crowdComfort'),
    },
    {
      label: 'Parking score',
      getValue: (hall) =>
        `${hall.realityReport?.parking ?? 'N/A'}%`,
      best: getBestScore('parking'),
    },
    {
      label: 'A/C performance',
      getValue: (hall) =>
        `${hall.realityReport?.acPerformance ?? 'N/A'}%`,
      best: getBestScore('acPerformance'),
    },
    {
      label: 'Management',
      getValue: (hall) =>
        `${hall.realityReport?.management ?? 'N/A'}%`,
      best: getBestScore('management'),
    },
    {
      label: 'Vendor flexibility',
      getValue: (hall) =>
        `${hall.realityReport?.vendorFlexibility ?? 'N/A'}%`,
      best: getBestScore('vendorFlexibility'),
    },
    {
      label: 'True value score',
      getValue: (hall) =>
        `${hall.realityReport?.trueValue ?? 'N/A'}%`,
      best: getBestScore('trueValue'),
    },
  ];

  return (
    <div className="page-container compare-page">
      <header className="halls-heading">
        <p className="halls-eyebrow">✦ CHOOSE WITH CONFIDENCE</p>
        <h1>Compare Party Halls</h1>
        <p>
          Compare prices, capacity, ratings, and venue scores
          before choosing your celebration space.
        </p>
      </header>

      <section className="compare-picker">
        <div className="compare-section-heading">
          <div>
            <h2>Select Your Venues</h2>
            <p>Choose up to three halls to compare.</p>
          </div>
          <span className="compare-count">
            {selectedIds.length} / 3 selected
          </span>
        </div>

        <div className="compare-options">
          {halls.map((hall) => {
            const isSelected = selectedIds.includes(hall.id);

            return (
              <label
                key={hall.id}
                className={`compare-option ${
                  isSelected ? 'compare-option-selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleHall(hall.id)}
                  disabled={
                    !isSelected && selectedIds.length >= 3
                  }
                />

                <img src={hall.image} alt={hall.name} />

                <span className="compare-option-info">
                  <strong>{hall.name}</strong>
                  <span>{hall.location}</span>
                  <span>
                    ₹{Number(hall.price).toLocaleString('en-IN')}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            className="hall-clear-button compare-clear-button"
            onClick={() => setSelectedIds([])}
          >
            Clear selection
          </button>
        )}
      </section>

      {selectedHalls.length === 0 ? (
        <section className="compare-empty">
          <span>✦</span>
          <h2>Your comparison starts here</h2>
          <p>Select at least one hall above to see its details.</p>
        </section>
      ) : (
        <section className="compare-table-card">
          <div className="compare-section-heading">
            <div>
              <p className="halls-eyebrow">SIDE-BY-SIDE VIEW</p>
              <h2>Your Hall Comparison</h2>
            </div>
          </div>

          <div className="compare-table-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {selectedHalls.map((hall) => (
                    <th key={hall.id}>{hall.name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>Venue</th>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      <img
                        className="compare-table-image"
                        src={hall.image}
                        alt={hall.name}
                      />
                      <p>{hall.location}</p>
                    </td>
                  ))}
                </tr>

                {rows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    {selectedHalls.map((hall) => (
                      <td
                        key={hall.id}
                        className={
                          row.best?.id === hall.id
                            ? 'compare-best-cell'
                            : ''
                        }
                      >
                        <strong>{row.getValue(hall)}</strong>
                        {row.best?.id === hall.id && (
                          <span className="compare-best-label">
                            Best among selected
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <th>More details</th>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      <Link
                        to={`/halls/${hall.id}`}
                        className="compare-details-link"
                      >
                        View Hall →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="compare-note">
            Comparison highlights are calculated from the values in
            this project's sample data. Venue scores are not verified
            live reviews or an actual AI analysis.
          </p>
        </section>
      )}
    </div>
  );
}

export default Compare;