import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let routerInstance: ReturnType<typeof createTanStackRouter> | null = null;

export function createRouter() {
  if (!routerInstance) {
    routerInstance = createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
    });
  }
  return routerInstance;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
