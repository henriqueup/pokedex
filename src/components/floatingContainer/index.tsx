import { h, RefCallback, VNode } from "preact";
import { useCallback, useRef, useState } from "preact/hooks";
import { useOutsideEvent } from "../../shared/customHooks/useOutsideEvent";
import style from "./style.css";

type Props = {
  open: boolean;
  handleClose: () => void;
  className?: string;
  children: VNode | VNode[];
};

const RECT_PADDING = 1;

const FloatingContainer = ({ open, handleClose, className, children }: Props) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideEvent({ ref: containerRef, eventName: "mousedown", callback: handleClose });

  const containerCallbackRef = useCallback<RefCallback<HTMLDivElement>>(ref => {
    containerRef.current = ref;
    const parentRect = ref?.parentElement?.getBoundingClientRect();

    if (parentRect) {
      const x = parentRect.x + RECT_PADDING;
      const y = parentRect.y + parentRect.height;
      const width = parentRect.width - RECT_PADDING * 2;

      setRect(new DOMRect(x, y, width));
    }
  }, []);

  if (!open) return null;

  return (
    <div
      style={{ top: rect?.top, left: rect?.left, width: rect?.width }}
      class={`${style.root} ${className}`}
      ref={containerCallbackRef}
    >
      {children}
    </div>
  );
};

export default FloatingContainer;
