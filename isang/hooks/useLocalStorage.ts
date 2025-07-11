
'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../app/context/AuthContext';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { currentUser } = useContext(AuthContext) || {};

  const readValue = () => {
    if (typeof window === 'undefined' || !currentUser) {
      return initialValue;
    }
    try {
      const userKey = `${key}_${currentUser.id}`;
      const item = window.localStorage.getItem(userKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === 'undefined' || !currentUser) {
      return;
    }

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const userKey = `${key}_${currentUser.id}`;
      window.localStorage.setItem(userKey, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”`, error);
    }
  };

  return [storedValue, setValue] as const;
}
