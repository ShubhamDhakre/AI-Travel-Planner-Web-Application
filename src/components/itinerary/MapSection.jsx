import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Compass } from 'lucide-react';

// Custom colored leaflet marker icon
const createNumberedIcon = (number) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: #0F243E;
        color: white;
        border: 2px solid #FF5A36;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        ${number}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

export const MapSection = ({ itinerary = [], destinationName = 'Destination' }) => {
  const points = itinerary
    .filter((d) => d.coordinates && d.coordinates.lat && d.coordinates.lng)
    .map((d) => ({
      day: d.day,
      title: d.title,
      theme: d.theme,
      places: [
        ...(d.morning?.places || []),
        ...(d.afternoon?.places || []),
        ...(d.evening?.places || []),
      ].join(', '),
      cost: d.dailyEstimatedBudget,
      lat: d.coordinates.lat,
      lng: d.coordinates.lng,
    }));

  const defaultCenter = points.length > 0
    ? [points[0].lat, points[0].lng]
    : [35.0116, 135.7681]; // Kyoto fallback

  const polylineCoords = points.map((p) => [p.lat, p.lng]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-navy-950 font-sans flex items-center gap-2">
            <Navigation className="w-5 h-5 text-turquoise-600" />
            Interactive Route & Locations
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore daily stops and scenic routes plotted for {destinationName}.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 bg-turquoise-50 text-turquoise-700 rounded-full border border-turquoise-100 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {points.length} Itinerary Stops
        </span>
      </div>

      <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative z-0">
        <MapContainer
          center={defaultCenter}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((point) => (
            <Marker
              key={point.day}
              position={[point.lat, point.lng]}
              icon={createNumberedIcon(point.day)}
            >
              <Popup>
                <div className="p-1 max-w-[220px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coral-600">
                    Day {point.day} Stop
                  </span>
                  <h5 className="text-xs font-bold text-navy-950 mt-0.5">{point.title}</h5>
                  {point.places && (
                    <p className="text-[11px] text-slate-600 mt-1">
                      <strong>Places:</strong> {point.places}
                    </p>
                  )}
                  {point.cost > 0 && (
                    <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                      Est. Day Budget: ${point.cost}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {polylineCoords.length > 1 && (
            <Polyline
              positions={polylineCoords}
              color="#06B6D4"
              weight={3}
              dashArray="6, 8"
              opacity={0.8}
            />
          )}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 px-1">
        <span>Click any numbered pin to inspect scheduled places</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-turquoise-500 rounded"></span> Suggested Travel Trajectory
        </span>
      </div>
    </div>
  );
};

export default MapSection;
