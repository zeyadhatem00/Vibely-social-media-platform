import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{ duration: 2000 }}
      />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
