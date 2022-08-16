import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { useCallback, useRef, useState } from "preact/hooks";
import ChevronDown from "../../shared/icons/ChevronDown";
import X from "../../shared/icons/X";
import { handleEnterAsClick } from "../../shared/utils/nodeUtils";
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

  const floatingDropdownRef = useRef<HTMLUListElement>(null);
  const shrinkLabel = value || filterValue || placeholder;

  const handleOwnChange = (event: Event, option: IOption) => {
    setValue(option.value);
    setFilterValue(option.value);
    handleChange(option.key);
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setOptionsIsOpen(true);
      floatingDropdownRef.current?.focus();
      event.preventDefault();
    }
  };

  const handleClear = (event: Event) => {
    setValue("");
    setFilterValue("");
    handleChange("");
    setFilteredOptions(options);
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
      onKeyDown={handleKeyDown}
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
          tabIndex={0}
        />
        <div class={style.icon} onKeyDown={handleEnterAsClick(handleFieldsetClick)} tabIndex={0}>
          <ChevronDown width={16} height={16} fill="none" />
        </div>
        {value && (
          <div
            class={style.icon}
            onClick={handleClear}
            onKeyDown={handleEnterAsClick(handleClear)}
            tabIndex={0}
          >
            <X width={16} height={16} />
          </div>
        )}
      </div>
      <FloatingDropdown
        open={optionsIsOpen}
        options={filteredOptions}
        handleSetOption={handleOwnChange}
        handleClose={handleCloseOptions}
        ref={floatingDropdownRef}
      />
    </fieldset>
  );
};

export default Select;
