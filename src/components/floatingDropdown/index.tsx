import { h } from "preact";
import FloatingContainer from "../floatingContainer";
import { IOption } from "../Select";
import style from "./style.css";

type Props = {
  open: boolean;
  options: IOption[];
  handleClickOption: (event: MouseEvent, key: string | number, newValue: string) => void;
  handleClose: () => void;
};

const FloatingDropdown = ({ open, options, handleClickOption, handleClose }: Props) => {
  return (
    <FloatingContainer open={open} handleClose={handleClose}>
      <ul class={style.options}>
        {options.map(option => (
          <li
            value={option.key}
            key={option.key}
            class={style.option}
            onClick={event => handleClickOption(event, option.key, option.value)}
            tabIndex={0}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </FloatingContainer>
  );
};

export default FloatingDropdown;
