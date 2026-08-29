import { createBrowserRouter } from "react-router-dom";
import Authlayout from "../Layouts/Authlayout/Authlayout";
import Signup from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Mainguard from "../components/Guard/Mainguard";
import Authguard from "../components/Guard/Authguard";
import Singlepostdetails from "../components/Posts/Singlepostdetails";
import NotFoundPage from "../pages/Notfound/NotFoundPage";
import Notifications from "../pages/Notifications/Notifications";
import FollowSuggestions from "../components/Posts/Followsuggestion";

export const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <Authguard>
        {" "}
        <Authlayout />
      </Authguard>
    ),
    children: [
      { path: "signup", element: <Signup /> },
      { index: true, element: <Login /> },
    ],
    errorElement: <NotFoundPage />,
  },

  {
    path: "",
    element: (
      <Mainguard>
        <Mainlayout />
      </Mainguard>
    ),
    children: [
      { path: "Home", element: <Home /> },
      { path: "Notifications", element: <Notifications /> },
      { path: "Profile", element: <Profile /> },
      { path: "follow", element: <FollowSuggestions /> },
      { path: "postdetails/:postid", element: <Singlepostdetails /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);
FollowSuggestions;
