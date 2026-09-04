import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Bell, Shield, Truck, Building, Globe, CheckCircle } from 'lucide-react';

export default function Settings() {
  const location = useLocation();
  const isDriver = location.pathname.startsWith('/driver');
  const isDealer = location.pathname.startsWith('/dealer');
  const isEmergency = location.pathname.startsWith('/emergency');

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Account Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your preferences and platform configuration</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', flex: 1, alignItems: 'start' }}>
        
        {/* Settings Navigation */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Profile Details
          </button>
          
          <button 
            className={`btn ${activeTab === 'notifications' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifications
          </button>

          {isDriver && (
            <button 
              className={`btn ${activeTab === 'vehicle' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              onClick={() => setActiveTab('vehicle')}
            >
              <Truck size={18} /> Vehicle & Routing
            </button>
          )}

          {isDealer && (
            <button 
              className={`btn ${activeTab === 'business' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              onClick={() => setActiveTab('business')}
            >
              <Building size={18} /> Business Info
            </button>
          )}

          {isEmergency && (
            <button 
              className={`btn ${activeTab === 'ngo' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              onClick={() => setActiveTab('ngo')}
            >
              <Globe size={18} /> NGO Verification
            </button>
          )}

          <div style={{ margin: '1rem 0', height: '1px', background: 'var(--border-color)' }}></div>
          
          <button 
            className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {activeTab === 'profile' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>Profile Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" defaultValue={isDriver ? "Rajesh Kumar" : isDealer ? "ABC Logistics Admin" : "Red Cross Coordinator"} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
                </div>
                <div className="form-group" style={{ marginBottom: 0, gridColumn: '1 / -1' }}>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" defaultValue="user@optimal-truck.com" />
                </div>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>Notification Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Email Alerts</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive daily summaries and critical updates.</div>
                  </div>
                </label>
                <div style={{ height: '1px', background: 'var(--border-color)' }}></div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>SMS Notifications</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Instant alerts for {isDriver ? 'new backhaul matches' : 'load acceptances'}.</div>
                  </div>
                </label>
                <div style={{ height: '1px', background: 'var(--border-color)' }}></div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={isDriver || isEmergency} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Emergency Broadcasts</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive urgent humanitarian supply requests in your area.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'vehicle' && isDriver && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>Vehicle & Routing</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Truck Type</label>
                  <select className="form-input">
                    <option>Flatbed (20 ft)</option>
                    <option>Refrigerated</option>
                    <option>Container (40 ft)</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Max Capacity (Tons)</label>
                  <input type="number" className="form-input" defaultValue="15" />
                </div>
                <div className="form-group" style={{ marginBottom: 0, gridColumn: '1 / -1' }}>
                  <label className="form-label">Maximum Detour Radius (km)</label>
                  <input type="range" min="10" max="100" defaultValue="30" style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    <span>10 km</span>
                    <span>Accepting loads up to 30 km off-route</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Update Vehicle Profile</button>
            </div>
          )}

          {activeTab === 'business' && isDealer && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>Business Info</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-input" defaultValue="ABC Logistics Pvt Ltd" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">GST / Registration Number</label>
                  <input type="text" className="form-input" defaultValue="27AADCB2230M1Z2" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Default Pickup Hub</label>
                  <input type="text" className="form-input" defaultValue="Mumbai Central Warehouse" />
                </div>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Business Details</button>
            </div>
          )}

          {activeTab === 'ngo' && isEmergency && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>NGO Verification</h3>
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <CheckCircle size={24} color="var(--accent-success)" />
                  <h4 style={{ margin: 0, color: 'var(--accent-success)' }}>Verified NGO Status</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your organization has been verified. You can broadcast urgent humanitarian loads directly to nearby drivers with zero commission.</p>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Organization Name</label>
                <input type="text" className="form-input" defaultValue="Global Relief Foundation" readOnly style={{ opacity: 0.7 }} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Broadcast Radius Limit (km)</label>
                <select className="form-input">
                  <option>100 km (Regional)</option>
                  <option>500 km (State)</option>
                  <option selected>National</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>Security Settings</h3>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-input" />
                </div>
              </div>
              <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '1rem', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)' }}>Update Password</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
