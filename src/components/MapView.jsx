import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { formatINR } from '../utils/formatCurrency';

const INDIA_CENTER = [21.5, 79.0];
const INDIA_ZOOM = 5;

function severityColor(unclaimed, max) {
  const t = max > 0 ? unclaimed / max : 0;
  if (t > 0.66) return '#E3573D'; // coral — worst gap
  if (t > 0.33) return '#E8A33D'; // marigold — moderate gap
  return '#0F6E6A'; // teal — smaller gap
}

function ViewportWatcher({ localities, onVisibleChange }) {
  const map = useMap();

  const recompute = () => {
    const bounds = map.getBounds();
    const visible = localities.filter((loc) => bounds.contains([loc.lat, loc.lng]));
    onVisibleChange(visible);
  };

  useMapEvents({
    moveend: recompute,
    zoomend: recompute,
  });

  useEffect(() => {
    recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localities]);

  return null;
}

export default function MapView({ localities, selectedId, onSelect, onVisibleChange }) {
  const maxUnclaimed = useMemo(
    () => Math.max(...localities.map((l) => l.unclaimed), 1),
    [localities]
  );
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="h-full w-full">
      <MapContainer
        center={INDIA_CENTER}
        zoom={INDIA_ZOOM}
        minZoom={4}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ViewportWatcher localities={localities} onVisibleChange={onVisibleChange} />
        {localities.map((loc) => {
          const isSelected = loc.id === selectedId;
          const radius = 10 + 22 * Math.sqrt(loc.unclaimed / maxUnclaimed);
          return (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={radius}
              pathOptions={{
                color: isSelected ? '#0E2A2E' : severityColor(loc.unclaimed, maxUnclaimed),
                weight: isSelected ? 3 : 1.5,
                fillColor: severityColor(loc.unclaimed, maxUnclaimed),
                fillOpacity: isSelected ? 0.75 : 0.55,
              }}
              eventHandlers={{ click: () => onSelect(loc.id) }}
            >
              <Tooltip direction="top" offset={[0, -radius]} opacity={1}>
                <span className="font-mono text-xs">
                  {loc.name} · {formatINR(loc.unclaimed, { compact: true })} unclaimed
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}