import axios from "axios";
import Commentsection from "./Commentsection";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useQuery } from "@tanstack/react-query";
import type { TopComment } from "../interface/commentinterface";
import { useParams } from "react-router-dom";
import { TriangleExclamationFill } from "@gravity-ui/icons";

export default function Postallcomments() {
  let { token } = useContext(authcontext);
  let { postid } = useParams();

  function getcomments() {
    return axios.get(`${baseurl}/posts/${postid}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryFn: getcomments,
    queryKey: ["postcomments", postid],
    select: (data) => {
      return data?.data.data.comments;
    },
  });

  return (
    <>
      {isError ? (
        <div className=" w-full      flex flex-col gap-2 items-center justify-center">
          <TriangleExclamationFill className="size-10 text-red-600" />
          <p className="text-black font-medium text-lg">
            There is an error please reload the page
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0"></div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded w-full"></div>
              <div className="h-3.5 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ) : (
        data?.map((comment: TopComment) => {
          return <Commentsection {...comment} key={comment._id} />;
        })
      )}
    </>
  );
}
