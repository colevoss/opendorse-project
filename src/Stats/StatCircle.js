import React from 'react';
import styles from './Stats.module.scss';

export default function StatCircle({
  data,
  x,
  y,
  showDescription,
  description,
  onClick,
}) {
  const [hoverState, setHoverState] = React.useState(false);

  return (
    <g>
      <circle
        className={styles.StatCircle}
        r="8"
        cx={x(data)}
        cy={y(data)}
        onClick={onClick}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      />

      {(hoverState || showDescription) && (
        <text className={styles.StatCircleDescription} x={x(data)} y={y(data)}>
          {description(data)}
        </text>
      )}
    </g>
  );
}
