import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/system";

import { HomePage } from "@/pages/HomePage.tsx";
import { GamePage } from "@/pages/GamePage.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
            <Routes>
            <Route element={<HomePage />} path="/session/:sessionId" />
            <Route element={<GamePage />} path="/session/:sessionId/game/:gameId" />
          </Routes>
            </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
