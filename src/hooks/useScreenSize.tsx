import { useSyncExternalStore } from "react";

export default function useScreenSize() {
  const sizes = useSyncExternalStore(subscribe, getSnapshot);
  return sizes;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

let state: { width: null | number; height: null | number } = {
  width: null,
  height: null,
};

function getSnapshot() {
  if (
    state.width !== window.innerWidth ||
    state.height !== window.innerHeight
  ) {
    state = { width: window.innerWidth, height: window.innerHeight };
  }
  return state;
}
