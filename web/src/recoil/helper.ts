import { AtomEffect, DefaultValue } from "recoil";

interface PersistenceOptions<T> {
  key: string;
  restorer: (value: T, defaultValue: DefaultValue) => T | DefaultValue;
}

export const localStorageEffect = <T>(
  options: PersistenceOptions<T>
): AtomEffect<T> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(options.key);
  if (savedValue != null) {
    setSelf(options.restorer(JSON.parse(savedValue), new DefaultValue()));
  }

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(options.key);
    } else {
      localStorage.setItem(options.key, JSON.stringify(newValue));
    }
  });
};
