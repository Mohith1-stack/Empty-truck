import { useState } from 'react';
import MapWidget from '../../components/MapWidget';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import { Crosshair } from 'lucide-react';

export default function OpenLoadsMap() {
  const { inbox } = useOrderStore();
  const { currentUser } = useAuthStore();
  const [localLocation, setLocalLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Filter for broadcasted loads (no specific target driver and not charity)
  const broadcastedLoads = inbox.filter((order: any) => !order.targetDriver && !order.isCharity);
  
  const mapPoints: any[] = broadcastedLoads.map((order: any) => ({
    id: order.id,
    lat: order.lat || 18.5204,
    lng: order.lng || 73.8567,
    type: 'available' as const,
    label: `${order.load} (${order.payment})`,
    details: {
      driver: order.dealer,
      vehicle: order.load,
      status: 'Open Request',
      capacity: order.payment,
      journey: 'Broadcasted to Network'
    }
  }));

  const userLat = localLocation ? localLocation[0] : currentUser?.lat;
  const userLng = localLocation ? localLocation[1] : currentUser?.lng;

  if (userLat && userLng) {
    mapPoints.push({
      id: 'driver-home',
      lat: userLat,
      lng: userLng,
      type: 'home',
      label: 'Your Current Location'
    });
  }

  const center = (userLat && userLng) 
    ? [userLat, userLng] 
    : mapPoints.length > 0 ? [mapPoints[0].lat, mapPoints[0].lng] : [20.5937, 78.9629]; // Center of India fallback

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocalLocation([pos.coords.latitude, pos.coords.longitude]);
          setIsLocating(false);
        },
        (err) => {
          console.error(err);
          alert("Could not fetch location. Please enable location permissions.");
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 4rem)' }}>
      <div className="flex-between">
        <div>
          <h2>Open Loads Map</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Browse and filter available loads across India</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleLocateMe} disabled={isLocating}>
          <Crosshair size={18} /> {isLocating ? 'Locating...' : (userLat ? 'GPS Active' : 'Use My GPS')}
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <input type="text" className="form-input" placeholder="Search loads..." style={{ flex: 1 }} />
        <select className="form-input" style={{ width: 'auto' }}>
          <option>Any Profitability</option>
          <option>High Profit</option>
          <option>Medium Profit</option>
        </select>
        <select className="form-input" style={{ width: 'auto' }}>
          <option>Any Duration</option>
          <option>&lt; 2 Hours</option>
          <option>2 - 5 Hours</option>
        </select>
        <button className="btn btn-primary">Apply Filters</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {broadcastedLoads.length === 0 && (
          <div style={{ padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
            No broadcasted loads available right now.
          </div>
        )}
        <div style={{ flex: 1 }}>
          <MapWidget points={mapPoints} center={center as [number, number]} zoom={5} height="100%" />
        </div>
      </div>
    </div>
  );
}
