import { EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import { X, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext, useRef, useState } from "react";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userdatacontext } from "../../context/Userdatacntext";
import { useForm } from "react-hook-form";
import type { updatePost } from "../interface/Updatepost";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DeleteEditpost({
  postId,
  userId,
  Postbody,
  posTimage,
  singlepost,
}: updatePost) {
  {
    /*context */
  }

  let { token } = useContext(authcontext);
  let { userData } = useContext(userdatacontext);

  {
    /*States */
  }

  let navigate = useNavigate();

  let [isShow, setshow] = useState(false);

  let [image, setimage] = useState("");

  let [imgsrc, setsrc] = useState<string | null>(posTimage);

  let imageinput = useRef<HTMLInputElement | null>(null);

  {
    /*Use Form */
  }

  let { register, handleSubmit } = useForm({
    defaultValues: {
      body: Postbody,
    },
  });

  {
    /*Toggle the edit modal*/
  }

  function showoverlay() {
    isShow = !isShow;
    setshow(isShow);
  }

  let query = useQueryClient();

  {
    /*Update Api */
  }

  function deletePOst() {
    return axios.delete(`${baseurl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  {
    /*Delete Api */
  }

  function updatepost(updaetdata: any) {
    return axios.put(`${baseurl}/posts/${postId}`, updaetdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  {
    /*Delete Post Mutation */
  }

  let { mutate } = useMutation({
    mutationFn: deletePOst,

    onSuccess: () => {
      toast.success("post deleted");

      query.invalidateQueries({
        queryKey: ["allposts"],
      });

      query.invalidateQueries({
        queryKey: ["profileposts"],
      });

      query.invalidateQueries({
        queryKey: ["postdetails", postId],
      });

      {
        singlepost ? navigate("/Home") : "";
      }
    },

    onError: () => {
      toast.error("an error happened try again");
    },
  });

  {
    /*Update Post Mutation */
  }

  let { mutate: update, isPending } = useMutation({
    mutationFn: updatepost,

    onSuccess: () => {
      toast.success("post updated");

      query.invalidateQueries({
        queryKey: ["allposts"],
      });

      query.invalidateQueries({
        queryKey: ["profileposts"],
      });

      query.invalidateQueries({
        queryKey: ["postdetails", postId],
      });

      showoverlay();
    },

    onError: () => {
      toast.error("something went wrong");
    },
  });

  {
    /*Image file*/
  }

  function getimagefile(e: any) {
    setimage(e.target.files[0]);
    setsrc(URL.createObjectURL(e.target.files[0]));
  }

  {
    /*Form Submiton*/
  }

  function submitupdate(data: any) {
    if (!data.body && image) {
      return;
    }

    let Fd = new FormData();

    if (data.body) {
      Fd.append("body", data.body);
    }

    if (image) {
      Fd.append("image", image);
    }

    update(Fd);
  }

  return (
    <>
      {/*Post Options Menu*/}

      {userData?._id == userId ? (
        <Dropdown>
          <Button
            aria-label="Menu"
            className="bg-transparent ml-auto transition-all duration-150 text-gray-400 hover:text-gray-600"
          >
            <EllipsisVertical />
          </Button>

          <Dropdown.Popover>
            <Dropdown.Menu>
              {/* Edit Post */}
              <Dropdown.Item
                onClick={() => {
                  showoverlay();
                }}
                className="transition-all duration-200"
              >
                <Pencil className="size-4 shrink-0 text-muted" />

                <Label className="text-muted">Edit</Label>
              </Dropdown.Item>

              {/* Delete Post */}
              <Dropdown.Item
                onClick={() => {
                  mutate();
                }}
                className="transition-all duration-200 data-[focused=true]:bg-danger-soft"
                variant="danger"
              >
                <TrashBin className="size-4 shrink-0 text-danger" />

                <Label>Delete</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      ) : (
        ""
      )}

      {/*Edit Post Modal overlay*/}

      {isShow ? (
        <form onSubmit={handleSubmit(submitupdate)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
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

              <div className="p-5">
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

                <textarea
                  placeholder="What's on your mind?"
                  rows={5}
                  {...register("body")}
                  className="w-full resize-none text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none leading-relaxed"
                />

                {imgsrc ? (
                  <div className="relative mt-3 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={imgsrc}
                      className="w-full max-h-64 object-cover"
                    />

                    <button
                      onClick={() => {
                        setsrc(null);
                      }}
                      type="button"
                      className="cursor-pointer absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                  <span className="text-sm text-gray-600 font-medium">
                    Add to your post
                  </span>

                  <div className="flex items-center gap-1">
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

              {/*Modal Footer*/}

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
                    "confirm"
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
