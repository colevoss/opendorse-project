import { useEffect, useState, useRef } from 'react';

export default function useSize(ref) {
  const observer = useRef();
  const [size, setSize] = useState({ height: null, width: null });

  useEffect(() => {
    const observe = (entries) => {
      const { height, width } = entries[0].contentRect;
      setSize(() => ({ height, width }));
    };

    observer.current = new ResizeObserver(observe);

    return () => observer.current.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (el) {
      observer.current.observe(el);
    }

    return () => observer.current.unobserve(el);
  }, [observer, ref]);

  return size;
}
