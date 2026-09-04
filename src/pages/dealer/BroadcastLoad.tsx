import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

export default function BroadcastLoad() {
  const { addOrder } = useOrderStore();
  const { currentUser } = useAuthStore();

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formTarget = e.target as HTMLFormElement;
    
    const sendLoad = (lat: number, lng: number) => {
      addOrder({
        dealer: currentUser?.orgName || currentUser?.name || 'Unknown Dealer',
        load: formData.get('loadDetails') as string,
        from: 'Dealer Hub',
        to: 'Open Request',
        payment: `₹${formData.get('payment')}`,
        profit: 'Flexible',
        fuelEfficiency: 'N/A',
        duration: 'N/A',
        isCharity: false,
        lat,
        lng
      });
      alert('Broadcast sent! Drivers can now see this in their Open Loads Map.');
      formTarget.reset();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => sendLoad(pos.coords.latitude, pos.coords.longitude),
        () => sendLoad(18.5204, 73.8567) // fallback to Pune
      );
    } else {
      sendLoad(18.5204, 73.8567);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2>Broadcast Load</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Send an open request to all nearby drivers</p>
      
      <div className="glass-card" style={{ padding: '2rem', marginTop: '1.5rem', maxWidth: '600px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleBroadcast}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Product Details</label>
            <textarea name="loadDetails" className="form-input" placeholder="Describe the product..." rows={3} required></textarea>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Payment Offer (INR)</label>
            <input name="payment" type="number" className="form-input" placeholder="₹0.00" required />
          </div>
          <button type="submit" className="btn btn-primary">Broadcast to Network</button>
        </form>
      </div>
    </div>
  );
}
