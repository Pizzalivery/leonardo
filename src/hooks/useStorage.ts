import { useEffect, useState } from "react";

export function useStorage<T>(key: string, initialValue: T) {
  const [storageValue, setStorageValue] = useState(() => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue] as const;
}
