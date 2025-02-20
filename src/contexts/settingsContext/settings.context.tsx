/* eslint-disable no-restricted-imports */
import { defaultStorage } from '@moneyboy/contexts/storageContext';
import { useStorage } from '@moneyboy/hooks/useStorage';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';

type Settings = {
  theme: ColorSchemeName;
  useSystemTheme: boolean;
};

export type SettingsContextType = {
  set<T extends keyof Settings>(key: T, value: Settings[T]): void;
} & Settings;

export const SettingsContext = createContext<SettingsContextType>({
  set<T extends keyof Settings>(_key: T, _value: Settings[T]): void {
    //
  },
  theme: defaultStorage.theme,
  useSystemTheme: defaultStorage.useSystemTheme,
});

type SettingsContextProviderProps = unknown;

export const SettingsContextProvider: React.FC<PropsWithChildren<SettingsContextProviderProps>> = ({ children }) => {
  // TODO lome: merge Settings into one storage entity (maybe)
  const [theme, setTheme] = useStorage('theme');
  const [useSystemTheme, setUseSystemTheme] = useStorage('useSystemTheme');

  // store all Settings in state
  const [settings, setSettings] = useState<Settings>({
    theme,
    useSystemTheme,
  });

  // on storage updates (mostly at app startup), update setting state
  useEffect(() => {
    setSettings({ theme, useSystemTheme });
  }, [theme, useSystemTheme]);

  function set<T extends keyof Settings>(key: T, value: Settings[T]): void {
    // update setting state
    // TODO lome: do we need this?
    setSettings(currentSettings => {
      const newSettings = {
        ...currentSettings,
      };
      newSettings[key] = value;
      return newSettings;
    });

    // switch through key and update corresponding storage
    switch (key) {
      case 'theme':
        setTheme(value as Settings['theme']);
        break;

      case 'useSystemTheme':
        setUseSystemTheme(value as Settings['useSystemTheme']);
        break;

      default:
    }
  }

  const value = {
    set,
    ...settings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
