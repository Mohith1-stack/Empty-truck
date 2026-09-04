import { HeartHandshake, MapPin } from 'lucide-react';

export default function CharityMeetups() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)' }}>
            <HeartHandshake color="var(--accent-secondary)" size={24} />
          </div>
          <h2>Charity Meetup</h2>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Organize logistics for NGO operations by finding proximal trucks willing to volunteer space for charitable distribution.</p>

      <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--accent-secondary)' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('Charity broadcast sent!'); }}>
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
  );
}
