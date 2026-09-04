import { useState } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Navigation2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';

export default function DriverDashboard() {
  const { currentUser } = useAuthStore();
  const { inbox, acceptOrder, deleteOrder } = useOrderStore();
  
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const myOrders = inbox.filter((order: any) => order.targetDriver === currentUser?.name);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* STATUS SECTION */}
      <div>
        <h2>My Status</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Update your current working status and capacity</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <span style={{ fontWeight: 600 }}>Open to Work</span>
              <button 
                onClick={() => setIsOpenToWork(!isOpenToWork)}
                style={{ width: '48px', height: '24px', borderRadius: '12px', background: isOpenToWork ? 'var(--accent-secondary)' : 'var(--bg-tertiary)', position: 'relative', transition: 'all 0.2s ease' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isOpenToWork ? '26px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'all 0.2s ease' }}></div>
              </button>
            </div>
            
            <div className="flex-between">
              <span style={{ fontWeight: 600 }}>Truck is Empty</span>
              <button 
                onClick={() => setIsEmpty(!isEmpty)}
                style={{ width: '48px', height: '24px', borderRadius: '12px', background: isEmpty ? 'var(--accent-secondary)' : 'var(--bg-tertiary)', position: 'relative', transition: 'all 0.2s ease' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isEmpty ? '26px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'all 0.2s ease' }}></div>
              </button>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Remaining Capacity (if not empty)</label>
              <input type="text" className="form-input" placeholder="e.g. 2 Tons" disabled={isEmpty} />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Current Load Details</label>
              <input type="text" className="form-input" placeholder="What are you currently carrying?" disabled={isEmpty} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Report Issue</label>
              <select className="form-input" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <option value="">No Issues</option>
                <option value="breakdown">Vehicle Breakdown</option>
                <option value="delay">Traffic Delay</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* INBOX SECTION */}
      <div>
        <h2>Order Inbox</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Direct load requests from dealers</p>
        
        {myOrders.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            No new load requests at the moment. Make sure you are open to work and sharing your live location.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {myOrders.map((order: any) => (
              <div key={order.id} className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem' }}>{order.dealer}</h3>
                  <div style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '1.25rem', marginTop: '0.25rem' }}>{order.payment}</div>
                  <div className="badge badge-primary" style={{ marginTop: '0.5rem' }}>{order.load}</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0 1.5rem', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Route</div>
                    <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      {order.from} <Navigation2 size={12} /> {order.to}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{order.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Profitability</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <TrendingUp size={14} /> {order.profit}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fuel Efficiency</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{order.fuelEfficiency}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button className="btn btn-success" onClick={() => { acceptOrder(order); alert('Accepted! Route sent to Active Navigation.'); }}>
                    <CheckCircle2 size={18} /> Accept
                  </button>
                  <button className="btn btn-secondary" onClick={() => deleteOrder(order.id)}>
                    <XCircle size={18} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
