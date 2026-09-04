import { HeartHandshake, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

export default function SocialCharity() {
  const navigate = useNavigate();
  const { charityInbox, acceptOrder } = useOrderStore();

  return (
    <div className="animate-fade-in">
      <h2>Social & Charity Requests</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Volunteer your empty space for NGOs</p>

      {charityInbox.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No active charity requests.</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check back later or view the Open Loads Map.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          {charityInbox.map((order: any) => (
            <div key={order.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--accent-secondary)' }}>
              <div className="flex-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)' }}>
                    <HeartHandshake color="var(--accent-secondary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem' }}>{order.dealer}</h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.load.includes(' - ') ? order.load.split(' - ')[1] : 'Urgent Transport'}</div>
                  </div>
                </div>
                <div className="badge badge-success">Charity Request</div>
              </div>
              
              <p style={{ color: 'var(--text-secondary)' }}>We need an empty truck for an urgent humanitarian request. Details: {order.load.includes(' - ') ? order.load.split(' - ')[0] : order.load}. We will cover fuel costs.</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--text-muted)" />
                  <span>Meetup: {order.from} <span style={{ opacity: 0.7 }}>({order.to})</span></span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    acceptOrder(order);
                    navigate('/driver/navigation');
                  }}
                >
                  Accept Request
                </button>
                <button className="btn btn-secondary">Ignore</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
