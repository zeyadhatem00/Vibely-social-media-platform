import {
  ArrowRightFromSquare,
  PersonFill,
  ChevronDown,
} from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import { Brand } from "../authcomplayout/Brand";

import { useContext } from "react";
import { authcontext } from "../../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import { userdatacontext } from "./../../context/Userdatacntext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BellFill } from "@gravity-ui/icons";
import axios from "axios";
import { baseurl } from "../../const/env";

import { PersonPlus } from "@gravity-ui/icons";
export default function Nav() {
  let { setToken, token } = useContext(authcontext);
  let { userData } = useContext(userdatacontext);
  let navigate = useNavigate();
  let query = useQueryClient();

  function noticount() {
    return axios.get(`${baseurl}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  let { data } = useQuery({
    queryFn: noticount,
    queryKey: ["notinumber"],
    select: (data) => {
      return data?.data.data.unreadCount;
    },
  });

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex justify-between max-w-7xl flex-wrap items-center gap-5 px-6 py-4">
          <Brand />

          <div className="flex gap-4 items-center">
            <img
              src={
                userData?.photo
                  ? userData.photo
                  : "https://cdn-icons-png.flaticon.com/128/456/456212.png"
              }
              onClick={() => {
                navigate("/profile");
              }}
              alt="Alex Morgan"
              className=" cursor-pointer h-8 w-8 rounded-full object-cover"
            />

            <div className="relative">
              {data !== 0 && (
                <span className="size-2 right-0   absolute rounded-full bg-red-600 text-black">
                  {" "}
                </span>
              )}
              <BellFill
                className="cursor-pointer size-5 hover:text-emerald-700 transition-all duration-150"
                onClick={() => {
                  navigate("/Notifications");
                }}
              />
            </div>
            <Link className="lg:hidden " to={"/follow"}>
              {" "}
              <PersonPlus className="cursor-pointer  size-5 hover:text-emerald-700 transition-all duration-15" />
            </Link>
            <Dropdown>
              <Button
                aria-label="Menu"
                className="bg-transparent px-0 text-black"
              >
                <ChevronDown />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="transition-all duration-200"
                  >
                    <PersonFill className="size-4 shrink-0 text-muted" />
                    <Label className="text-muted">Profile</Label>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken(null);
                      navigate("/");
                      query.removeQueries({ queryKey: ["userData"] });
                    }}
                    className=" transition-all duration-200 data-[focused=true]:bg-danger-soft"
                    variant="danger"
                  >
                    <ArrowRightFromSquare className="size-4 shrink-0 text-danger" />
                    <Label>Signout</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}
