import { PaperPlane, Picture } from "@gravity-ui/icons";
import { CircleXmarkFill } from "@gravity-ui/icons";
import { useContext, useRef, useState } from "react";
import { userdatacontext } from "./../../context/Userdatacntext";
import { authcontext } from "../../context/authcontext";
import { useForm } from "react-hook-form";
import { Button, Modal, useOverlayState } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseurl } from "../../const/env";
import { toast } from "sonner";

export default function UpdateComment({
  state,
  postid,
  commentid,
  photo,
  body,
}: {
  postid: string;
  commentid: string;
  state: ReturnType<typeof useOverlayState>;
  body: string;
  photo: string;
}) {
  let { userData } = useContext(userdatacontext);
  let imginput = useRef<HTMLInputElement | null>(null);
  let [imagefile, setimage] = useState("");
  let [src, setsrc] = useState(photo);
  let { token } = useContext(authcontext);

  let { register, handleSubmit } = useForm({
    defaultValues: {
      content: body,
    },
  });

  function getimagefile(e: any) {
    setimage(e.target.files[0]);
    setsrc(URL.createObjectURL(e.target.files[0]));
  }

  function submitcomment(data: any) {
    if (!data.content && !imagefile) {
      return;
    }

    let fd = new FormData();

    if (data.content) {
      fd.append("content", data.content);
    }

    if (imagefile) {
      fd.append("image", imagefile);
    }

    mutate(fd);
  }

  function updateApi(commentdata: any) {
    return axios.put(
      `${baseurl}/posts/${postid}/comments/${commentid}`,
      commentdata,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  let query = useQueryClient();
  let { mutate, isPending } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allposts"] });
      query.invalidateQueries({ queryKey: ["profileposts"] });
      query.invalidateQueries({ queryKey: ["postcomments", postid] });
      query.invalidateQueries({ queryKey: ["postdetails", postid] });
      toast.success("comment updated");
      state.close();
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Button hidden></Button>
        <Modal.Backdrop
          className="
                  data-entering:duration-400
                  data-entering:ease-[cubic-bezier(0.16,1,0.3,1)]
                  data-exiting:duration-200
                  data-exiting:ease-[cubic-bezier(0.7,0,0.84,0)]
                "
        >
          <Modal.Container
            className="
          relative
                    data-entering:animate-in
                    data-entering:fade-in-0
                    data-entering:zoom-in-95
                    data-entering:duration-400
                    data-entering:ease-[cubic-bezier(0.16,1,0.3,1)]
                    data-exiting:animate-out
                    data-exiting:fade-out-0
                    data-exiting:zoom-out-95
                    data-exiting:duration-200
                    data-exiting:ease-[cubic-bezier(0.7,0,0.84,0)]
                  "
            size="full"
          >
            <Modal.Dialog className=" h-fit absolute justify-end lg:w-[80%] shadow-none bg-transparent">
              <form className="w-full" onSubmit={handleSubmit(submitcomment)}>
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
                    {src ? (
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
                    ) : (
                      ""
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

                      <div className="flex items-center gap-2.5">
                        <Button
                          onClick={() => {
                            state.close();
                          }}
                          className="bg-transparent  text-black font-medium hover:text-emerald-600 transition-all duration-150"
                        >
                          Cancel
                        </Button>

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
                </div>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
