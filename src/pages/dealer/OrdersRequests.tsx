import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

export default function OrdersRequests() {
  const { inbox, deleteOrder } = useOrderStore();
  const { currentUser } = useAuthStore();
  
  const dealerName = currentUser?.orgName || currentUser?.name || 'Unknown Dealer';
  const sentRequests = inbox.filter((order: any) => order.dealer === dealerName && order.targetDriver);

  return (
    <div className="animate-fade-in">
      <h2>Orders & Requests</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Track the status of your broadcasted loads and direct requests</p>
      
      {sentRequests.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No sent requests.</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't sent any direct requests to drivers yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {sentRequests.map((req: any) => (
            <div key={req.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.125rem' }}>{req.load}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Requested to Driver: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{req.targetDriver}</span></div>
                </div>
                <div className="badge badge-warning">Pending Acceptance</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From</div>
                  <div style={{ fontWeight: 600 }}>{req.from}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To</div>
                  <div style={{ fontWeight: 600 }}>{req.to}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Payment</div>
                  <div style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>{req.payment}</div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', color: 'var(--accent-danger)' }} onClick={() => {
                if(window.confirm('Cancel this request?')) deleteOrder(req.id);
              }}>
                Cancel Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
