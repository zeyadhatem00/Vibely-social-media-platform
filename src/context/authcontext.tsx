import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
type auth = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const authcontext = createContext<auth>({
  token: null,
  setToken: () => undefined,
});

export function Authcontextprovider({ children }: { children: ReactNode }) {
  let [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  return (
    <authcontext.Provider value={{ token, setToken }}>
      {children}
    </authcontext.Provider>
  );
}
