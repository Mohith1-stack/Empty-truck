import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

export default function UrgentBroadcast() {
  const { addCharity } = useOrderStore();
  const { currentUser } = useAuthStore();

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    addCharity({
      dealer: currentUser?.orgName || currentUser?.name || 'Unknown Organization',
      load: `${formData.get('details')} - ${formData.get('load')}`,
      from: formData.get('pickup') as string,
      to: `Required by ${formData.get('time')}`,
      payment: 'Charity (Urgent)',
      isCharity: true
    });
    alert('Urgent broadcast sent to all nearby empty trucks!');
    (e.target as HTMLFormElement).reset();
  };
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)' }}>
            <AlertTriangle color="var(--accent-danger)" size={24} />
          </div>
          <h2>Urgent Case Broadcast</h2>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Broadcast an immediate request to all fully empty trucks in the vicinity for urgent humanitarian or medical transport.</p>

      <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--accent-danger)' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleBroadcast}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Issue Details</label>
            <textarea name="details" className="form-input" placeholder="Describe the urgent situation..." rows={3} required></textarea>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Load Details (Medical supplies, personnel, etc.)</label>
            <input name="load" type="text" className="form-input" placeholder="What needs to be transported?" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Pickup Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="pickup" type="text" className="form-input" placeholder="Where?" style={{ paddingLeft: '2.25rem' }} required />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Required By</label>
              <div style={{ position: 'relative' }}>
                <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="time" type="time" className="form-input" style={{ paddingLeft: '2.25rem' }} required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}>
            Broadcast Urgent Request
          </button>
        </form>
      </div>
    </div>
  );
}
