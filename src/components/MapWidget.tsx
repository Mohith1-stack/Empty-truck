import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons if needed, but we'll use custom divIcons
type Point = {
  id: string | number;
  lat: number;
  lng: number;
  type?: 'available' | 'urgent' | 'truck' | 'default' | 'home';
  label?: string;
  details?: {
    driver?: string;
    vehicle?: string;
    capacity?: string;
    status?: string;
    eta?: string;
    journey?: string;
  };
};

type MapWidgetProps = {
  points?: Point[];
  center?: [number, number];
  zoom?: number;
  route?: [number, number][];
  height?: string;
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, map.getZoom() || zoom);
  return null;
}

export default function MapWidget({ 
  points = [], 
  center = [18.5204, 73.8567], // Default to Pune
  zoom = 7,
  route,
  height = '400px'
}: MapWidgetProps) {

  // Create custom marker icons based on type
  const getIcon = (type: string = 'default') => {
    let bgColor = 'var(--accent-primary)';
    let shadowColor = 'var(--accent-primary)';
    
    if (type === 'available') {
      bgColor = 'var(--accent-secondary)';
      shadowColor = 'var(--accent-secondary)';
    } else if (type === 'urgent') {
      bgColor = 'var(--accent-danger)';
      shadowColor = 'var(--accent-danger)';
    } else if (type === 'truck') {
      bgColor = '#f59e0b'; // Amber for active truck
      shadowColor = '#f59e0b';
    }

    if (type === 'home') {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="var(--bg-tertiary, #1e1e24)" stroke="var(--accent-primary, #3b82f6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: svg,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
    }

    const htmlString = `<div style="
      width: 16px; 
      height: 16px; 
      background-color: ${bgColor}; 
      border-radius: 50%; 
      box-shadow: 0 0 10px ${shadowColor};
      border: 2px solid white;
    "></div>`;

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: htmlString,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  return (
    <div style={{ height, width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', zIndex: 1 }}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark-map-tiles"
        />
        
        {points.map(pt => (
          <Marker key={pt.id} position={[pt.lat, pt.lng]} icon={getIcon(pt.type)}>
            {(pt.label || pt.details) && (
              <Popup>
                <div style={{ color: '#111', minWidth: '160px' }}>
                  {pt.details ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '2px' }}>
                        {pt.details.driver || pt.label}
                      </div>
                      {pt.details.vehicle && <div style={{ fontSize: '12px' }}><strong>Vehicle:</strong> {pt.details.vehicle}</div>}
                      {pt.details.status && <div style={{ fontSize: '12px' }}><strong>Status:</strong> {pt.details.status}</div>}
                      {pt.details.capacity && <div style={{ fontSize: '12px' }}><strong>Capacity:</strong> {pt.details.capacity}</div>}
                      {pt.details.eta && <div style={{ fontSize: '12px' }}><strong>ETA:</strong> {pt.details.eta}</div>}
                      {pt.details.journey && <div style={{ fontSize: '12px', marginTop: '4px', fontStyle: 'italic', color: '#666' }}>{pt.details.journey}</div>}
                    </div>
                  ) : (
                    <div>{pt.label}</div>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {route && route.length > 1 && (
          <Polyline 
            positions={route} 
            color="var(--accent-primary)" 
            weight={3} 
            dashArray="10, 10" 
          />
        )}
      </MapContainer>
    </div>
  );
}
