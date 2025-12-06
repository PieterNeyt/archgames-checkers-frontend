import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/system";

import DefaultLayout from "@/layouts/default.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { GamePage } from "@/pages/GamePage.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <DefaultLayout>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<GamePage />} path="/game/:gameId" />
          </Routes>
        </DefaultLayout>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
