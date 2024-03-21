export const createAuthHeader = (token: string) => ({ Authorization: `Bearer ${token}` });
