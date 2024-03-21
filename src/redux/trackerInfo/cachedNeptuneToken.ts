const neptuneTokenKey = 'CACHED-NEPTUNE-TOKEN';

export const getCachedNeptuneToken = (): string | null => {
  const data = localStorage.getItem(neptuneTokenKey);
  return data;
};

export const setCachedNeptuneToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(neptuneTokenKey, token);
  } else {
    localStorage.removeItem(neptuneTokenKey);
  }
};
