import React from 'react';
import { line } from 'd3-shape';
import styles from './Stats.module.scss';

export default function Line({ data, x, y, ...props }) {
  const lineFn = line()
    .x(x)
    .y(y);

  const lineD = React.useMemo(() => {
    return lineFn(data);
  }, [lineFn, data]);

  return <path className={styles.Line} d={lineD} />;
}
