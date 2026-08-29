import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Brand() {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/Home");
      }}
      className="flex items-center gap-2 cursor-pointer text-xl font-bold tracking-tighter"
    >
      <span className="grid h-8 w-8 rotate-[-8deg] place-items-center rounded-xl bg-lime-200">
        <Sparkles size={17} fill="currentColor" className="rotate-[8deg]" />
      </span>
      Vibely
    </div>
  );
}
