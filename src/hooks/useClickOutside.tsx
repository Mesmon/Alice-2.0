import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
) => {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const currentElement = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!currentElement || currentElement.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
    // Reload only if ref or handler changes
  }, [ref, handler]);
};

export default useClickOutside;
