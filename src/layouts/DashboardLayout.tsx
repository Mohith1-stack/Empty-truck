import { Outlet, Link, useLocation } from 'react-router-dom';
import { Truck, Map, Radio, ListOrdered, LogOut, Activity, MessageSquare, AlertTriangle, HeartHandshake, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function DashboardLayout() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const isDealer = location.pathname.startsWith('/dealer');
  const isEmergency = location.pathname.startsWith('/emergency');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <Link to="/" className="flex-center" style={{ gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
            <div className="flex-center" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-primary)' }}>
              <Truck size={20} />
            </div>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '1px' }}>OPTIMAL-TRUCK</h2>
          </Link>
        </div>

        <nav style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {isDealer && (
            <>
              <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Dealer Menu</div>
              <Link to="/dealer" className={`nav-item ${location.pathname === '/dealer' ? 'active' : ''}`}><Truck /> Truck Suggestions</Link>
              <Link to="/dealer/map" className={`nav-item ${location.pathname.includes('/dealer/map') ? 'active' : ''}`}><Map /> Overview Map</Link>
              <Link to="/dealer/broadcast" className={`nav-item ${location.pathname.includes('/dealer/broadcast') ? 'active' : ''}`}><Radio /> Broadcast Load</Link>
              <Link to="/dealer/orders" className={`nav-item ${location.pathname.includes('/dealer/orders') ? 'active' : ''}`}><ListOrdered /> Orders & Requests</Link>
            </>
          )}

          {location.pathname.startsWith('/driver') && (
            <>
              <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Driver Menu</div>
              <Link to="/driver" className={`nav-item ${location.pathname === '/driver' ? 'active' : ''}`}><Activity /> Status & Updates</Link>
              <Link to="/driver/inbox" className={`nav-item ${location.pathname.includes('/driver/inbox') ? 'active' : ''}`}><MessageSquare /> Inbox</Link>
              <Link to="/driver/map" className={`nav-item ${location.pathname.includes('/driver/map') ? 'active' : ''}`}><Map /> Open Loads Map</Link>
              <Link to="/driver/social" className={`nav-item ${location.pathname.includes('/driver/social') ? 'active' : ''}`}><HeartHandshake /> Social / Charity</Link>
              <Link to="/driver/navigation" className={`nav-item ${location.pathname.includes('/driver/navigation') ? 'active' : ''}`}><Truck /> Active Journey</Link>
            </>
          )}

          {isEmergency && (
            <>
              <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Emergency Menu</div>
              <Link to="/emergency" className={`nav-item ${location.pathname === '/emergency' ? 'active' : ''}`}><Activity /> Dashboard</Link>
              <Link to="/emergency/urgent" className={`nav-item ${location.pathname.includes('/emergency/urgent') ? 'active' : ''}`}><AlertTriangle /> Urgent Broadcast</Link>
              <Link to="/emergency/charity" className={`nav-item ${location.pathname.includes('/emergency/charity') ? 'active' : ''}`}><HeartHandshake /> Charity Meetups</Link>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to={isDealer ? '/dealer/settings' : isEmergency ? '/emergency/settings' : '/driver/settings'} className={`nav-item ${location.pathname.includes('/settings') ? 'active' : ''}`} style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>
            <Settings /> Settings
          </Link>
          <Link 
            to="/login" 
            onClick={() => logout()}
            className="nav-item" 
            style={{ padding: '0.5rem', color: 'var(--text-muted)' }}
          >
            <LogOut /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
