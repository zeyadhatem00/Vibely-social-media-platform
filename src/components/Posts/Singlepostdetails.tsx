import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostLayout";
import { TriangleExclamationFill } from "@gravity-ui/icons";
import { BeatLoader } from "react-spinners";
import { ArrowLeft } from "@gravity-ui/icons";

export default function Singlepostdetails() {
  let { token } = useContext(authcontext);
  let { postid } = useParams();

  function getpostdeatils() {
    return axios.get(`${baseurl}/posts/${postid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let { data, isError, isLoading } = useQuery({
    queryFn: getpostdeatils,
    queryKey: ["postdetails", postid],
    select: (data) => {
      return data?.data.data.post;
    },
  });

  if (isError) {
    return (
      <>
        <div className=" w-full  absolute top-[50%] -translate-y-1/2   flex flex-col gap-2 items-center justify-center">
          <TriangleExclamationFill className="size-10 text-red-600" />
          <p className="text-black font-medium text-lg">
            There is an error or post has been deleted
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className="bg-stone-50 min-h-screen pt-8 pb-8 text-slate-900">
          <Link
            to={"/Home"}
            className="flex items-center pl-12 hover:text-[#007a56] transition-all duration-150 mb-6 w-fit font-medium cursor-pointer gap-2  "
          >
            <ArrowLeft className="translate-y-[1.5px]" /> Go Back
          </Link>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-full">
              <BeatLoader />
            </div>
          ) : (
            <article className="lg:w-[70%] w-[90%]   mx-auto">
              <Post {...data} singlepost={true} />
            </article>
          )}
        </section>
      </>
    );
  }
}
