import { useMemo, useState } from 'react';
import MapView from './components/MapView';
import Hero from './components/Hero';
import LocalityDrawer from './components/LocalityDrawer';
import ClaimAssistant from './components/ClaimAssistant';
import MethodologyNote from './components/MethodologyNote';
import { localitiesWithTotals } from './data/localities';

export default function App() {
  const localities = useMemo(() => localitiesWithTotals(), []);
  const [selectedId, setSelectedId] = useState(null);
  const [visible, setVisible] = useState(localities);
  const [claimScheme, setClaimScheme] = useState(null);

  const selectedLocality = localities.find((l) => l.id === selectedId) ?? null;
  const visibleTotal = visible.reduce((sum, l) => sum + l.unclaimed, 0);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg font-body">
      <MapView
        localities={localities}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onVisibleChange={setVisible}
      />

      <Hero visibleTotal={visibleTotal} visibleCount={visible.length} />

      <MethodologyNote />

      <LocalityDrawer
        locality={selectedLocality}
        onClose={() => setSelectedId(null)}
        onStartClaim={(scheme) => setClaimScheme(scheme)}
      />

      {claimScheme && (
        <ClaimAssistant
          scheme={claimScheme}
          locality={selectedLocality}
          onClose={() => setClaimScheme(null)}
        />
      )}
    </div>
  );
}