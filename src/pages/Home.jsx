
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Reality Analyzer',
      description:
        'Understand venue reviews, spot common complaints, and make confident decisions.',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Poll',
      description:
        'Share your shortlisted halls and let everyone vote for their favourite.',
    },
    {
      icon: '📅',
      title: 'Smart Availability',
      description:
        'Explore date availability and compare indicative prices for your celebration.',
    },
    {
      icon: '🛡️',
      title: 'Backup Hall',
      description:
        'Discover alternative venues that match your event needs if plans change.',
    },
  ];

  return (
    <main className="home-container luxury-home">
      <section className="hero luxury-hero">
        <div className="hero-content">
          <div className="luxury-badge">
            ✨ PREMIUM VENUES · SMARTER CHOICES
          </div>

          <h1>
            Find a Hall That Fits
            <br />
            Your <span>Vibe</span>
            <span className="title-sparkle"> ✦</span>
          </h1>

          <p>
            Discover, compare, analyze, and book beautiful venues
            with your family, without the guesswork.
          </p>

          <Link to="/halls" className="btn-cta luxury-cta">
            Explore Party Halls <span>→</span>
          </Link>

          <div className="hero-trust">
            <span>✧ Thoughtful planning</span>
            <span>✧ Unforgettable celebrations</span>
          </div>
        </div>

        <div className="hero-sparkle sparkle-one">✦</div>
        <div className="hero-sparkle sparkle-two">✧</div>
        <div className="hero-sparkle sparkle-three">✦</div>
      </section>

      <section className="features luxury-features">
        <div className="section-eyebrow">
          SMARTER PLANNING <span>✦</span> HAPPIER CELEBRATIONS
        </div>

        <h2>
          Why Vibe<span>Space</span>?
        </h2>

        <p className="features-intro">
          Thoughtful features to help you choose the perfect venue
          with confidence.
        </p>

        <div className="feature-grid luxury-feature-grid">
          {features.map((feature, index) => (
            <article className="feature-card luxury-feature-card" key={feature.title}>
              <div className="feature-icon">
                {feature.icon}
              </div>

              <div className="card-sparkle">✦</div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <div className="card-divider" />

              <span className="feature-number">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>

        <div className="luxury-bottom">
          <span>✧</span>
          Every celebration deserves a beautiful beginning.
          <span>✧</span>
        </div>
      </section>
    </main>
  );
}

export default Home;
