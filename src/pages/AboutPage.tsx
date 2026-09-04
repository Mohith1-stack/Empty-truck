import { Link } from 'react-router-dom';
import { 
  Truck, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Leaf, 
  HeartHandshake, 
  Compass, 
  Zap, 
  BarChart3, 
  Globe2, 
  Clock, 
  Store, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Ambient background glows */}
      <div className="blob" style={{ top: '5%', left: '10%', width: '500px', height: '500px', background: 'rgba(59, 130, 246, 0.25)' }}></div>
      <div className="blob" style={{ top: '40%', right: '5%', width: '450px', height: '450px', background: 'rgba(139, 92, 246, 0.2)' }}></div>
      <div className="blob" style={{ bottom: '10%', left: '25%', width: '400px', height: '400px', background: 'rgba(16, 185, 129, 0.15)' }}></div>

      {/* Navigation Bar */}
      <nav className="container flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 10 }}>
        <Link to="/" className="flex-center" style={{ gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
          <div className="flex-center" style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
            <Truck color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.25rem', letterSpacing: '1.5px', fontWeight: 700 }}>OPTIMAL-TRUCK</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Home
          </Link>
          <Link to="/about" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>
            About
          </Link>
          <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem' }}>
            <span>Portal Login</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem 6rem' }}>
        
        {/* Hero Section */}
        <section style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 5rem' }}>
          <div className="badge badge-primary animate-fade-in" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem' }}>
            <Zap size={15} />
            <span>Next-Gen Backhaul Optimization & Humanitarian Logistics</span>
          </div>

          <h1 className="animate-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Transforming Empty Miles into <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Profitable Journeys & Urgent Relief</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            OPTIMAL-TRUCK is an intelligent logistics and humanitarian fleet coordination platform engineered to eliminate commercial truck deadheading, maximize driver profits, lower freight costs, and mobilize empty vehicles for crisis response.
          </p>

          <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Experience The Platform</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#problems" className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Explore Problems We Solve
            </a>
          </div>
        </section>

        {/* What is OPTIMAL-TRUCK doing? Section */}
        <section style={{ marginBottom: '6rem' }}>
          <div className="glass-card" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(59, 130, 246, 0.25)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(20, 15, 35, 0.8))' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
                  <Globe2 size={18} />
                  <span>Platform Overview</span>
                </div>
                <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>What is OPTIMAL-TRUCK Doing?</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  In the commercial freight industry, an alarming percentage of trucks return from their drop-off destinations completely empty. Drivers burn expensive diesel, pay interstate highway tolls, and suffer vehicle depreciation without earning a single rupee on their return journey.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  OPTIMAL-TRUCK operates a real-time, predictive multi-portal ecosystem connecting three critical stakeholders: <strong>Truck Drivers</strong>, <strong>Commercial Dealers/Shippers</strong>, and <strong>Emergency NGOs/Humanitarian Foundations</strong>. By providing dynamic GPS tracking, automated backhaul matching, and urgent dispatch protocols, we ensure no commercial vehicle travels empty again.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', flexShrink: 0 }}>
                    <Compass size={22} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Predictive Route & Capacity Matching</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Calculates when and where a truck will finish its primary unload, pre-matching it with return spot loads along its home corridor.</p>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', flexShrink: 0 }}>
                    <Store size={22} color="var(--accent-secondary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Live Empty Truck Radar for Dealers</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dealers view available trucks geographically, check capacity, and book immediate dispatches without broker delays or middlemen surcharges.</p>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)', flexShrink: 0 }}>
                    <HeartHandshake size={22} color="var(--accent-danger)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Crisis & Humanitarian Aid Integration</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>During floods, landslides, or emergencies, NGOs broadcast critical medicine and rations directly to empty trucks in transit for rapid response.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems We Are Solving Section */}
        <section id="problems" style={{ marginBottom: '6rem', scrollMarginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="badge badge-warning" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={15} />
              <span>Industry Challenges</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.025em' }}>The Problems We Are Solving</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Traditional freight logistics suffers from deep systemic inefficiencies that penalize drivers, burden dealers, and ignore humanitarian crises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            
            {/* Problem 1 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #ef4444' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)', marginBottom: '1.25rem' }}>
                <Truck color="#ef4444" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. The "Deadhead Mile" Crisis</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Over <strong>38% to 42%</strong> of commercial heavy freight trucks on Indian highways travel empty on their return trips. This deadhead mileage creates massive logistical waste, congests national highways, and causes severe operational deadweight.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.08)', fontSize: '0.825rem', color: '#fca5a5' }}>
                <strong>Impact:</strong> Billions of empty kilometers driven every year with 0 economic output.
              </div>
            </div>

            {/* Problem 2 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #f59e0b' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', marginBottom: '1.25rem' }}>
                <TrendingUp color="#f59e0b" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Crippling Driver Revenue Loss</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                When returning empty, truck drivers must pay fuel, highway tolls, and meals out of their own pocket. An unladen trip slashes their round-trip profit margin by <strong>up to 40%</strong>, forcing drivers into debt and precarious financial strain.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.08)', fontSize: '0.825rem', color: '#fcd34d' }}>
                <strong>Impact:</strong> Drivers lose ₹15,000–₹25,000 in potential monthly income on unmonetized return routes.
              </div>
            </div>

            {/* Problem 3 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #10b981' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', marginBottom: '1.25rem' }}>
                <Leaf color="#10b981" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Excessive Carbon Emissions</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Heavy commercial trucks emit heavy CO2 and particulate matter. Running empty vehicles simply to return them home generates millions of metric tons of avoidable greenhouse gas emissions without delivering any societal value.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.08)', fontSize: '0.825rem', color: '#6ee7b7' }}>
                <strong>Impact:</strong> Severe environmental degradation from burning diesel hauling empty air.
              </div>
            </div>

            {/* Problem 4 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #8b5cf6' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.15)', marginBottom: '1.25rem' }}>
                <Clock color="#8b5cf6" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Slow, Fragmented Freight Sourcing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Dealers and business owners needing to ship spot cargo rely on opaque local transport brokers, phone calls, and manual negotiations, causing shipment delays of 24 to 48 hours and high broker markups.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(139, 92, 246, 0.08)', fontSize: '0.825rem', color: '#c4b5fd' }}>
                <strong>Impact:</strong> Higher shipping costs and unpredictable supply chain bottlenecks.
              </div>
            </div>

            {/* Problem 5 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #ec4899' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(236, 72, 153, 0.15)', marginBottom: '1.25rem' }}>
                <HeartHandshake color="#ec4899" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Severe Logistics Shortage in Crises</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                When natural disasters strike (such as the Kerala landslides or monsoon floods), relief foundations and NGOs struggle to find available freight to move emergency drinking water, saline, baby food, and blankets into affected zones rapidly.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(236, 72, 153, 0.08)', fontSize: '0.825rem', color: '#fbcfe8' }}>
                <strong>Impact:</strong> Life-saving supplies sit in warehouses while empty trucks drive past unaffected.
              </div>
            </div>

            {/* Problem 6 */}
            <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #3b82f6' }}>
              <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.15)', marginBottom: '1.25rem' }}>
                <MapPin color="#3b82f6" size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Zero Real-Time Fleet Visibility</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Independent truck drivers have no centralized digital presence. A dealer with cargo just 10 kilometers away has no way of knowing that an empty 10-wheel truck is waiting right at a nearby toll plaza or distribution hub.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(59, 130, 246, 0.08)', fontSize: '0.825rem', color: '#bfdbfe' }}>
                <strong>Impact:</strong> Complete information asymmetry between supply and demand.
              </div>
            </div>

          </div>
        </section>

        {/* How It Works for the 3 Stakeholders */}
        <section style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.025em' }}>How OPTIMAL-TRUCK Solves This</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>A unified three-way digital marketplace designed for real-time collaboration</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Driver Portal */}
            <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div className="flex-between">
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.2)' }}>
                  <Truck color="var(--accent-primary)" size={26} />
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Portal 01</span>
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>For Commercial Drivers</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Turn your return trip into pure profit. Toggle your availability with one tap and let the system bring return loads directly to your inbox.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Live GPS broadcast with instant visibility to local dealers
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Receive direct bookings with guaranteed payments
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Dynamic OSRM turn-by-turn routing with fuel analytics
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Opportunity to volunteer space for humanitarian missions
                </li>
              </ul>
            </div>

            {/* Dealer Portal */}
            <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div className="flex-between">
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.2)' }}>
                  <Store color="var(--accent-secondary)" size={26} />
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-secondary)', textTransform: 'uppercase' }}>Portal 02</span>
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>For Dealers & Shippers</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Find verified empty trucks right on your interactive regional map. Book instantly at competitive rates without middlemen.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Interactive GPS map showing trucks within 500km
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Filter by capacity (10T, 14T, 20T) and ETA to empty
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> One-click broadcast of open freight to all regional drivers
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> 25%–35% savings compared to standard broker rates
                </li>
              </ul>
            </div>

            {/* Emergency Portal */}
            <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div className="flex-between">
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.2)' }}>
                  <HeartHandshake color="var(--accent-danger)" size={26} />
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-danger)', textTransform: 'uppercase' }}>Portal 03</span>
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>For NGOs & Relief Teams</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Broadcast emergency humanitarian freight needs to an army of trucks already on the road, creating a life-saving disaster relief logistics network.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Immediate broadcast to all nearby empty commercial trucks
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> High-priority red alert styling across driver dashboards
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Sub-15 minute average response times for crisis shipments
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color="var(--accent-secondary)" /> Transport critical relief at fuel-only or volunteer terms
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Quantifiable Impact Metrics */}
        <section style={{ marginBottom: '6rem' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.7))' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="badge badge-primary" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={15} />
                <span>Demonstrated Impact</span>
              </div>
              <h2 style={{ fontSize: '2.25rem' }}>Projected Economic & Environmental Impact</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>42%</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Reduction in Empty Running</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Less deadhead miles driven across key corridors</div>
              </div>

              <div style={{ padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-secondary)', marginBottom: '0.25rem' }}>+₹18k</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Extra Monthly Driver Profit</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Net increase in take-home income per truck</div>
              </div>

              <div style={{ padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.25rem' }}>28%</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Shipper Freight Cost Savings</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lower spot freight costs through direct matching</div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-danger)', marginBottom: '0.25rem' }}>&lt;15m</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Emergency Dispatch Speed</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average response time to humanitarian broadcasts</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section style={{ textAlign: 'center', padding: '4rem 2rem', background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Ready to Experience OPTIMAL-TRUCK?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Try the interactive prototype with pre-loaded demo accounts for Drivers, Commercial Dealers, and Humanitarian NGOs.
          </p>
          <div className="flex-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Enter Portal Login</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Back to Home
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>© 2026 OPTIMAL-TRUCK Platform. Engineered for fleet optimization, sustainability, and humanitarian response.</p>
      </footer>

    </div>
  );
}
