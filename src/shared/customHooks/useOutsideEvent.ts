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

    document.addEventListener(eventName, handleOutsideClick);

    return () => {
      document.removeEventListener(eventName, handleOutsideClick);
    };
  }, [ref, eventName, callback]);
};
