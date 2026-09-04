import { useState } from 'react';
import { MapPin, Clock, ExternalLink, X, Navigation2, Crosshair } from 'lucide-react';
import MapWidget from '../../components/MapWidget';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

// Haversine distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

export default function DealerDashboard() {
  const [selectedTruck, setSelectedTruck] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const { addOrder } = useOrderStore();
  const { currentUser, users } = useAuthStore();

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

  const handleBookVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    addOrder({
      targetDriver: selectedTruck.driver,
      dealer: currentUser?.orgName || currentUser?.name || 'Unknown Dealer',
      load: `${formData.get('weight')} ${formData.get('type')}`,
      from: formData.get('pickup') as string,
      to: formData.get('drop') as string,
      payment: `₹${formData.get('payment')}`,
      profit: 'Direct Match',
      fuelEfficiency: 'N/A',
      duration: 'TBD',
      isCharity: false
    });
    alert(`Request sent to driver ${selectedTruck.driver}!`);
    setSelectedTruck(null);
  };

  const activeDrivers = users.filter((u: any) => u.role === 'driver' && u.isOpenToWork && u.lat && u.lng);

  const processedTrucks = activeDrivers
    .map((driverUser: any) => {
      return {
        id: driverUser.id,
        driver: driverUser.name,
        vehicle: driverUser.vehicle || 'Unknown Vehicle',
        location: driverUser.location || 'Unknown Location',
        journey: driverUser.journey || 'Available',
        status: driverUser.status || 'Empty',
        eta: driverUser.timeToEmptyMins === 0 ? '0 mins' : `${driverUser.timeToEmptyMins} mins`,
        proximity: 0,
        loadCapacity: driverUser.capacityStr || 'Unknown',
        timeToEmptyMins: driverUser.timeToEmptyMins || 0,
        loadDetails: driverUser.loadDetails || 'Unknown',
        lat: driverUser.lat,
        lng: driverUser.lng
      };
    })
    .filter((t: any) => t.timeToEmptyMins <= 120)
    .map((truck: any) => {
      const distance = userLocation ? calculateDistance(userLocation[0], userLocation[1], truck.lat, truck.lng) : null;
      return { ...truck, calculatedDistance: distance };
    })
    // Distance filter removed to allow visibility of drivers across India
    .sort((a: any, b: any) => {
      if (a.calculatedDistance !== null && b.calculatedDistance !== null) {
        return a.calculatedDistance - b.calculatedDistance;
      }
      return 0;
    });

  return (
    <>
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="flex-between">
        <div>
          <h1>Truck Suggestions</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Empty or soon-to-be-empty trucks near your loads</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleLocateMe} disabled={isLocating}>
            <Crosshair size={18} /> {isLocating ? 'Locating...' : (userLocation ? 'GPS Active' : 'Use My GPS')}
          </button>
        </div>
      </div>

      {!userLocation && (
        <div style={{ padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-warning)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
          Click "Use My GPS" to see your location and calculate distance to available trucks across India. Showing all available trucks currently.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {processedTrucks.map((truck: any) => (
          <div key={truck.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                  <span style={{ fontWeight: 600 }}>{truck.driver.charAt(0)}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem' }}>{truck.driver}</h3>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{truck.vehicle}</div>
                </div>
              </div>
              <div className={`badge ${truck.status === 'Empty' ? 'badge-success' : 'badge-warning'}`}>
                {truck.status}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Current Journey</div>
                <div style={{ fontSize: '0.875rem' }}>{truck.journey}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Distance</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {truck.calculatedDistance !== null ? `${truck.calculatedDistance.toFixed(1)} km away` : 'Unknown (Enable GPS)'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Current Location</div>
                <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} color="var(--text-secondary)" /> {truck.location}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Time to Empty</div>
                <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} color="var(--text-secondary)" /> {truck.eta}
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setSelectedTruck(truck)}>
              Inspect and Match <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
      </div>

      {/* Inspect and Match Modal */}
      {selectedTruck && (() => {
        const loadLat = userLocation ? userLocation[0] : 18.5204;
        const loadLng = userLocation ? userLocation[1] : 73.8567;
        const truckLat = selectedTruck.lat;
        const truckLng = selectedTruck.lng;
        const centerLat = (loadLat + truckLat) / 2;
        const centerLng = (loadLng + truckLng) / 2;
        const dynamicRoute = [[loadLat, loadLng], [truckLat, truckLng]] as [number, number][];

        return (
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: '280px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
              
              {/* Map Placeholder Side */}
              <div style={{ background: 'var(--bg-secondary)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                <div>
                  <h2>{selectedTruck.driver} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>{selectedTruck.vehicle}</span></h2>
                  <div style={{ color: 'var(--text-secondary)' }}>Current Journey: {selectedTruck.journey}</div>
                </div>
                
                <MapWidget points={[
                  { id: 1, lat: loadLat, lng: loadLng, type: 'home', label: 'Your Load Location' },
                  { id: 2, lat: truckLat, lng: truckLng, type: 'truck', label: 'Truck Current Location', details: {
                    driver: selectedTruck.driver,
                    vehicle: selectedTruck.vehicle,
                    status: selectedTruck.status,
                    capacity: selectedTruck.loadCapacity,
                    eta: selectedTruck.eta,
                    journey: selectedTruck.journey
                  }}
                ]} route={dynamicRoute} center={[centerLat, centerLng]} zoom={6} height="200px" />

              <div className="glass-card" style={{ padding: '1rem' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Current Load Status</div>
                <div style={{ fontWeight: 600, color: selectedTruck.timeToEmptyMins === 0 ? 'var(--accent-secondary)' : 'var(--accent-warning)' }}>
                  {selectedTruck.loadDetails}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Time to Reach You</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>45 mins</div>
                </div>
                {selectedTruck.timeToEmptyMins > 0 && (
                  <div className="glass-card" style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Time till Empty</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{selectedTruck.eta}</div>
                  </div>
                )}
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Est. Unload Time</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>30 mins</div>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Toll Delay</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>5 mins</div>
                </div>
              </div>
              
              <div className="glass-card" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Total Time Before Available</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {selectedTruck.timeToEmptyMins === 0 ? '45 mins' : `${selectedTruck.timeToEmptyMins + 45 + 30 + 5} mins`}
                </div>
              </div>
            </div>

            {/* Booking Side */}
            <form onSubmit={handleBookVehicle} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="flex-between">
                <h2>Book Vehicle</h2>
                <button type="button" onClick={() => setSelectedTruck(null)} style={{ color: 'var(--text-muted)' }}><X /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
                <div className="form-group">
                  <label className="form-label">Load Weight</label>
                  <input name="weight" type="text" className="form-input" placeholder="e.g. 5 Tons" defaultValue={selectedTruck.loadCapacity} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Load Type</label>
                  <input name="type" type="text" className="form-input" placeholder="e.g. Perishable, Electronics" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Pickup Location</label>
                  <div style={{ position: 'relative' }}>
                    <Navigation2 size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)' }} />
                    <input name="pickup" type="text" className="form-input" placeholder="Current Load Location" style={{ paddingLeft: '2.25rem' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Drop Destination</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-danger)' }} />
                    <input name="drop" type="text" className="form-input" placeholder="Where the load has to reach" style={{ paddingLeft: '2.25rem' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Payment (INR)</label>
                  <input name="payment" type="number" className="form-input" placeholder="₹0.00" required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Submit Request
              </button>
            </form>

          </div>
        </div>
      );
      })()}
    </>
  );
}
