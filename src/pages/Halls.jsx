import { useState } from 'react';
import { Link } from 'react-router-dom';
import halls from '../data/halls';
import HallCard from '../components/HallCard';

function Halls() {
  const [search, setSearch] = useState('');
  const [maxBudget, setMaxBudget] = useState('all');
  const [minCapacity, setMinCapacity] = useState('all');
  const [selectedHalls, setSelectedHalls] = useState([]);

  const filteredHalls = halls.filter((hall) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      hall.name.toLowerCase().includes(searchText) ||
      hall.location.toLowerCase().includes(searchText);

    const matchesBudget =
      maxBudget === 'all' ||
      Number(hall.price) <= Number(maxBudget);

    const matchesCapacity =
      minCapacity === 'all' ||
      Number(hall.capacity) >= Number(minCapacity);

    return matchesSearch && matchesBudget && matchesCapacity;
  });

  const toggleCompare = (hall) => {
    setSelectedHalls((previous) => {
      const alreadySelected = previous.some(
        (item) => item.id === hall.id
      );

      if (alreadySelected) {
        return previous.filter((item) => item.id !== hall.id);
      }

      if (previous.length >= 3) {
        return previous;
      }

      return [...previous, hall];
    });
  };

  const clearFilters = () => {
    setSearch('');
    setMaxBudget('all');
    setMinCapacity('all');
  };

  return (
    <div className="page-container smart-halls-page">
      <div className="halls-heading">
        <p className="halls-eyebrow">
          ✦ YOUR CELEBRATION STARTS HERE
        </p>
        <h1>Find Your Perfect Party Hall</h1>
        <p>
          Discover, filter, and compare venues for your special
          celebration.
        </p>
      </div>

      <div className="hall-search-panel">
        <div className="hall-filter-field hall-search-field">
          <label htmlFor="hall-search">
            Search by name or location
          </label>
          <input
            id="hall-search"
            type="text"
            placeholder="Try Chennai or Royal Palace..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="hall-filter-field">
          <label htmlFor="hall-budget">Maximum budget</label>
          <select
            id="hall-budget"
            value={maxBudget}
            onChange={(event) => setMaxBudget(event.target.value)}
          >
            <option value="all">Any budget</option>
            <option value="10000">Up to ₹10,000</option>
            <option value="25000">Up to ₹25,000</option>
            <option value="50000">Up to ₹50,000</option>
            <option value="75000">Up to ₹75,000</option>
            <option value="100000">Up to ₹1,00,000</option>
          </select>
        </div>

        <div className="hall-filter-field">
          <label htmlFor="hall-capacity">Guest capacity</label>
          <select
            id="hall-capacity"
            value={minCapacity}
            onChange={(event) => setMinCapacity(event.target.value)}
          >
            <option value="all">Any capacity</option>
            <option value="50">At least 50 guests</option>
            <option value="100">At least 100 guests</option>
            <option value="200">At least 200 guests</option>
            <option value="300">At least 300 guests</option>
            <option value="500">At least 500 guests</option>
          </select>
        </div>

        <button
          type="button"
          className="hall-clear-button"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>

      <div className="halls-results-heading">
        <h2>Explore Venues</h2>
        <span>
          {filteredHalls.length}{' '}
          {filteredHalls.length === 1 ? 'hall' : 'halls'} found
        </span>
      </div>

      {filteredHalls.length > 0 ? (
        <div className="halls-grid">
          {filteredHalls.map((hall) => {
            const isSelected = selectedHalls.some(
              (item) => item.id === hall.id
            );

            return (
              <div key={hall.id} className="compare-hall-wrapper">
                <label className="compare-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={
                      !isSelected && selectedHalls.length >= 3
                    }
                    onChange={() => toggleCompare(hall)}
                  />
                  Compare this hall
                </label>

                <HallCard hall={hall} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="hall-empty-state">
          <div className="hall-empty-icon">⌕</div>
          <h2>No matching halls found</h2>
          <p>
            Try another location, increase your budget, or change
            the guest capacity.
          </p>
          <button
            type="button"
            className="hall-clear-button"
            onClick={clearFilters}
          >
            Show all halls
          </button>
        </div>
      )}

      {selectedHalls.length > 0 && (
        <section className="hall-comparison">
          <div className="halls-results-heading">
            <h2>Compare Your Shortlist</h2>
            <button
              type="button"
              className="hall-clear-button"
              onClick={() => setSelectedHalls([])}
            >
              Clear comparison
            </button>
          </div>

          <p className="comparison-description">
            Compare up to three venues before making your decision.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Details</th>
                  {selectedHalls.map((hall) => (
                    <th key={hall.id}>{hall.name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Location</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>{hall.location}</td>
                  ))}
                </tr>

                <tr>
                  <td>Starting price</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      ₹{Number(hall.price).toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Capacity</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.capacity} guests
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Rating</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      ★ {hall.rating}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Parking score</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.realityReport?.parking ?? 'N/A'}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>AC performance</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.realityReport?.acPerformance ?? 'N/A'}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Management</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.realityReport?.management ?? 'N/A'}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Vendor flexibility</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.realityReport?.vendorFlexibility ?? 'N/A'}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>True value score</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      {hall.realityReport?.trueValue ?? 'N/A'}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>View details</td>
                  {selectedHalls.map((hall) => (
                    <td key={hall.id}>
                      <Link to={`/halls/${hall.id}`}>
                        View hall →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default Halls;