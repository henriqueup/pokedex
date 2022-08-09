import { h, Ref } from "preact";
import { forwardRef, useEffect, useState } from "preact/compat";
import FloatingContainer from "../floatingContainer";
import { IOption } from "../Select";
import style from "./style.css";

type Props = {
  open: boolean;
  options: IOption[];
  handleSetOption: (event: Event, option: IOption) => void;
  handleClose: () => void;
};

const FloatingDropdown = forwardRef(
  ({ open, options, handleSetOption, handleClose }: Props, ref: Ref<HTMLUListElement>) => {
    const [index, setIndex] = useState(-1);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" && index < options.length - 1) {
        setIndex(i => i + 1);
      } else if (event.key === "ArrowUp" && index > 0) {
        setIndex(i => i - 1);
      } else if (event.key === "Tab") {
        setIndex(i => (i + 1) % options.length);
        event.preventDefault();
      } else if (event.key === "Enter") {
        handleSetOption(event, options[index]);
      }
    };

    useEffect(() => {
      if (open) setIndex(-1);
    }, [open]);

    return (
      <FloatingContainer open={open} handleClose={handleClose}>
        <ul class={style.options} onKeyDown={handleKeyDown} ref={ref} tabIndex={-1}>
          {options.map((option, i) => (
            <li
              value={option.key}
              key={option.key}
              onClick={event => handleSetOption(event, option)}
              tabIndex={0}
              class={style.option}
              style={i === index ? { backgroundColor: "#262626" } : undefined}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </FloatingContainer>
    );
  }
);

export default FloatingDropdown;
