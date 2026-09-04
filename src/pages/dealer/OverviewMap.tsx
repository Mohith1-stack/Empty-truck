import { useState } from 'react';
import { Crosshair } from 'lucide-react';
import MapWidget from '../../components/MapWidget';
import { useAuthStore } from '../../store/authStore';

export default function OverviewMap() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const { users } = useAuthStore();

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
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

  // Combine real drivers with user location marker
  const activeDrivers = users.filter((u: any) => u.role === 'driver' && u.isOpenToWork && u.lat && u.lng);
  
  const mapPoints: any[] = activeDrivers.map((driver: any) => ({
    id: driver.id,
    lat: driver.lat,
    lng: driver.lng,
    type: driver.timeToEmptyMins === 0 ? 'available' : 'default',
    label: `${driver.name} - ${driver.status}`,
    details: {
      driver: driver.name,
      vehicle: driver.vehicle,
      status: driver.status,
      capacity: driver.capacityStr,
      eta: driver.timeToEmptyMins === 0 ? '0 mins' : `${driver.timeToEmptyMins} mins`,
      journey: driver.journey
    }
  }));
  
  if (userLocation) {
    // If testing on the exact same device, coordinates perfectly overlap and hide each other.
    // We add a visual offset so both the truck and the dealer home icon can be seen.
    const hasExactOverlap = activeDrivers.some((d: any) => d.lat === userLocation[0] && d.lng === userLocation[1]);
    const offsetLat = hasExactOverlap ? userLocation[0] - 0.05 : userLocation[0];
    const offsetLng = hasExactOverlap ? userLocation[1] - 0.05 : userLocation[1];

    mapPoints.push({
      id: 'user',
      lat: offsetLat,
      lng: offsetLng,
      type: 'home',
      label: 'Your Location'
    });
  }

  const center = userLocation ? userLocation : [20.5937, 78.9629]; // Center of India by default
  const zoom = 5; // Keep zoom at 5 to show all of India

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 4rem)' }}>
      <div className="flex-between">
        <div>
          <h2>Overview Map</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Live view of all empty trucks on duty</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleLocateMe} disabled={isLocating}>
            <Crosshair size={18} /> {isLocating ? 'Locating...' : (userLocation ? 'GPS Active' : 'Use My GPS')}
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <MapWidget points={mapPoints} center={center as [number, number]} zoom={zoom} height="100%" />
      </div>
    </div>
  );
}
