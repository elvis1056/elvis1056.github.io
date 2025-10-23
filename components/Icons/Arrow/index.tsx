interface ArrowProps {
  direction: 'up' | 'down' | 'left' | 'right';
  size?: number;
  color?: string;
  className?: string;
}

export default function Arrow({
  direction,
  size = 24,
  color = '#000',
  className,
}: ArrowProps) {
  const rotations = {
    up: 0,
    left: 90,
    down: 180,
    right: 270,
  };

  return (
    <svg
      className={className}
      fill="none"
      height={size}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
