import {
  CalendarDays,
  Link2,
  LockKeyhole,
  Mail,
  PenLine,
  UserPlus,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../../validation/signupschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Signupapi } from "../../../Services/Auth/signuapi";
import { Link, useNavigate } from "react-router-dom";
import { AuthHeader } from "../../../components/authcomplayout/Authheader";
import AuthLeftCard from "../../../components/authcomplayout/AuthLeftCard";
import type { register } from "../../../components/interface/logininterface";
import { toast } from "sonner";

export default function Signup() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",

    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  async function submitform(data: register) {
    try {
      let response = await Signupapi(data);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error("account already exists");
    }
  }

  return (
    <>
      <section className="min-h-screen bg-stone-50">
        <AuthHeader />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-5 pt-0 lg:grid-cols-[.8fr_1.2fr]">
          <AuthLeftCard />

          <div>
            <section
              id="signup"
              className="w-full  rounded-3xl bg-stone-100 p-7 text-slate-900 shadow-2xl sm:p-10"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                    <UserPlus size={14} /> New here?
                  </div>
                  <h2 className="text-5xl font-medium leading-none tracking-tighter">
                    Find your
                    <br />
                    <em className="font-serif text-emerald-700">people.</em>
                  </h2>
                </div>
              </div>
              <p className="my-7 max-w-xs text-sm leading-6 text-slate-500">
                Create your space in a community built around what moves you.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit(submitform)}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Name</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <PenLine size={16} />
                      <input
                        {...register("name")}
                        placeholder="Alex"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.name && (
                      <p className="pl-1.5 capitalize  mt-1 text-sm text-red-500 font-normal tracking-normal">
                        {errors.name.message}
                      </p>
                    )}
                  </label>

                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Username</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <Link2 size={16} />
                      <input
                        {...register("username")}
                        placeholder="alexmorgan"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.username && (
                      <p className="pl-1.5 mt-1 capitalize text-sm text-red-500 font-normal tracking-normal">
                        {errors.username.message}
                      </p>
                    )}
                  </label>
                </div>

                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Email</span>
                  <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                    <Mail size={16} />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </span>
                  {errors.email && (
                    <p className="pl-1.5 mt-1  capitalize text-sm text-red-500 font-normal tracking-normal">
                      {errors.email.message}
                    </p>
                  )}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Create password</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <LockKeyhole size={16} />
                      <input
                        {...register("password")}
                        type="password"
                        placeholder="At least 8 characters"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.password && (
                      <p className="pl-1.5  capitalize mt-1 text-sm text-red-500 font-normal tracking-normal">
                        {errors.password.message}
                      </p>
                    )}
                  </label>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Confirm password</span>
                    <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                      <LockKeyhole size={16} />
                      <input
                        {...register("rePassword")}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </span>
                    {errors.rePassword && (
                      <p className="pl-1.5 mt-1  capitalize text-sm text-red-500 font-normal tracking-normal">
                        {errors.rePassword.message}
                      </p>
                    )}
                  </label>
                </div>
                <div>
                  {" "}
                  <div className="flex pt-2.5 items-center gap-2 border-b border-slate-200 pb-2 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                    <Users size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Gender
                    </span>
                    <label className="ml-auto flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="radio"
                        {...register("gender")}
                        value="male"
                      />{" "}
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="radio"
                        {...register("gender")}
                        value="female"
                      />{" "}
                      Female
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="pl-1.5 mt-1  capitalize text-sm text-red-500 font-normal tracking-normal">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Date of birth</span>
                  <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                    <CalendarDays size={16} />
                    <input
                      {...register("dateOfBirth")}
                      type="date"
                      placeholder="MM / DD / YYYY"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </span>
                  {errors.dateOfBirth && (
                    <p className="pl-1.5 mt-1  capitalize text-sm text-red-500 font-normal tracking-normal">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </label>

                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  Create my account{" "}
                  <span className="text-lg font-normal">→</span>
                </button>
                <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
                  <span className=" sm:block">Already have an account ?</span>
                  <Link
                    to={"/"}
                    className="font-bold text-slate-900 hover:text-emerald-800"
                  >
                    Login →
                  </Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
