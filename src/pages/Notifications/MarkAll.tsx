import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function MarkAll() {
  let { token } = useContext(authcontext);

  function Markall() {
    return axios.patch(
      `${baseurl}/notifications/read-all`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  let query = useQueryClient();
  let { mutate } = useMutation({
    mutationFn: Markall,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["notifications"] });
      query.invalidateQueries({ queryKey: ["notinumber"] });
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      {" "}
      <button
        onClick={() => {
          mutate();
        }}
        className="ml-auto cursor-pointer hover:underline text-xs font-bold text-emerald-700 hover:text-emerald-800"
      >
        Mark all as read
      </button>
    </>
  );
}
