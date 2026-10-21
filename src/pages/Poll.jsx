import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import halls from '../data/halls';

function Poll() {
  const { id } = useParams();

  const initialHall = halls.find(
    (hall) => String(hall.id) === String(id)
  );

  const [selectedHallId, setSelectedHallId] = useState(
    String(initialHall?.id ?? halls[0]?.id ?? '')
  );

  const [votes, setVotes] = useState({});
  const [voted, setVoted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const selectedHall = halls.find(
    (hall) => String(hall.id) === selectedHallId
  );

  const totalVotes = Object.values(votes).reduce(
    (total, count) => total + count,
    0
  );

  const leadingHall = halls.reduce((leader, hall) => {
    return (votes[hall.id] || 0) > (votes[leader.id] || 0)
      ? hall
      : leader;
  }, halls[0]);

  const submitVote = () => {
    if (!selectedHall || voted) return;

    setVotes((previous) => ({
      ...previous,
      [selectedHall.id]: (previous[selectedHall.id] || 0) + 1,
    }));

    setVoted(true);
  };

  const copyPollLink = async () => {
    const link = window.location.href;

    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
    } catch {
      window.prompt('Copy your poll link:', link);
    }
  };

  const shareOnWhatsApp = () => {
    const link = window.location.href;
    const message = `Help us choose our party hall! Vote here: ${link}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="page-container poll-page">
      <div className="halls-heading">
        <p className="halls-eyebrow">✦ DECIDE TOGETHER</p>
        <h1>Family Hall Voting</h1>
        <p>
          Choose your favourite venue and help plan a celebration
          everyone will love.
        </p>
      </div>

      <section className="poll-card">
        <h2>Share Your Poll</h2>
        <p className="poll-instructions">
          Invite your family and friends to participate.
        </p>

        <div className="poll-share-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={copyPollLink}
          >
            🔗 {linkCopied ? 'Link Copied!' : 'Copy Poll Link'}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={shareOnWhatsApp}
          >
            Share on WhatsApp
          </button>
        </div>

        <p className="poll-demo-note">
          This link opens the same poll page. Votes are currently
          stored only in this browser and are not shared between devices.
          Deploy the website before sharing the link with people outside
          your computer.
        </p>
      </section>

      <section className="poll-card">
        <h2>Choose Your Favourite Hall</h2>
        <p className="poll-instructions">
          Select one venue and submit your vote.
        </p>

        <div className="poll-venue-list">
          {halls.map((hall) => (
            <label
              key={hall.id}
              className={`poll-venue-option ${
                selectedHallId === String(hall.id)
                  ? 'poll-venue-selected'
                  : ''
              }`}
            >
              <input
                type="radio"
                name="hall-vote"
                value={String(hall.id)}
                checked={selectedHallId === String(hall.id)}
                disabled={voted}
                onChange={() => setSelectedHallId(String(hall.id))}
              />

              <img src={hall.image} alt={hall.name} />

              <span className="poll-venue-info">
                <strong>{hall.name}</strong>
                <span>{hall.location}</span>
                <span>
                  ₹{Number(hall.price).toLocaleString('en-IN')} ·{' '}
                  {hall.capacity} guests
                </span>
              </span>

              <span className="poll-venue-rating">
                ★ {hall.rating}
              </span>
            </label>
          ))}
        </div>

        {!voted ? (
          <button
            type="button"
            className="btn-primary poll-submit-button"
            onClick={submitVote}
            disabled={!selectedHall}
          >
            Submit My Vote ✦
          </button>
        ) : (
          <div className="poll-success-message">
            <strong>✓ Vote submitted!</strong>
            <p>
              Your vote for {selectedHall?.name} has been counted
              in this browser session.
            </p>
            <p>You cannot submit another vote in this page session.</p>
          </div>
        )}
      </section>

      <section className="poll-results-card">
        <div className="poll-results-heading">
          <div>
            <p className="halls-eyebrow">GROUP RESULTS</p>
            <h2>Hall Popularity</h2>
          </div>

          <span className="poll-total-badge">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </span>
        </div>

        {halls.map((hall) => {
          const count = votes[hall.id] || 0;
          const percentage =
            totalVotes > 0 ? (count / totalVotes) * 100 : 0;

          return (
            <div key={hall.id} className="poll-result-row">
              <div className="poll-result-label">
                <strong>{hall.name}</strong>
                <span>
                  {count} {count === 1 ? 'vote' : 'votes'} ·{' '}
                  {Math.round(percentage)}%
                </span>
              </div>

              <div
                className="poll-result-track"
                role="progressbar"
                aria-label={`${hall.name} vote share`}
                aria-valuenow={Math.round(percentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="poll-result-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {totalVotes > 0 && leadingHall && (
          <div className="poll-leader">
            <span>🏆 Current leader</span>
            <strong>{leadingHall.name}</strong>
          </div>
        )}

        <p className="poll-demo-note">
          Demo mode: these results are temporary and visible only
          in the current page session. A database is needed for
          shared voting across phones and computers.
        </p>
      </section>

      {selectedHall && (
        <div className="poll-footer-action">
          <Link
            to={`/halls/${selectedHall.id}`}
            className="btn-secondary"
          >
            View Selected Hall →
          </Link>
        </div>
      )}
    </div>
  );
}

export default Poll;