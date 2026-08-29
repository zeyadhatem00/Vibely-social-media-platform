import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import MarkAll from "./MarkAll";
import { TriangleExclamationFill } from "@gravity-ui/icons";

export default function Notifications() {
  let { token } = useContext(authcontext);
  let navigate = useNavigate();
  function getNOTIfications() {
    return axios.get(`${baseurl}/notifications?unread=false&page=1&limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryFn: getNOTIfications,
    queryKey: ["notifications"],
    select: (data) => {
      return data?.data.data.notifications;
    },
  });

  return (
    <div className="h-screen">
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-16">
          {/* page header */}
          <div className="pt-8 pb-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              Stay in the loop
            </div>
            <h1 className="mt-2 text-4xl font-medium tracking-tight text-slate-900">
              Notifications
              <br />
              <em className="font-serif text-3xl text-emerald-700">for you.</em>
            </h1>
          </div>

          {/* filter tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition 
              
                bg-emerald-900 text-white
           
            `}
            >
              All
              <span className="grid h-4 min-w-4 place-items-center rounded-full bg-lime-200 px-1 text-[10px] font-bold text-slate-900">
                {data?.length}
              </span>
            </button>

            <MarkAll />
          </div>

          {/* list */}
          {isError ? (
            <div className=" py-32   flex flex-col gap-2 items-center justify-center">
              <TriangleExclamationFill className="size-10 text-red-600" />
              <p className="text-black font-medium text-lg">
                There is an error please reload the page
              </p>
            </div>
          ) : data?.length == 0 ? (
            <div className="mt-4 flex min-h-96 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
              {/* icon tile */}
              <div className="relative">
                <div className="grid h-20 w-20 rotate-[-8deg] place-items-center rounded-3xl bg-lime-200 shadow-sm">
                  <Bell size={36} className="text-slate-900" />
                </div>
                {/* floating dots */}
                <span className="absolute -right-3 -top-2 h-3 w-3 rounded-full bg-emerald-400/70" />
                <span className="absolute -left-4 top-4 h-2 w-2 rounded-full bg-lime-300" />
                <span className="absolute -bottom-2 right-6 h-2.5 w-2.5 rounded-full bg-emerald-200" />
              </div>

              <h2 className="mt-8 text-3xl font-medium tracking-tight text-slate-900">
                All caught up,
                <br />
                <em className="font-serif text-2xl text-emerald-700">
                  nothing new.
                </em>
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                When someone likes, comments or follows you, it will show up
                right here.
              </p>

              <Link
                to="/Home"
                className="mt-8 flex cursor-pointer items-center gap-3 rounded-xl bg-emerald-900 px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Explore posts <span className="text-lg font-normal">→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {isLoading ? (
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
                data.map((noti: any) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/postdetails/${noti.entity._id}`);
                      }}
                      key={noti._id}
                      className={`flex items-start gap-3 cursor-pointer rounded-2xl p-4 transition border-2 border-lime-200 bg-lime-50/60`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={noti.actor.photo}
                          className="h-11 w-11 rounded-full object-cover"
                          alt=""
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full text-[10px] text-white 
                 bg-emerald-700
                  `}
                        >
                          {noti.type === "like_post" && "👍"}
                          {noti.type === "share_post" && "↗️"}
                          {noti.type === "comment_post" && "💬"}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className={`text-sm leading-6`}>
                          <strong>{noti.actor.name}</strong>{" "}
                          {noti.type === "like_post" && "liked your post"}
                          {noti.type === "share_post" && "shared your post"}
                          {noti.type === "comment_post" && (
                            <span className="  text-slate-500">
                              <strong>commented:</strong>"
                              {noti.entity.topComment?.content}"
                            </span>
                          )}{" "}
                        </p>
                        {noti.entity.body && (
                          <p className="mt-1 pl-2.5  line-clamp-1 text-xs text-slate-400">
                            {noti.entity.body}
                          </p>
                        )}
                      </div>

                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
