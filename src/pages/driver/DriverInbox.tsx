import { CheckCircle2, XCircle, TrendingUp, Navigation2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

export default function DriverInbox() {
  const navigate = useNavigate();
  const { inbox, acceptOrder, deleteOrder } = useOrderStore();
  const { currentUser } = useAuthStore();

  const handleAccept = (order: any) => {
    acceptOrder(order);
    navigate('/driver/navigation');
  };

  const driverName = currentUser?.name || 'Unknown Driver';
  const visibleOrders = inbox.filter((order: any) => !order.targetDriver || order.targetDriver === driverName);

  return (
    <div className="animate-fade-in">
      <h2>Order Inbox</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Direct load requests from dealers</p>
      
      {visibleOrders.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No new orders right now.</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check back later or view the Open Loads Map.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          {visibleOrders.map((order: any) => (
            <div key={order.id} className="glass-card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem' }}>{order.dealer}</h3>
                <div style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '1.25rem', margin: '0.25rem 0' }}>{order.payment}</div>
                <div className="badge badge-primary">{order.load}</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Route</div>
                  <div style={{ fontWeight: 600 }}>{order.from} <Navigation2 size={12} style={{ display: 'inline', transform: 'rotate(90deg)' }}/> {order.to}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Duration</div>
                  <div style={{ fontWeight: 600 }}>{order.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Profitability</div>
                  <div style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}><TrendingUp size={14} style={{ display: 'inline' }}/> {order.profit}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fuel Efficiency</div>
                  <div style={{ fontWeight: 600 }}>{order.fuelEfficiency}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  className="btn btn-success" 
                  onClick={() => handleAccept(order)}
                >
                  <CheckCircle2 size={18} /> Accept
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  if(window.confirm('Are you sure you want to decline this request?')) deleteOrder(order.id);
                }}>
                  <XCircle size={18} /> Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
