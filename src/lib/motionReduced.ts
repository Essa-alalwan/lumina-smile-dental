import { useReducedMotion } from "framer-motion";

/**
 * Shared reduced-motion handling for Framer Motion: avoids large movement when the user
 * has "Reduce motion" enabled at the OS level.
 */
export function useMotionReduced() {
  const reduceMotion = useReducedMotion();
  return {
    reduceMotion,
    /** Use for `initial` — `false` skips enter animation. */
    instant: reduceMotion,
  };
}
