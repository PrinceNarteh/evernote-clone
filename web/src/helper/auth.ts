import jwtDecode, { JwtPayload } from "jwt-decode";
import storage from "local-storage-fallback";

const TOKEN = "TakingNote-jwt";
export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);

export const isAuthenticated = (): boolean => {
  const token = getToken();
  console.log(token);
  if (!token) return false;

  try {
    const { exp }: JwtPayload = jwtDecode(token);
    if (Date.now() >= exp! * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
