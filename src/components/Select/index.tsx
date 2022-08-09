import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { useCallback, useState } from "preact/hooks";
import ChevronDown from "../../shared/icons/ChevronDown";
import X from "../../shared/icons/X";
import FloatingDropdown from "../floatingDropdown";
import style from "./style.css";

export interface IOption {
  key: string | number;
  value: string;
}

type Props = {
  label: string;
  options: IOption[];
  placeholder?: string;
  handleChange: (key: string | number) => void;
};

const Select = ({ label, options, placeholder, handleChange }: Props) => {
  const [value, setValue] = useState("");
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const shrinkLabel = value || placeholder;

  const handleOwnChange = (event: MouseEvent, key: string | number, newValue: string) => {
    setValue(newValue);
    setFilterValue(newValue);
    handleChange(key);
    handleCloseOptions();
    event.stopPropagation();
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;

    setFilterValue(newValue);
    setFilteredOptions(
      options.filter(option => option.value.toLowerCase().startsWith(newValue.toLowerCase()))
    );
  };

  const handleClear = (event: MouseEvent) => {
    setValue("");
    setFilterValue("");
    handleChange("");
    event.stopPropagation();
  };

  const handleFieldsetClick = () => {
    setOptionsIsOpen(true);
  };

  const handleCloseOptions = useCallback(() => {
    setOptionsIsOpen(false);
  }, []);

  return (
    <fieldset
      class={style.fieldset}
      style={{ marginTop: shrinkLabel ? undefined : "6px" }}
      onClick={handleFieldsetClick}
    >
      {shrinkLabel && <legend>{label}</legend>}
      <div
        class={style.fieldsetBody}
        style={{ paddingTop: shrinkLabel ? undefined : "8px", paddingBottom: "8px" }}
      >
        <input
          placeholder={placeholder || label}
          class={style.input}
          value={filterValue}
          onInput={handleChangeInput}
          tabIndex={1}
        />
        <div class={style.icon}>
          <ChevronDown width={16} height={16} fill="none" />
        </div>
        {value && (
          <div class={style.icon} onClick={handleClear}>
            <X width={16} height={16} />
          </div>
        )}
      </div>
      <FloatingDropdown
        open={optionsIsOpen}
        options={filteredOptions}
        handleClickOption={handleOwnChange}
        handleClose={handleCloseOptions}
      />
    </fieldset>
  );
};

export default Select;
