import { RefObject } from "preact";
import { useEffect } from "preact/hooks";

type Props = {
  ref: RefObject<HTMLElement>;
  eventName: "mousedown" | "mouseup";
  callback: () => void;
};

export const useOutsideEvent = ({ ref, eventName, callback }: Props): void => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener(eventName, handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(eventName, handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, eventName, callback]);
};
