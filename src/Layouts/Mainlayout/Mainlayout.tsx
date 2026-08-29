import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Navbar/Nav";

export default function Mainlayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
