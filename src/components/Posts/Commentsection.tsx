import { useContext } from "react";
import type { TopComment } from "../interface/commentinterface";
import { userdatacontext } from "../../context/Userdatacntext";
import UpdateDeleteComment from "./UpdateDeleteComment";

export default function Commentsection(comment: TopComment) {
  let { userData } = useContext(userdatacontext);

  return (
    <>
      <div className="space-y-5 pt-2 ">
        {/* <!-- Single Comment --> */}
        <div className="flex gap-3">
          <img
            src={comment.commentCreator?.photo}
            alt="User"
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-gray-900">
                  {comment.commentCreator.name}
                </span>
                {comment.commentCreator._id == userData?._id ? (
                  <UpdateDeleteComment
                    body={comment.content}
                    photo={comment.photo}
                    id={comment._id}
                    postid={comment.post}
                  />
                ) : (
                  ""
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
