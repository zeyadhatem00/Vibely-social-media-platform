import { Post } from "../../components/Posts/PostLayout";
import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { BeatLoader } from "react-spinners";
import { TriangleExclamationFill } from "@gravity-ui/icons";

import type { post } from "../../components/interface/postinterface";
import { Link } from "react-router-dom";
import { userdatacontext } from "./../../context/Userdatacntext";
import { useQuery } from "@tanstack/react-query";
import Createpost from "../../components/Posts/Createpost";
import FollowSuggestions from "../../components/Posts/Followsuggestion";

export default function Home() {
  let { token } = useContext(authcontext);

  let { userData } = useContext(userdatacontext);

  async function getposts() {
    return await axios.get(`${baseurl}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let { data, isError, isLoading } = useQuery({
    queryFn: getposts,
    queryKey: ["allposts"],
    select: (data) => {
      return data?.data.data.posts;
    },
  });

  if (isError) {
    return (
      <>
        <div className=" w-full  absolute top-[50%] -translate-y-1/2   flex flex-col gap-2 items-center justify-center">
          <TriangleExclamationFill className="size-10 text-red-600" />
          <p className="text-black font-medium text-lg">
            There is an error please reload the page
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section id="home" className="bg-stone-50 min-h-screen text-slate-900">
          <main className="mx-auto relative grid max-w-7xl gap-10 px-4 md:px-6  py-12 lg:grid-cols-[13rem_minmax(0,40rem)_18rem]">
            <aside className="hidden lg:block h-fit lg:sticky lg:top-20">
              <div className="overflow-hidden  rounded-2xl border border-slate-200 bg-white text-center">
                <div className="h-14 bg-linear-to-r from-lime-200 via-lime-200 to-lime-200" />
                <img
                  src={
                    userData?.photo
                      ? userData.photo
                      : "https://cdn-icons-png.flaticon.com/128/456/456212.png"
                  }
                  alt="Alex Morgan"
                  className="mx-auto -mt-8 h-16 w-16 rounded-full border-4 border-white object-cover"
                />
                <strong className="mt-2 block text-sm">{userData?.name}</strong>
                <span className="text-[10px] text-slate-400">
                  {userData?.email}
                </span>
                <div className="my-4 flex justify-center gap-5 border-t border-slate-100 pt-4 text-[10px]">
                  <Link
                    to={"/Profile"}
                    className=" text-[10px] font-bold text-emerald-800"
                  >
                    View profile →
                  </Link>
                </div>
              </div>
            </aside>

            <section className="min-w-0 ">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400">
                    YOUR SPACE
                  </span>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                    Hello, {userData?.name.trim().split(/\s+/)[0]}{" "}
                    <span className="text-orange-400">✦</span>
                  </h1>
                </div>
              </div>

              <Createpost />

              {isLoading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <BeatLoader />
                </div>
              ) : (
                data.map((post: post) => {
                  return <Post {...post} singlepost={false} key={post._id} />;
                })
              )}
            </section>

            <div className="hidden lg:block">
              <FollowSuggestions />
            </div>
          </main>
        </section>
      </>
    );
  }
}
