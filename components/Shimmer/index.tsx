import styled from 'styled-components';

import style from './style';

interface ShimmerProps {
  className?: string;
}

function Shimmer({ className }: ShimmerProps) {
  return (
    <div className={className} aria-label="載入中">
      <div className="shimmer-frame">
        <div className="shimmer" />
      </div>
    </div>
  );
}

export default styled(Shimmer)`
  ${style}
`;
