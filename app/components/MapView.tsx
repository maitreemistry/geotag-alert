// components/MapView.tsx
'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon paths (important for Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface Alert {
  id: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  type: string;
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  React.useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);
  return null;
}

export default function MapView({ alerts }: { alerts: Alert[] }) {
  const points = alerts.map(alert => [alert.latitude, alert.longitude] as [number, number]);

  return (
    <MapContainer
      center={points.length ? points[0] : [0, 0]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {alerts.map(alert => (
        <Marker key={alert.id} position={[alert.latitude, alert.longitude]}>
          <Popup>
            <div>
              <p><strong>Type:</strong> {alert.type}</p>
              <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
              <p><strong>Lat:</strong> {alert.latitude}</p>
              <p><strong>Lng:</strong> {alert.longitude}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <FitBounds points={points} />
    </MapContainer>
  );
}
