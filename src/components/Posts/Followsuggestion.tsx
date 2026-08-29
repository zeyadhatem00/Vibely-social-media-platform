import { useContext, useState } from "react";
import { Users, Search } from "lucide-react"; // or from @gravity-ui/icons
import axios from "axios";
import { baseurl } from "../../const/env";
import { authcontext } from "../../context/authcontext";
import { useQuery } from "@tanstack/react-query";
import Followbtn from "./Followbtn";
import { TriangleExclamationFill } from "@gravity-ui/icons";

export default function FollowSuggestions() {
  let { token } = useContext(authcontext);
  let [searchname, setname] = useState("");

  function getSuggetions() {
    return axios.get(`${baseurl}/users/suggestions?limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryFn: getSuggetions,
    queryKey: ["suggetions"],
    select: (data) => {
      return data?.data.data.suggestions;
    },
  });

  function search(e: any) {
    setname(e.target.value);
  }

  let resultsearch = data?.filter((follower: any) => {
    return follower.name
      .toLowerCase()
      .includes(searchname.trim().toLowerCase());
  });

  return (
    <div className="rounded-2xl lg:sticky overflow-hidden w-[90%] mx-auto mt-10 lg:m-0 lg:w-full lg:block   lg:top-20 border md:h-175 h-120  border-slate-200 bg-white p-5 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Users className="size-4.5 text-emerald-700" />
          Who to follow
        </div>
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime-200 px-1.5 text-[11px] font-bold text-slate-900">
          {resultsearch?.length}
        </span>
      </div>

      {/* search input */}
      <div className="mt-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-stone-50 px-3 py-2 transition focus-within:border-emerald-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-700/10">
          <Search className="size-4 shrink-0 text-slate-400" />
          <input
            id="search"
            onInput={search}
            placeholder="Search people to follow"
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {/* {query && (
            <button
              onClick={() => setquery("")}
              className="shrink-0 text-xs text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )} */}
        </div>
      </div>

      {/* suggestions */}
      {isError ? (
        <div className=" w-full h-full -translate-y-1/4 flex flex-col gap-2 items-center justify-center">
          <TriangleExclamationFill className="size-10 text-red-600" />
          <p className="text-black font-medium text-xs">
            There is an error please reload the page
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center py-36 justify-center w-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8  text-white animate-spin fill-emerald-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt-3 h-full pb-2.5 scrollbar-none overflow-y-auto space-y-1">
          {resultsearch.map((follower: any) => (
            <div
              key={follower._id}
              className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-stone-50"
            >
              <img
                src={follower.photo}
                className="h-10 w-10 rounded-full object-cover"
                alt=""
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {follower.name}
                </p>
              </div>
              <Followbtn id={follower._id} />
            </div>
          ))}
        </div>
      )}

      {/* empty state */}
      {resultsearch?.length === 0 && (
        <div className="py-6 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No people found
          </p>
          <p className="text-xs text-slate-400">Try a different name</p>
        </div>
      )}
    </div>
  );
}
