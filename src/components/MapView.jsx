import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet.heat';
import * as L from 'leaflet';
import { formatINR } from '../utils/formatCurrency';
import { indiaSimplifiedBoundary } from '../data/indiaBoundaries';

const INDIA_CENTER = [21.5, 79.0];
const INDIA_ZOOM = 5;

function severityColor(unclaimed, max) {
  const t = max > 0 ? unclaimed / max : 0;
  if (t > 0.66) return '#E3573D';
  if (t > 0.33) return '#E8A33D';
  return '#0F6E6A';
}

function HeatmapLayer({ localities, maxUnclaimed }) {
  const map = useMap();
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const heatData = localities.map((loc) => {
      const intensity = loc.unclaimed / maxUnclaimed;
      return [loc.lat, loc.lng, intensity];
    });

    if (heatmapRef.current) {
      map.removeLayer(heatmapRef.current);
    }

    heatmapRef.current = L.heatLayer(heatData, {
      radius: 35,
      maxZoom: 12,
      max: 1.0,
      gradient: {
        0.0: 'rgba(15, 110, 106, 0)',
        0.15: 'rgba(15, 110, 106, 0.3)',
        0.3: 'rgba(15, 110, 106, 0.5)',
        0.45: 'rgba(232, 163, 61, 0.6)',
        0.6: 'rgba(232, 163, 61, 0.75)',
        0.75: 'rgba(227, 87, 61, 0.85)',
        0.9: 'rgba(227, 87, 61, 0.95)',
        1.0: 'rgba(227, 87, 61, 1)',
      },
      blur: 25,
    }).addTo(map);

    return () => {
      if (heatmapRef.current) {
        map.removeLayer(heatmapRef.current);
      }
    };
  }, [map, localities, maxUnclaimed]);

  return null;
}

function IndiaBoundary() {
  return (
    <GeoJSON
      data={indiaSimplifiedBoundary}
      style={() => ({
        color: '#0E2A2E',
        weight: 1.5,
        fillColor: '#0F6E6A',
        fillOpacity: 0.03,
        dashArray: '4, 4',
      })}
    />
  );
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
  }, [localities]);

  return null;
}

export default function MapView({ localities, selectedId, onSelect, onVisibleChange }) {
  const maxUnclaimed = useMemo(
    () => Math.max(...localities.map((l) => l.unclaimed), 1),
    [localities]
  );

  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={INDIA_ZOOM}
      minZoom={4}
      maxZoom={12}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={18}
      />
      <IndiaBoundary />
      <HeatmapLayer localities={localities} maxUnclaimed={maxUnclaimed} />
      <ViewportWatcher localities={localities} onVisibleChange={onVisibleChange} />
      {localities.map((loc) => {
        const isSelected = loc.id === selectedId;
        const radius = 8 + 16 * Math.sqrt(loc.unclaimed / maxUnclaimed);
        return (
          <CircleMarker
            key={loc.id}
            center={[loc.lat, loc.lng]}
            radius={radius}
            pathOptions={{
              color: isSelected ? '#0E2A2E' : severityColor(loc.unclaimed, maxUnclaimed),
              weight: isSelected ? 2 : 1,
              fillColor: severityColor(loc.unclaimed, maxUnclaimed),
              fillOpacity: isSelected ? 0.7 : 0.35,
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
  );
}