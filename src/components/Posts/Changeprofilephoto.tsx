import { Camera } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import axios from "axios";
import { X } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { baseurl } from "../../const/env";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userdatacontext } from "../../context/Userdatacntext";

export default function Changeprofilephoto() {
  let { userData } = useContext(userdatacontext);
  let { token } = useContext(authcontext);
  let photobtn = useRef<HTMLInputElement>(null);
  let [isShow, setshow] = useState(false);
  let [image, setimage] = useState("");
  let [src, setsrc] = useState("");
  function showoverlay() {
    isShow = !isShow;
    setshow(isShow);
  }

  function changephoto(image: any) {
    return axios.put(`${baseurl}/users/upload-photo`, image, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  let query = useQueryClient();
  let { mutate, isPending } = useMutation({
    mutationFn: changephoto,
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["profileposts"] });
      query.invalidateQueries({ queryKey: ["userData"] });
      showoverlay();
      toast.success(`${data.data.message}`);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  function getimagefile(e: any) {
    setimage(e.target.files[0]);
    setsrc(URL.createObjectURL(e.target.files[0]));
  }

  function submitChange() {
    if (!image) {
      return;
    }

    let fd = new FormData();

    if (image) {
      fd.append("photo", image);
    }

    mutate(fd);
  }

  return (
    <>
      <div
        onClick={() => {
          photobtn.current?.click();
          showoverlay();
        }}
        className="rounded-full absolute right-0 bottom-2 cursor-pointer size-10 flex items-center justify-center bg-[#d8fa98]"
      >
        {" "}
        <Camera />
      </div>
      <input onChange={getimagefile} ref={photobtn} type="file" hidden />

      {isShow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          {/* Modal */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Change photo
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
            <div className="rounded-full w-fit h-fit mx-auto my-5  relative bg-linear-to-tr from-lime-300 to-emerald-600 p-0.75 shadow-lg">
              <img
                src={src == "" ? `${userData?.photo}` : src}
                alt="Profile"
                className="h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-white object-cover bg-white"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
              <Button
                onClick={submitChange}
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
      ) : (
        ""
      )}
    </>
  );
}
