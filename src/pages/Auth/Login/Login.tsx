import { useForm } from "react-hook-form";

import { loginapi } from "../../../Services/Auth/loginapi";

import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { authcontext } from "../../../context/authcontext";
import { LockKeyhole, Mail } from "lucide-react";
import AuthLeftCard from "../../../components/authcomplayout/AuthLeftCard";
import { AuthHeader } from "../../../components/authcomplayout/Authheader";
import type { loginface } from "../../../components/interface/logininterface";
import { toast } from "sonner";

export default function Login() {
  let { setToken } = useContext(authcontext);

  let navigate = useNavigate();

  let { register, handleSubmit } = useForm({
    mode: "onChange",

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitform(data: loginface) {
    try {
      let response = await loginapi(data);
      toast.success(response.data.message);
      setToken(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);

      navigate("/Home");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <>
      <section className="min-h-screen bg-stone-50">
        <AuthHeader />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-8 md:grid-cols-[1fr_1fr]">
          <AuthLeftCard />

          <div className="grid items-center ">
            <section id="login" className="w-full mx-auto  py-8">
              <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                <LockKeyhole size={14} /> Welcome back
              </div>
              <h1 className="mb-5 text-5xl font-medium leading-none  text-slate-900">
                Good to see
                <br />
                <em className="font-serif text-emerald-700">you again.</em>
              </h1>
              <p className="mb-8 max-w-xs text-sm leading-6 text-slate-500">
                Your people, ideas, and next great conversation are waiting.
              </p>
              <form
                onSubmit={handleSubmit(submitform)}
                className="space-y-5 w-full"
              >
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Email</span>
                  <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                    <Mail size={16} />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>

                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Password</span>
                  <span className="mt-1 flex min-h-10 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-emerald-700 focus-within:text-emerald-700">
                    <LockKeyhole size={16} />
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center cursor-pointer justify-between rounded-xl bg-emerald-900 px-4 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  Sign in <span className="text-lg font-normal">→</span>
                </button>
                <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
                  <span className=" sm:block">Don't have an account?</span>
                  <Link
                    to={"/signup"}
                    className="font-bold text-slate-900 hover:text-emerald-800"
                  >
                    Create account →
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
