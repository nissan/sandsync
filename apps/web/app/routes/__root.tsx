import { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { PowerSyncContext } from "@powersync/react";
import { powerSyncDatabase } from "../lib/powersync";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    // Connect to PowerSync backend
    const connectDb = async () => {
      try {
        await (powerSyncDatabase as any).connect();
      } catch (err) {
        console.error("Failed to connect PowerSync:", err);
      }
    };
    connectDb();
    
    return () => {
      powerSyncDatabase.disconnect().catch(console.error);
    };
  }, []);

  return (
    <PowerSyncContext.Provider value={powerSyncDatabase}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-amber-50 relative overflow-hidden">
        {/* Twinkling stars background */}
        <div className="star star-1" />
        <div className="star star-2" />
        <div className="star star-3" />
        <div className="star star-4" />
        <div className="star star-5" />
        <div className="star star-6" />
        <div className="star star-7" />
        <div className="star star-8" />
        <div className="star star-9" />
        <div className="star star-10" />

        <header className="border-b border-amber-200/10 px-6 py-4 bg-slate-900/50 backdrop-blur-md relative z-10">
          <nav className="mx-auto max-w-4xl flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight text-amber-100">
              🌴 SandSync
            </a>
            <span className="text-xs text-amber-200/60">
              Caribbean Folklore AI · PowerSync AI Hackathon 2026
            </span>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8 relative z-10">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
      {/* @ts-ignore - DEV is provided by Vite */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </PowerSyncContext.Provider>
  );
}
