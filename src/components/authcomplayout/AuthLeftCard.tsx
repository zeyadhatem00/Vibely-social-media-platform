import { images } from "../../data/data";

export default function AuthLeftCard() {
  return (
    <>
      <div className="relative flex min-h-155 flex-col justify-center overflow-hidden rounded-[2rem] bg-emerald-950 p-8 text-white sm:p-14">
        <div className="absolute -bottom-40 -right-20 h-128 w-lg rounded-full border border-lime-100/20 shadow-[0_0_0_40px_rgba(217,243,200,.04),0_0_0_80px_rgba(217,243,200,.03)]" />
        <div className="relative max-w-md">
          <span className="text-[10px] font-bold uppercase tracking-widest text-lime-200">
            A more human social network
          </span>
          <h2 className="my-5 text-6xl font-medium leading-[.9] tracking-tighter sm:text-7xl">
            Make room
            <br />
            for <em className="font-serif text-lime-200">more.</em>
          </h2>
          <p className="max-w-xs text-sm leading-6 text-emerald-100/70">
            Share the moments that matter. Discover people who get it. Build
            something meaningful together.
          </p>
          <div className="mt-10 flex items-center gap-3 text-[11px] text-emerald-100/70">
            <div className="flex pl-2">
              {[images.avatar, images.avatarTwo, images.avatarThree].map(
                (image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Nexa member"
                    className="-ml-2 h-8 w-8 rounded-full border-2 border-emerald-950 object-cover"
                  />
                ),
              )}
              <span className="-ml-2 grid h-8 w-8 place-items-center rounded-full border-2 border-emerald-950 bg-lime-200 text-[9px] font-bold text-emerald-950">
                +12k
              </span>
            </div>
            <span>
              People are already
              <br />
              finding their circle
            </span>
          </div>
        </div>
        <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[10px] text-emerald-100/60 sm:left-14">
          <span>01</span>
          <span className="h-px w-20 bg-lime-200" />
          <span>03</span>
        </div>
      </div>
    </>
  );
}
