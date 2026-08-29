import { PaperPlane, Picture } from "@gravity-ui/icons";
import { useContext, useRef, useState } from "react";
import { userdatacontext } from "../../context/Userdatacntext";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { baseurl } from "../../const/env";
import axios from "axios";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CircleXmarkFill } from "@gravity-ui/icons";
export default function Commentinput({ postid }: { postid: string }) {
  let { userData } = useContext(userdatacontext);
  let imginput = useRef<HTMLInputElement | null>(null);
  let [imagefile, setimage] = useState("");
  let [src, setsrc] = useState("");
  let { token } = useContext(authcontext);
  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  function postcomment(commentData: any) {
    return axios.post(`${baseurl}/posts/${postid}/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getimagefile(e: any) {
    setimage(e.target.files[0]);
    setsrc(URL.createObjectURL(e.target.files[0]));
  }

  function commentsubmit(data: { content: string }) {
    if (!data.content && !imagefile) {
      return;
    }

    let Fd = new FormData();
    if (data.content) {
      Fd.append("content", data.content);
    }
    if (imagefile) {
      Fd.append("image", imagefile);
    }

    mutate(Fd);
  }

  let query = useQueryClient();

  let { isPending, mutate } = useMutation({
    mutationFn: postcomment,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allposts"] });
      query.invalidateQueries({ queryKey: ["profileposts"] });
      query.invalidateQueries({ queryKey: ["postcomments", postid] });
      query.invalidateQueries({ queryKey: ["postdetails", postid] });
      toast.success("comment added successfully");
      reset();
      setsrc("");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(commentsubmit)}>
        <div
          className={`mt-4 mb-5 flex items-start gap-3 rounded-2xl border focus:border-emerald-600 bg-white p-4 transition `}
        >
          <img
            src={userData?.photo}
            alt="Your avatar"
            className="h-9 w-9 rounded-full object-cover shrink-0"
          />

          <div className="w-full">
            <textarea
              {...register("content")}
              placeholder="Write a comment..."
              className="w-full resize-none bg-transparent px-1 py-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />

            {/* attachment preview */}
            {src == "" ? (
              ""
            ) : (
              <div className="relative mt-2 w-fit">
                <img
                  src={src}
                  alt="Attachment preview"
                  className="h-20 w-32 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setsrc("");
                  }}
                  className="absolute -right-2 -top-2 text-slate-900 transition hover:text-red-600"
                >
                  <CircleXmarkFill className="size-5 cursor-pointer" />
                </button>
              </div>
            )}

            {/* actions row */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <input
                onChange={getimagefile}
                type="file"
                ref={imginput}
                hidden
              />
              <button
                type="button"
                onClick={() => imginput.current?.click()}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                title="Add image"
              >
                <Picture className="size-4.5" />
              </button>

              <Button
                type="submit"
                isDisabled={isPending}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>
                    Comment <PaperPlane className="size-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
