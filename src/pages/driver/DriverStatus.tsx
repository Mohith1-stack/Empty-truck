import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function DriverStatus() {
  const { currentUser, updateUserOperationalData } = useAuthStore();
  
  const [isOpenToWork, setIsOpenToWork] = useState(currentUser?.isOpenToWork ?? true);
  const [isEmpty, setIsEmpty] = useState(currentUser?.isEmpty ?? true);
  const [capacity, setCapacity] = useState(currentUser?.capacityStr || '');
  const [loadDetails, setLoadDetails] = useState(currentUser?.loadDetails || '');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Sync state to global store
  useEffect(() => {
    if (currentUser?.id) {
      updateUserOperationalData(currentUser.id, {
        isOpenToWork,
        isEmpty,
        capacityStr: capacity,
        loadDetails: isEmpty ? 'Completely Empty' : (loadDetails || `Partial Load (${capacity} available)`),
        status: isEmpty ? 'Empty' : 'In Transit',
        timeToEmptyMins: isEmpty ? 0 : 120 // mock 2 hours until empty if they aren't empty
      });
    }
  }, [isOpenToWork, isEmpty, capacity, loadDetails, currentUser?.id]);

  // Sync location to global store
  useEffect(() => {
    let watchId: number;
    if (isSharingLocation && currentUser?.id) {
      if (!('geolocation' in navigator)) {
        setLocationError('Geolocation not supported');
        return;
      }
      let fetchedLocationName = 'Live Tracking Active';
      let hasFetchedName = false;

      watchId = navigator.geolocation.watchPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          if (!hasFetchedName) {
            hasFetchedName = true;
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
              const data = await res.json();
              const city = data.address?.city || data.address?.town || data.address?.county || '';
              const state = data.address?.state || '';
              if (city || state) {
                 fetchedLocationName = [city, state].filter(Boolean).join(', ');
              }
            } catch(e) {
              console.error("Reverse geocoding failed", e);
            }
          }

          updateUserOperationalData(currentUser.id, {
            lat: lat,
            lng: lng,
            location: fetchedLocationName
          });
          setLocationError('');
        },
        (err) => {
          console.error(err);
          setLocationError('Failed to share GPS');
          setIsSharingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    }
    
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isSharingLocation, currentUser?.id]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2>My Status</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Update your current working status and capacity</p>
        
        {locationError && (
          <div style={{ color: 'var(--accent-warning)', background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
            {locationError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <span style={{ fontWeight: 600 }}>Open to Work</span>
              <button 
                onClick={() => setIsOpenToWork(!isOpenToWork)}
                style={{ width: '48px', height: '24px', borderRadius: '12px', background: isOpenToWork ? 'var(--accent-secondary)' : 'var(--bg-tertiary)', position: 'relative', transition: 'all 0.2s ease' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isOpenToWork ? '26px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'all 0.2s ease' }}></div>
              </button>
            </div>
            
            <div className="flex-between">
              <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Share Live Location</span>
              <button 
                onClick={() => setIsSharingLocation(!isSharingLocation)}
                style={{ width: '48px', height: '24px', borderRadius: '12px', background: isSharingLocation ? 'var(--accent-primary)' : 'var(--bg-tertiary)', position: 'relative', transition: 'all 0.2s ease' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isSharingLocation ? '26px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'all 0.2s ease' }}></div>
              </button>
            </div>

            <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)'}}>
              <span style={{ fontWeight: 600 }}>Truck is Empty</span>
              <button 
                onClick={() => setIsEmpty(!isEmpty)}
                style={{ width: '48px', height: '24px', borderRadius: '12px', background: isEmpty ? 'var(--accent-secondary)' : 'var(--bg-tertiary)', position: 'relative', transition: 'all 0.2s ease' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isEmpty ? '26px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'all 0.2s ease' }}></div>
              </button>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Remaining Capacity (if not empty)</label>
              <input type="text" className="form-input" placeholder="e.g. 2 Tons" disabled={isEmpty} value={capacity} onChange={e => setCapacity(e.target.value)} />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Current Load Details</label>
              <input type="text" className="form-input" placeholder="What are you currently carrying?" disabled={isEmpty} value={loadDetails} onChange={e => setLoadDetails(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Report Issue</label>
              <select className="form-input" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <option value="">No Issues</option>
                <option value="breakdown">Vehicle Breakdown</option>
                <option value="delay">Traffic Delay</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
