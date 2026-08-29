import { createContext, useContext, type ReactNode } from "react";
import { type userDataShape } from "./../components/interface/userdatainterface";
import axios from "axios";
import { baseurl } from "./../const/env";
import { authcontext } from "./authcontext";
import { useQuery } from "@tanstack/react-query";

type data = {
  userData: userDataShape | null;
};

export const userdatacontext = createContext<data>({
  userData: null,
});

export function Userdataprovide({ children }: { children: ReactNode }) {
  let { token } = useContext(authcontext);

  function getdata() {
    return axios.get(`${baseurl}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let { data: userData } = useQuery({
    queryFn: getdata,
    queryKey: ["userData"],
    enabled: !!token,
    select: (data) => data?.data.data.user,
  });

  return (
    <userdatacontext.Provider value={{ userData }}>
      {children}
    </userdatacontext.Provider>
  );
}
