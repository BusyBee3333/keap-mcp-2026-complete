import { useState, useEffect } from 'react';

export function useDirtyState<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(JSON.stringify(value) !== JSON.stringify(initialValue));
  }, [value, initialValue]);

  const reset = () => {
    setValue(initialValue);
    setIsDirty(false);
  };

  return { value, setValue, isDirty, reset };
}
