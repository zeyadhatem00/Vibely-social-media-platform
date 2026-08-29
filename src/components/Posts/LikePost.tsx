import { ThumbsUp, ThumbsUpFill } from "@gravity-ui/icons";
import { baseurl } from "../../const/env";
import { useContext, useState } from "react";
import { authcontext } from "../../context/authcontext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { userdatacontext } from "../../context/Userdatacntext";
import { toast } from "sonner";

export default function LikePost({
  postid,
  liked,
}: {
  postid: string;
  liked: string[];
}) {
  let { token } = useContext(authcontext);
  let { userData } = useContext(userdatacontext);
  let [like, setLike] = useState<boolean>(liked.includes(userData?._id!));
  function likepost() {
    return axios.put(
      `${baseurl}/posts/${postid}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  let query = useQueryClient();
  let { mutate } = useMutation({
    mutationFn: likepost,
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["postdetails", postid] });
      query.invalidateQueries({ queryKey: ["allposts"] });
      query.invalidateQueries({ queryKey: ["profileposts"] });
      setLike(data.data.data.liked);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      <Button
        onClick={() => {
          mutate();
        }}
        className={`flex flex-1 bg-transparent items-center justify-center gap-2 py-3 text-[10px] font-semibold ${like ? "text-emerald-700" : "text-slate-500"}   `}
      >
        {like ? <ThumbsUpFill /> : <ThumbsUp />} Like
      </Button>
    </>
  );
}
