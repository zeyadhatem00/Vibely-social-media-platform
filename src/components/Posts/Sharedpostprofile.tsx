import { Link, useNavigate } from "react-router-dom";
import type { post } from "../interface/postinterface";
import DeleteEditpost from "./DeleteEditpost";
import LikePost from "./LikePost";

import { MessageCircle } from "lucide-react";
import SharePost from "./SharePost";
import Commentinput from "./Commentinput";
import Postallcomments from "./Postallcomments";
import Commentsection from "./Commentsection";

export default function Sharedpostprofile(details: post) {
  let navigate = useNavigate();

  return (
    <>
      <article className="mb-4  mx-auto rounded-2xl border border-slate-200 bg-white p-5">
        {/* ===== sharer header ===== */}
        <div className="flex items-center gap-3">
          <img
            src={details.user.photo}
            className="h-10 w-10 rounded-full object-cover"
            alt=""
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {details.user.name}{" "}
              <span className="font-normal text-slate-400">shared a post</span>
            </p>
            <p className="text-xs text-gray-500">
              {new Date(details.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>
          <DeleteEditpost
            postId={details._id}
            Postbody={details.body}
            posTimage={details.image}
            userId={details.user._id}
            singlepost={details.singlepost}
          />
        </div>

        {/* ===== embedded original post ===== */}
        <Link to={`/postdetails/${details.sharedPost._id}`} className="block">
          <div className="mt-4 rounded-xl border border-slate-200 bg-stone-50 p-4 transition hover:border-emerald-700/50">
            {/* details.sharedPost author */}
            <div className="flex items-center gap-3">
              <img
                src={details.sharedPost.user.photo}
                className="h-8 w-8 rounded-full object-cover"
                alt=""
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {details.sharedPost.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(details.sharedPost.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                    },
                  )}
                </p>
              </div>
            </div>

            {/* original body */}
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {details.sharedPost.body}
            </p>

            {/* details.sharedPost image */}
            {details.sharedPost.image && (
              <img
                src={details.sharedPost.image}
                alt=""
                className="mt-3 max-h-100 w-full cursor-pointer rounded-lg object-cover object-center"
              />
            )}

            {/* details.sharedPost post counts */}
            <div className="mt-3 flex items-center gap-4 border-t border-slate-200 pt-2.5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-700 text-white text-[8px]">
                  👍
                </span>
                {details.sharedPost.likesCount}
              </span>
              <span>💬 {details.sharedPost.commentsCount}</span>
              <span>↗ {details.sharedPost.sharesCount}</span>
            </div>
          </div>
        </Link>

        {/* ===== sharer's counts bar ===== */}
        <div className="flex justify-between border-b border-slate-100 py-3 text-[14px] text-slate-400">
          <span>👍{details.likesCount}</span>
          <span>
            <span
              className="cursor-pointer hover:text-emerald-700 transition-all duration-150"
              onClick={() => {
                navigate(`/postdetails/${details._id}`);
              }}
            >
              {" "}
              {details.commentsCount} comments{" "}
            </span>
            · {details.sharesCount} shares
          </span>
        </div>
        {/* ===== action row ===== */}
        <div className="flex items-center justify-center gap-2 pt-2.5">
          <LikePost liked={details.likes} postid={details._id} />
          <Link
            to={`/postdetails/${details._id}`}
            className="flex flex-1 items-center justify-center gap-1 py-3 text-[10px] font-semibold cursor-pointer text-slate-500"
          >
            <MessageCircle size={16} /> Comments
          </Link>
          <SharePost postId={details._id} />
        </div>

        <Commentinput postid={details._id} />

        <div>
          {details.singlepost ? (
            <Postallcomments />
          ) : details.topComment ? (
            <Commentsection {...details.topComment} />
          ) : (
            ""
          )}
        </div>
      </article>
    </>
  );
}
