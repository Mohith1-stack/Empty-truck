import { Link } from 'react-router-dom';
import { Truck, ArrowRight, Store, HeartHandshake } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Background styling for truck/transportation culture vibe */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right bottom, #111827, #000000)',
        zIndex: -2,
      }}></div>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        zIndex: -1,
      }}></div>

      {/* Navbar */}
      <nav className="container flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 10 }}>
        <div className="flex-center" style={{ gap: '0.75rem' }}>
          <div className="flex-center" style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
            <Truck color="white" size={24} />
          </div>
          <h2 style={{ letterSpacing: '2px', fontWeight: 700, fontSize: '1.35rem' }}>OPTIMAL-TRUCK</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>
            About
          </Link>
          <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.35rem' }}>
            <span>Portal Login</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container flex-center" style={{ minHeight: 'calc(85vh - 80px)', flexDirection: 'column', textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '3.5rem 2.5rem', maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Enterprise Predictive Logistics & Humanitarian Aid</div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', background: 'linear-gradient(to right, #60a5fa, #a855f7, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Eliminate Empty Miles
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.6 }}>
            The definitive backhaul optimization platform intelligently pairing empty commercial vehicles with return loads to maximize fleet utilization and facilitate humanitarian aid.
          </p>

          <div className="flex-center" style={{ gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Value Pillars */}
      <div className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '3px solid #3b82f6' }}>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)' }}>
                <Truck size={24} color="var(--accent-primary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Driver Profit Maximization</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Stop driving empty. Discover return freight matched to your exact vehicle capacity and route coordinates with real-time ETA calculations.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: 'auto' }}>
                <span>Learn more in About</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '3px solid #10b981' }}>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)' }}>
                <Store size={24} color="var(--accent-secondary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Dealer Live Fleet Radar</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Locate nearby empty trucks on an interactive GPS map. Direct book reliable haulers within minutes, cutting freight broker markups by 30%.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', fontSize: '0.85rem', fontWeight: 600, marginTop: 'auto' }}>
                <span>Learn more in About</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '3px solid #ef4444' }}>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)' }}>
                <HeartHandshake size={24} color="var(--accent-danger)" />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Emergency Humanitarian Network</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Empowering NGOs and relief organizations to broadcast urgent medical, food, and disaster relief supplies directly to trucks already on the road.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-danger)', fontSize: '0.85rem', fontWeight: 600, marginTop: 'auto' }}>
                <span>Learn more in About</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>© 2026 OPTIMAL-TRUCK Platform. Engineered for fleet optimization, sustainability, and humanitarian response.</p>
      </footer>
    </div>
  );
}
