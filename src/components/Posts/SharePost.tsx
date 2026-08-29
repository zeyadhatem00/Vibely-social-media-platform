import axios from "axios";
import { Share2 } from "lucide-react";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { toast } from "sonner";

export default function SharePost({ postId }: { postId: string }) {
  let { token } = useContext(authcontext);

  function Share() {
    return axios.post(
      `${baseurl}/posts/${postId}/share`,
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
    mutationFn: Share,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allposts"] });
      query.invalidateQueries({ queryKey: ["profileposts"] });
      toast.success("post shared");
    },
    onError: () => {
      toast.error("post already shared");
    },
  });

  return (
    <>
      <Button
        onClick={() => {
          mutate();
        }}
        className={`flex bg-transparent  flex-1 items-center justify-center gap-1 py-3 text-[10px] text-slate-500 font-semibo `}
      >
        <Share2 size={16} /> Share
      </Button>
    </>
  );
}
