import { useContext } from "react";
import { userdatacontext } from "../../context/Userdatacntext";
import axios from "axios";
import { baseurl } from "../../const/env";
import { authcontext } from "../../context/authcontext";
import { useQuery } from "@tanstack/react-query";
import { type post as postinterface } from "./../../components/interface/postinterface";
import { Post } from "../../components/Posts/PostLayout";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Changeprofilephoto from "../../components/Posts/Changeprofilephoto";
import ChangePass from "../../components/Posts/ChangePass";
import { TriangleExclamationFill } from "@gravity-ui/icons";

export default function Profile() {
  let { userData } = useContext(userdatacontext);
  let { token } = useContext(authcontext);

  function getprofileposts() {
    return axios.get(`${baseurl}/users/${userData?._id}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryFn: getprofileposts,
    queryKey: ["profileposts"],
    select: (data) => {
      return data?.data.data.posts;
    },
  });

  return (
    <>
      <div className=" min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* ===== COVER ===== */}
          <div className="relative pt-6 ">
            <div className="h-56 sm:h-72 w-full overflow-hidden rounded-3xl shadow-sm">
              <img
                src={
                  userData?.cover == "" || null
                    ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=500&fit=crop"
                    : userData?.cover
                }
                alt="Cover"
                className="h-full w-full object-cover"
              />
            </div>

            {/* breadcrumb on cover */}
            <div className="absolute top-10 left-6 flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-md">
              <Link
                to="/Home"
                className="text-sm font-medium text-white transition-colors hover:text-lime-200"
              >
                Home
              </Link>
              <span className="text-white">›</span>
              <span className="text-sm font-medium text-lime-200">Profile</span>
            </div>

            {/* ===== PROFILE PICTURE ===== */}
            <div className="absolute -bottom-16 left-8">
              <div className="rounded-full relative bg-linear-to-tr from-lime-300 to-emerald-600 p-0.75 shadow-lg">
                <img
                  src={userData?.photo}
                  alt="Profile"
                  className="h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-white object-cover bg-white"
                />
                <Changeprofilephoto />
              </div>
            </div>
          </div>

          {/* ===== PROFILE INFO ===== */}
          <div className="pt-20 pb-6 border-b border-slate-200">
            <div className="flex justify-between items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              My space
              <ChangePass />
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
              {userData?.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              <span className="font-serif italic text-emerald-700">@</span>
              {userData?.username} · {userData?.email}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-900">
                {userData?.followersCount}
              </span>{" "}
              Followers
              <span className="mx-2 text-slate-300">·</span>
              <span className="font-semibold text-slate-900">
                {userData?.followingCount}
              </span>{" "}
              Following
            </p>

            {/* ===== TABS ===== */}
            <div className="mt-6 flex items-center gap-8 text-sm">
              <button className="-mb-6 flex items-center gap-2 border-b-2 border-emerald-700 pb-3.5 font-bold text-emerald-700">
                Posts
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime-200 px-1.5 text-[11px] font-bold text-slate-900">
                  {data?.length ?? 0}
                </span>
              </button>
            </div>
          </div>

          {/* ===== POSTS FEED ===== */}
          <div className="space-y-5 lg:w-[85%] mx-auto py-8">
            {isError ? (
              <div className=" w-full   pt-5  flex flex-col gap-2 items-center justify-center">
                <TriangleExclamationFill className="size-10 text-red-600" />
                <p className="text-black font-medium text-lg">
                  There is an error please reload the page
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-40 w-full">
                <BeatLoader />
              </div>
            ) : (
              data.map((post: postinterface) => {
                return <Post {...post} key={post._id} singlepost={false} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
