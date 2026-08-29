import { Ellipsis, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Dropdown, Label, useOverlayState } from "@heroui/react";
import axios from "axios";
import { baseurl } from "../../const/env";
import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UpdateComment from "./UpdateComment";

export default function UpdateDeleteComment({
  id,
  postid,
  photo,
  body,
}: {
  id: string;
  postid: string;
  body: string;
  photo: string;
}) {
  let { token } = useContext(authcontext);

  const state = useOverlayState({
    defaultOpen: false,
  });

  function deletecomment() {
    return axios.delete(`${baseurl}/posts/${postid}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
  }

  let query = useQueryClient();

  let { mutate } = useMutation({
    mutationFn: deletecomment,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allposts"] });
      query.invalidateQueries({ queryKey: ["profileposts"] });
      query.invalidateQueries({ queryKey: ["postcomments", postid] });
      query.invalidateQueries({ queryKey: ["postdetails", postid] });
      toast.success("comment deleted");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <>
      {" "}
      <Dropdown>
        <Button
          aria-label="Menu"
          style={{ height: 10 }}
          className="bg-transparent ml-auto pl-4 transition-all duration-150 text-gray-400 hover:text-gray-600"
        >
          <Ellipsis />
        </Button>

        <Dropdown.Popover>
          <Dropdown.Menu>
            {/* Edit Post */}
            <Dropdown.Item
              onClick={() => {
                state.open();
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
      <UpdateComment
        body={body}
        photo={photo}
        state={state}
        postid={postid}
        commentid={id}
      />
    </>
  );
}
