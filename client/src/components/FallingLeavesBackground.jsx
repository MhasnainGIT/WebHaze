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
      count={25}
      size={[14, 28]}
      speed={[0.5, 1.2]}
      wind={[-0.3, 0.7]}
      sway={[0.4, 1.2]}
      rotationSpeed={[-1.5, 1.5]}
      opacity={0.75}
      shapes={['maple', 'oak', 'ginkgo']}
      colors={[
        '#D4621A',
        '#E8832A',
        '#C4501A',
        '#F0A040',
        '#B84010',
        '#E06020',
        '#A03010',
        '#F0C060',
      ]}
      zIndex={50}
    />
  );
};

export default FallingLeavesBackground;
