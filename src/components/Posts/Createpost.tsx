import { userdatacontext } from "../../context/Userdatacntext";
import { X, Image as ImageIcon, Image, PenLine } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseurl } from "../../const/env";
import { authcontext } from "../../context/authcontext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Createpost() {
  let [isShow, setshow] = useState(false);
  let { userData } = useContext(userdatacontext);
  let [imagefile, setfile] = useState("");
  let [imagesrc, setsrc] = useState("");
  let { token } = useContext(authcontext);
  let imageinput = useRef<HTMLInputElement | null>(null);
  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  function createPost(postData: any) {
    return axios.post(`${baseurl}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function showoverlay() {
    isShow = !isShow;
    setshow(isShow);
  }

  function getimagefile(e: any) {
    setfile(e.target.files[0]);
    setsrc(URL.createObjectURL(e.target.files[0]));
  }

  function submitpost(data: { body: string }) {
    if (!data.body && !imagefile) {
      return;
    }

    let Fd = new FormData();
    if (data.body) {
      Fd.append("body", data.body);
    }

    if (imagefile) {
      Fd.append("image", imagefile);
    }
    mutate(Fd);
  }

  let query = useQueryClient();
  let { isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allposts"] });
      reset();
      setshow(false);
      setfile("");
      toast.success("Post created successfully");
    },

    onError: () => {
      toast.error("An error happened try again ");
    },
  });

  return (
    <>
      <div
        onClick={showoverlay}
        className="flex cursor-pointer items-center mb-3.5 gap-3 rounded-2xl border border-slate-200 bg-white p-4"
      >
        <img
          src={
            userData?.photo
              ? userData.photo
              : "https://cdn-icons-png.flaticon.com/128/456/456212.png"
          }
          alt="Alex Morgan"
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="flex-1 text-xs text-slate-400">
          What’s on your mind?
        </span>
        <button
          className=" text-slate-400  hover:text-green-500 transition-all duration-150 cursor-pointer   "
          aria-label="Add image"
        >
          <Image size={19} />
        </button>
        <button
          className="text-slate-400  hover:text-green-500 transition-all duration-150 cursor-pointer "
          aria-label="Create post"
        >
          <PenLine size={19} />
        </button>
      </div>

      {isShow ? (
        <form onSubmit={handleSubmit(submitpost)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            {/* Modal */}
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Create Post
                </h2>
                <button
                  type="button"
                  onClick={showoverlay}
                  className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={userData?.photo}
                    alt="You"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {userData?.name}
                    </p>
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  placeholder="What's on your mind?"
                  rows={5}
                  {...register("body")}
                  className="w-full resize-none text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none leading-relaxed"
                />

                {imagefile == "" ? (
                  ""
                ) : (
                  <div className="relative mt-3 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={imagesrc}
                      className="w-full max-h-64 object-cover"
                    />
                    <button
                      onClick={() => {
                        setfile("");
                      }}
                      type="button"
                      className=" cursor-pointer absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Add to post bar */}
                <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                  <span className="text-sm text-gray-600 font-medium">
                    Add to your post
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Photo */}
                    <input
                      onChange={getimagefile}
                      type="file"
                      hidden
                      ref={imageinput}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        imageinput.current?.click();
                      }}
                      className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-full hover:bg-green-50 text-green-600 transition"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <Button
                  type="submit"
                  className="w-full py-2.5 cursor-pointer bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all active:scale-[0.98]"
                >
                  {isPending ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 fill-white inline animate-spin"
                      viewBox="0 0 26.349 26.35"
                    >
                      <circle
                        cx="13.792"
                        cy="3.082"
                        r="3.082"
                        data-original="#000000"
                      />
                      <circle
                        cx="13.792"
                        cy="24.501"
                        r="1.849"
                        data-original="#000000"
                      />
                      <circle
                        cx="6.219"
                        cy="6.218"
                        r="2.774"
                        data-original="#000000"
                      />
                      <circle
                        cx="21.365"
                        cy="21.363"
                        r="1.541"
                        data-original="#000000"
                      />
                      <circle
                        cx="3.082"
                        cy="13.792"
                        r="2.465"
                        data-original="#000000"
                      />
                      <circle
                        cx="24.501"
                        cy="13.791"
                        r="1.232"
                        data-original="#000000"
                      />
                      <path
                        d="M4.694 19.84a2.155 2.155 0 0 0 0 3.05 2.155 2.155 0 0 0 3.05 0 2.155 2.155 0 0 0 0-3.05 2.146 2.146 0 0 0-3.05 0z"
                        data-original="#000000"
                      />
                      <circle
                        cx="21.364"
                        cy="6.218"
                        r=".924"
                        data-original="#000000"
                      />
                    </svg>
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
}
