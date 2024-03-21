const jwtKey = 'CACHED-TOKEN';

export const getCachedToken = (): string | null => {
  const data = localStorage.getItem(jwtKey);
  return data;
};

export const setCachedToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(jwtKey, token);
  } else {
    localStorage.removeItem(jwtKey);
  }
};
