import React from 'react';
import styles from './HittingLeaders.module.scss';

export default function Bar({
  data,
  showDescription,
  description,
  onClick,
  x,
  y,
  width,
  height,
}) {
  const [hoverState, setHoverState] = React.useState(false);

  return (
    <g>
      <rect
        className={styles.Bar}
        x={x(data)}
        y={y(data)}
        height={height(data)}
        width={width(data)}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        onClick={onClick}
      />

      {(hoverState || showDescription) && (
        <text x={x(data)} y={y(data)} className={styles.BarDescription}>
          {description(data)}
        </text>
      )}
    </g>
  );
}
