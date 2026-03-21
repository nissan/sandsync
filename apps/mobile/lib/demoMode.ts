/**
 * Demo Mode — controls whether PowerSync is connected or intentionally disconnected.
 * Starts in OFFLINE mode so first launch shows empty local SQLite.
 * Toggling online triggers PowerSync sync — stories appear live.
 */

import { db } from "./powersync";

// Start offline for demo — set to false to start connected
let _isOnline = false;
const _listeners: Array<(online: boolean) => void> = [];

export function isDemoOnline() {
  return _isOnline;
}

export function subscribeDemoMode(fn: (online: boolean) => void) {
  _listeners.push(fn);
  return () => {
    const i = _listeners.indexOf(fn);
    if (i >= 0) _listeners.splice(i, 1);
  };
}

export async function setDemoOnline(online: boolean) {
  _isOnline = online;
  _listeners.forEach((fn) => fn(online));
  if (online) {
    // Reconnect PowerSync — triggers initial sync
    const { SupabaseConnector } = await import("./supabase");
    await db.connect(new SupabaseConnector());
  } else {
    await db.disconnect();
  }
}
