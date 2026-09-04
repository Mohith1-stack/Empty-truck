import { AlertTriangle, HeartHandshake, MapPin, Clock } from 'lucide-react';

export default function EmergencyDashboard() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1>Emergency Support & Services</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Coordinate logistics for urgent needs and charity distribution</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Urgent Case */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--accent-danger)' }}>
          <div className="flex-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)' }}>
                <AlertTriangle color="var(--accent-danger)" size={24} />
              </div>
              <h2>Urgent Case</h2>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)' }}>Broadcast an immediate request to all fully empty trucks in the vicinity for urgent humanitarian or medical transport.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert('Urgent broadcast sent to all nearby empty trucks!'); }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Issue Details</label>
              <textarea className="form-input" placeholder="Describe the urgent situation..." rows={3} required></textarea>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Load Details (Medical supplies, personnel, etc.)</label>
              <input type="text" className="form-input" placeholder="What needs to be transported?" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pickup Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" className="form-input" placeholder="Where?" style={{ paddingLeft: '2.25rem' }} required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Required By</label>
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="time" className="form-input" style={{ paddingLeft: '2.25rem' }} required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}>
              Broadcast Urgent Request
            </button>
          </form>
        </div>

        {/* Charity */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--accent-secondary)' }}>
          <div className="flex-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)' }}>
                <HeartHandshake color="var(--accent-secondary)" size={24} />
              </div>
              <h2>Charity Meetup</h2>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)' }}>Organize logistics for NGO operations by finding proximal trucks willing to volunteer space for charitable distribution.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert('Charity broadcast sent!'); }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Charity Details</label>
              <textarea className="form-input" placeholder="Describe the charity operation and requirements..." rows={3} required></textarea>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Meetup Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="Where should drivers meet you?" style={{ paddingLeft: '2.25rem' }} required />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Organization Name</label>
              <input type="text" className="form-input" placeholder="e.g. Red Cross, Local NGO" required />
            </div>

            <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}>
              Broadcast Charity Request
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
