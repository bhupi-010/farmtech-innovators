// useLocalStorage.js
import { useState } from 'react';

function safeJSONParse(str: string, key: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    window.localStorage.removeItem(key);
    window.localStorage.removeItem('token');
    window.document.location.reload();
    return str; // Or return undefined, or handle the error as needed
  }
}

export const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? safeJSONParse(item, key) : initialValue;
    } catch (error) {
      console.error('Error loading data from local storage:', error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  return [storedValue, setValue];
};

export const useClearLocalStorage = () => {
  const clearLocalStorage = () => {
    return localStorage.clear();
  };
  return clearLocalStorage;
};
