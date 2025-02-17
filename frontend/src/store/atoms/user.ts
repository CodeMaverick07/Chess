import { atom, selector } from "recoil";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export interface User {
  token: string;
  id: string;
  name: string;
}

export const userAtom = atom<User>({
  key: "user",
  default: selector({
    key: "user/default",
    get: async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure this is set to 'include'
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
  }),
});
