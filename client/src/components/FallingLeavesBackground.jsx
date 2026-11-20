import { useLocation } from 'react-router-dom';
import { FallingLeaves } from 'falling-leaves/react';

// Pages where the animation should be hidden
const EXCLUDED = ['/admin-nexus', '/dashboard', '/editor'];

const FallingLeavesBackground = () => {
  const { pathname } = useLocation();

  if (EXCLUDED.some(p => pathname.startsWith(p))) return null;

  return (
    <FallingLeaves
      fullScreen
      count={18}
      size={[10, 22]}
      speed={[0.4, 1.0]}
      wind={[-0.2, 0.6]}
      sway={[0.3, 1.0]}
      rotationSpeed={[-1.2, 1.2]}
      opacity={0.18}
      shapes={['maple', 'oak', 'ginkgo']}
      colors={[
        '#8B3A0F',
        '#6B2D0A',
        '#A0522D',
        '#7B3F00',
        '#5C2A00',
        '#9B4400',
        '#4A1A00',
        '#C46200',
      ]}
      zIndex={1}
    />
  );
};

export default FallingLeavesBackground;
