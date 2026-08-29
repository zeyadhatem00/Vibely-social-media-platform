import { MessageCircle } from "lucide-react";
import type { post } from "../interface/postinterface";
import Commentsection from "../Posts/Commentsection";
import Postallcomments from "./Postallcomments";
import Commentinput from "./Commentinput";
import { Link, useNavigate } from "react-router-dom";
import DeleteEditpost from "./DeleteEditpost";
import { useOverlayState } from "@heroui/react";
import ImageModal from "./ImageModal";
import LikePost from "./LikePost";
import SharePost from "./SharePost";

import Sharedpostprofile from "./Sharedpostprofile";

export function Post(details: post) {
  let navigate = useNavigate();

  const state = useOverlayState({
    defaultOpen: false,
  });

  return (
    <>
      {details.isShare ? (
        <Sharedpostprofile {...details} />
      ) : (
        <article className="mb-4  mx-auto rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <img
              src={details.user.photo}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="font-semibold text-sm text-gray-900">
                {details.user.name}
              </p>
              <p className="text-xs text-gray-500">
                {" "}
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
          <p className="my-4 text-sm leading-6 text-slate-600">
            {details.body}
          </p>
          {details.image ? (
            <img
              onClick={() => {
                state.open();
              }}
              src={details.image}
              alt="Post shared by the community"
              className="max-h-120 cursor-pointer w-full object-top rounded-xl object-cover"
            />
          ) : (
            ""
          )}
          <div className="flex justify-between border-b border-slate-100 py-3 text-[14px] text-slate-400">
            <span>
              👍
              {details.likesCount}
            </span>
            <span>
              <span
                className="cursor-pointer hover:text-emerald-700 transition-all duration-150"
                onClick={() => {
                  navigate(`/postdetails/${details._id}`);
                }}
              >
                {" "}
                {details.commentsCount} comments{" "}
              </span>{" "}
              · {details.sharesCount} shares
            </span>
          </div>
          <div className="flex items-center  pt-2.5 justify-center gap-2">
            <LikePost liked={details.likes} postid={details._id} />
            <Link
              to={`/postdetails/${details._id}`}
              className="flex flex-1 items-center justify-center gap-1 py-3 text-[10px] font-semibold text-slate-500 cursor-pointer"
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

          <ImageModal image={details.image} state={state} />
        </article>
      )}
    </>
  );
}
