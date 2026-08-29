import { Link } from "react-router-dom";
import { Compass, SearchX } from "lucide-react";
import { AuthHeader } from "../../components/authcomplayout/Authheader";
import { ArrowRight } from "@gravity-ui/icons";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen bg-stone-50 text-slate-900">
      <AuthHeader />
      <main className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-16 text-center">
        <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
          <SearchX size={14} /> Lost your way?
        </div>

        <h1 className="text-7xl font-medium leading-none tracking-tight sm:text-8xl">
          4
          <span className="mx-1 inline-grid h-20 w-20 rotate-[-8deg] place-items-center rounded-2xl bg-lime-200 align-middle text-slate-900 sm:h-24 sm:w-24">
            0
          </span>
          4
        </h1>

        <h2 className="mt-6 text-5xl font-medium leading-none sm:text-6xl">
          Page not
          <br />
          <em className="font-serif text-emerald-700">found.</em>
        </h2>

        <p className="mt-8 max-w-xs text-sm leading-6 text-slate-500">
          The page you're looking for has wandered off. It might have been
          moved, deleted, or never existed at all.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            to="/Home"
            className="flex group cursor-pointer items-center justify-between gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Back home{" "}
            <span className="text-lg transition-all duration-200 translate-y-px group-hover:translate-x-1 font-normal">
              <ArrowRight />
            </span>
          </Link>
          <Link
            to="/Home"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-700 hover:text-emerald-700"
          >
            <Compass size={15} /> Explore feed
          </Link>
        </div>
      </main>
    </section>
  );
}
