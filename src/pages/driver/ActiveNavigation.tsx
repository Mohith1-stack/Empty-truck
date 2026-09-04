import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MapWidget from '../../components/MapWidget';
import { Navigation, Clock, MapPin, CheckCircle, Zap, XCircle } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

const geocode = async (query: string): Promise<[number, number] | null> => {
  if (!query || query.includes('Required by')) return null;
  if (query.toLowerCase().includes('dealer hub')) return [18.5204, 73.8567]; // Fallback for dealer broadcasts
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (err) {
    console.error("Geocoding failed", err);
  }
  return null;
};

export default function ActiveNavigation() {
  const navigate = useNavigate();
  const { activeOrder: order, cancelOrder, completeOrder } = useOrderStore();
  const { currentUser, updateUserOperationalData } = useAuthStore();
  
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  
  const [isTracking, setIsTracking] = useState(false);
  const [liveLocation, setLiveLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState('');

  const [fromCoord, setFromCoord] = useState<[number, number]>([19.0760, 72.8777]);
  const [toCoord, setToCoord] = useState<[number, number]>([18.5204, 73.8567]);
  const initialRouteFetched = useRef(false);

  useEffect(() => {
    let watchId: number;
    if (isTracking) {
      if (!('geolocation' in navigator)) {
        setLocationError('Geolocation is not supported by your browser.');
        return;
      }
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setLiveLocation([pos.coords.latitude, pos.coords.longitude]);
          setLocationError('');
          if (currentUser?.id) {
            updateUserOperationalData(currentUser.id, {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              location: 'En Route',
              journey: `${order?.from || 'Pickup'} to ${order?.to || 'Dropoff'}`,
              status: 'In Transit',
              timeToEmptyMins: 45
            });
          }
        },
        (err) => {
          console.error(err);
          setLocationError('Failed to fetch GPS location. Please allow location permissions.');
          setIsTracking(false);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      setLiveLocation(null);
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking]);

  useEffect(() => {
    if (!order) return;
    if (initialRouteFetched.current) return;
    
    const fetchRoute = async () => {
      try {
        let startPoint: [number, number] = [19.0760, 72.8777];
        let endPoint: [number, number] = [18.5204, 73.8567];
        
        if (order.isCharity) {
          // Charity routes: Driver's location -> Pickup Point
          if (liveLocation) {
            startPoint = liveLocation;
          } else if (currentUser?.lat != null && currentUser?.lng != null) {
            startPoint = [currentUser.lat, currentUser.lng];
          } else {
            startPoint = [19.0760, 72.8777];
          }
          const geoEnd = await geocode(order.from);
          if (geoEnd) endPoint = geoEnd;
        } else {
          // Regular routes: Pickup -> Dropoff
          const geoStart = await geocode(order.from);
          if (geoStart) startPoint = geoStart;
          const geoEnd = await geocode(order.to);
          if (geoEnd) endPoint = geoEnd;
        }

        setFromCoord(startPoint);
        setToCoord(endPoint);
        
        // OSRM expects lon,lat
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`);
        const data = await res.json();
        
        if (data.routes && data.routes[0]) {
          const route = data.routes[0];
          // GeoJSON coords are [lon, lat], leaflet expects [lat, lon]
          const path = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          setRoutePath(path);
          setDistance((route.distance / 1000).toFixed(1) + ' km');
          
          const hrs = Math.floor(route.duration / 3600);
          const mins = Math.floor((route.duration % 3600) / 60);
          setDuration(`${hrs}h ${mins}m`);
          initialRouteFetched.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch route", err);
      }
    };
    
    fetchRoute();
  }, [order, liveLocation]);

  if (!order) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>No Active Journey</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>You don't have any active deliveries.</p>
        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/driver/inbox')}>View Order Inbox</button>
      </div>
    );
  }

  const mapCenter = liveLocation ? liveLocation : ([ (fromCoord[0] + toCoord[0])/2, (fromCoord[1] + toCoord[1])/2 ] as [number, number]);

  const mapPoints: any[] = [
    { id: 'start', lat: fromCoord[0], lng: fromCoord[1], type: 'default' as const, label: order.isCharity ? 'Your Start Location' : `Pickup: ${order.from}` },
    { id: 'end', lat: toCoord[0], lng: toCoord[1], type: 'available' as const, label: order.isCharity ? `Pickup: ${order.from}` : `Dropoff: ${order.to}` }
  ];

  if (liveLocation) {
    mapPoints.push({ id: 'live', lat: liveLocation[0], lng: liveLocation[1], type: 'truck' as const, label: 'Your Location' });
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 4rem)' }}>
      <div className="flex-between">
        <div>
          <h2>Active Navigation</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Delivery to {order.to}</p>
        </div>
        <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <CheckCircle size={16} /> Load Accepted
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        {/* Map Area */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <MapWidget points={mapPoints} route={routePath.length > 0 ? routePath : undefined} center={mapCenter} zoom={8} height="100%" />
          
          {/* Overlay Route Info */}
          {duration && (
            <div className="glass-panel" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(15, 15, 20, 0.85)' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%' }}>
                <Zap color="var(--accent-secondary)" size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Fastest Route</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>{duration}</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          
          {/* Journey Details */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Route Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border-color)' }}></div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="flex-center" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '2px solid var(--accent-primary)', zIndex: 1 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pickup Point</div>
                  <div style={{ fontWeight: 600 }}>{order.from}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="flex-center" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '2px solid var(--accent-secondary)', zIndex: 1 }}>
                  <MapPin size={12} color="var(--accent-secondary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dropoff Point</div>
                  <div style={{ fontWeight: 600 }}>{order.to}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/> Est. Time</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{duration || '...'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><Navigation size={12} style={{ display: 'inline', marginRight: '4px' }}/> Total Distance</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{distance || '...'}</div>
              </div>
            </div>
          </div>

          {/* Load Details */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Load Information</h3>
            <div className="badge badge-primary" style={{ alignSelf: 'flex-start' }}>{order.load}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dealer</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{order.dealer}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>{order.payment}</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          {locationError && <div style={{ color: 'var(--accent-danger)', fontSize: '0.875rem' }}>{locationError}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
            <button 
              className={`btn ${isTracking ? 'btn-secondary' : 'btn-success'}`} 
              style={{ width: '100%', padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
              onClick={() => setIsTracking(!isTracking)}
            >
              <Navigation size={20} />
              {isTracking ? 'Stop Live Navigation' : 'Start Live Navigation'}
            </button>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 2, padding: '1rem' }}
                onClick={() => {
                  completeOrder();
                  alert('Trip Completed Successfully!');
                  navigate('/driver/inbox');
                }}
              >
                Complete Trip
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1, padding: '1rem', display: 'flex', justifyContent: 'center' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this trip? It will be returned to the inbox.')) {
                    cancelOrder();
                    navigate('/driver/inbox');
                  }
                }}
                title="Cancel Trip"
              >
                <XCircle size={20} color="var(--accent-danger)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
