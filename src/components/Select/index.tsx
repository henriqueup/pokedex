import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { useRef, useState } from "preact/hooks";
import ChevronDown from "../../shared/icons/ChevronDown";
import X from "../../shared/icons/X";
import style from "./style.css";

interface IOption {
  value: string;
  label: string;
}

type Props = {
  label: string;
  options: IOption[];
  placeholder?: string;
  handleChange: (value: string) => void;
};

const Select = ({ label, options, placeholder, handleChange }: Props) => {
  const selectElement = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState("");

  const handleOwnChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setValue(event.currentTarget.value);
    handleChange(event.currentTarget.value);
  };

  const handleClear = (): void => {
    setValue("");
    handleChange("");
  };

  const handleChevronClick = (event: MouseEvent): void => {
    selectElement.current?.dispatchEvent(event);
  };

  return (
    <fieldset class={style.fieldset}>
      {(placeholder || value) && <legend>{label}</legend>}
      <div class={style.fieldsetBody}>
        <select
          class={style.select}
          onChange={handleOwnChange}
          value={value}
          ref={selectElement}
          open={true}
        >
          <option value="" disabled selected hidden>
            {placeholder || label}
          </option>
          {options.map((option, i) => (
            <option value={option.value} key={`${option.value}${i}`}>
              {option.label}
            </option>
          ))}
        </select>
        <div class={`${style.chevronIcon} ${style.icon}`} onClick={handleChevronClick}>
          <ChevronDown width={16} height={16} fill="none" />
        </div>
        {value && (
          <div class={`${style.closeIcon} ${style.icon}`} onClick={handleClear}>
            <X width={16} height={16} />
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default Select;
