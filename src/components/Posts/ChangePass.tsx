import { Button, Modal, useOverlayState } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeSchema } from "../../validation/ChangepassSchema";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  const state = useOverlayState({
    defaultOpen: false,
  });
  let navigate = useNavigate();

  let { token, setToken } = useContext(authcontext);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(changeSchema),
  });

  function sendpss(data: any) {
    return axios.patch(`${baseurl}/users/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  function changepassword(data: any) {
    mutate(data);
  }

  let { mutate } = useMutation({
    mutationFn: sendpss,
    onSuccess: () => {
      toast.success("Password Changed");
      state.close();
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    },

    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      <button
        onClick={() => {
          state.open();
        }}
        className="flex items-center gap-2 rounded-xl cursor-pointer hover:underline text-xs font-bold text-emerald-700 "
      >
        <LockKeyhole size={14} /> Change password
      </button>

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
            size="lg"
          >
            <Modal.Dialog className="w-fit h-fit shadow-none bg-transparent">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {/* header */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  <LockKeyhole className="size-4 shrink-0" /> Security
                </div>
                <h2 className="mt-2 text-3xl font-medium leading-none tracking-tight text-slate-900">
                  Change
                  <br />
                  <em className="font-serif text-emerald-700">password.</em>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Pick something strong you don't use anywhere else.
                </p>

                <form
                  onSubmit={handleSubmit(changepassword)}
                  className="mt-6 space-y-5"
                >
                  {/* current password */}
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Current password</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <LockKeyhole className="size-4 shrink-0" />
                      <input
                        {...register("password")}
                        type="password"
                        placeholder="Enter current password"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.password && (
                      <p className="pl-1.5 capitalize  mt-1 text-sm text-red-500 font-normal tracking-normal">
                        {errors.password.message}
                      </p>
                    )}
                  </label>

                  {/* new password */}
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>New password</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <LockKeyhole className="size-4 shrink-0" />
                      <input
                        {...register("newPassword")}
                        type="password"
                        placeholder="At least 8 characters"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.newPassword && (
                      <p className="pl-1.5 capitalize  mt-1 text-sm text-red-500 font-normal tracking-normal">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </label>

                  {/* actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        state.close();
                      }}
                      type="button"
                      className="text-xs font-bold cursor-pointer transition-all duration-150 text-slate-500 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-emerald-900 px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
                    >
                      Update password{" "}
                    </button>
                  </div>
                </form>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
