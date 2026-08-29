import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Authcontextprovider } from "./context/authcontext.tsx";
import { Userdataprovide } from "./context/Userdatacntext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const query = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Authcontextprovider>
    {" "}
    <QueryClientProvider client={query}>
      <Userdataprovide>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </Userdataprovide>
    </QueryClientProvider>
  </Authcontextprovider>,
);
