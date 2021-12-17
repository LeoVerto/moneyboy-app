import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import deasync from 'deasync';
import { useEffect, useState } from 'react';

/**
 * A simple wrapper around Async
 * @param key
 * @returns
 */
export function useStorage(key: string) {
  const { getItem, setItem, removeItem } = useAsyncStorage(key);

  const getItemSync = deasync<string | null>(cb => {
    getItem().then(val => cb(null, val));
  });

  const [state, setState] = useState<string | null>();

  useEffect(() => {
    const item = getItemSync();
    setState(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set(value: string) {
    setItem(value);
    setState(value);
  }

  function remove() {
    removeItem();
  }

  const item = new Proxy(
    {},
    {
      get() {
        return 'lol';
      },
    },
  );

  return [state, set, remove];
}
