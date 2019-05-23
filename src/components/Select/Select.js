import React from 'react';
import styles from './Select.module.scss';

export default function Select({
  children,
  placeholder = null,
  value,
  onChange,
  ...props
}) {
  return (
    <div className={styles.SelectContainer}>
      <select
        className={styles.Select}
        value={value || '__PLACEHOLDER__'}
        onChange={(event) => {
          const value = event.target.value;

          if (value === '__PLACEHOLDER__') onChange(null);

          onChange(value);
        }}
        {...props}
      >
        {placeholder && (
          <option value="__PLACEHOLDER__" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
}
