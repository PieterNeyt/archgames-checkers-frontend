import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/system";

import Starfield from "@/layouts/background.tsx";

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen relative overflow-hidden bg-black">
      <Starfield
        speedFactor={0.05}
        starColor={[255, 255, 255]}
        starCount={1500}
      />

      {/* Sidebar en main content */}
      <div className="flex h-full w-full relative z-10">
        <main className="dark text-foreground flex-1 overflow-auto relative z-10">
          <HeroUIProvider>{children}</HeroUIProvider>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
