import { Button } from "@heroui/react";
import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Followbtn({ id }: { id: string }) {
  let { token } = useContext(authcontext);

  function follow() {
    return axios.put(
      `${baseurl}/users/${id}/follow`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  let query = useQueryClient();
  let { mutate, isPending } = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      toast.success("followed");
      query.invalidateQueries({ queryKey: ["suggetions"] });
      query.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <Button
      isDisabled={isPending}
      onClick={() => {
        mutate();
      }}
      className="shrink-0  cursor-pointer rounded-xl bg-emerald-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-800"
    >
      {isPending ? (
        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        <>Follow</>
      )}
    </Button>
  );
}
