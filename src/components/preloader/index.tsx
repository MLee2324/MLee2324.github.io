"use client";
import { createContext, ReactNode, useContext } from "react";

// There is no loading splash: the site has no 3D scene to wait for. The
// context stays so components can keep gating entrance animations on it.
type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
};
const READY: PreloaderContextType = {
  isLoading: false,
  loadingPercent: 100,
  bypassLoading: () => {},
};
export const preloaderContext = createContext<PreloaderContextType>(READY);

export const usePreloader = () => useContext(preloaderContext);

function Preloader({ children }: { children: ReactNode; disabled?: boolean }) {
  return <preloaderContext.Provider value={READY}>{children}</preloaderContext.Provider>;
}

export default Preloader;
