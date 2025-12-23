'use client';

import Link from 'next/link';
import styled from 'styled-components';

import style from './style';

interface EmptyProps {
  className?: string;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

function Empty({
  className,
  icon,
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyProps) {
  return (
    <div className={className}>
      <div className="empty-icon">{icon}</div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-description">{description}</p>
      <Link className="empty-btn" href={buttonLink}>
        {buttonText}
      </Link>
    </div>
  );
}

export default styled(Empty)`
  ${style}
`;
