import { mount, ReactWrapper } from "enzyme";
import { h } from "preact";
import Select, { IOption } from "../../src/components/Select";

const mockOptions: IOption[] = [
  {
    key: "water",
    value: "Water"
  },
  {
    key: "fire",
    value: "Fire"
  }
];

describe("Select", () => {
  let wrapper: ReactWrapper;
  let handleChangeMock: jest.Mock;

  const clickEmptyInput = () => {
    const input = wrapper.find("input");
    input.simulate("click");
    const options = wrapper.findWhere(node => node.type() === "li");

    expect(options.length).toBe(mockOptions.length);
  };

  const selectNthOption = (optionIndex: number) => {
    const input = wrapper.find("input");
    input.simulate("click");

    let options = wrapper.findWhere(node => node.type() === "li");
    const firstOption = options.at(optionIndex);
    firstOption.simulate("click");

    const inputNode = input.getDOMNode<HTMLInputElement>();
    options = wrapper.findWhere(node => node.type() === "li");

    expect(inputNode.value).toBe(mockOptions[optionIndex].value);
    expect(options.length).toBe(0);
    expect(handleChangeMock).toHaveBeenCalledWith(mockOptions[optionIndex].key);
  };

  beforeEach(() => {
    handleChangeMock = jest.fn();
    wrapper = mount(
      <Select label="Test Select" options={mockOptions} handleChange={handleChangeMock} />
    );
  });

  it("should render with label", () => {
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    expect(inputNode.placeholder).toBe("Test Select");
    expect(inputNode.value).toBe("");
  });

  it("should open options on click", () => {
    clickEmptyInput();

    mockOptions.forEach(mockOption => {
      expect(wrapper.text()).toMatch(mockOption.value);
    });
  });

  it("should open options on chevron down icon click", () => {
    const icon = wrapper.find("svg");
    icon.simulate("click");
    const options = wrapper.findWhere(node => node.type() === "li");

    expect(options.length).toBe(mockOptions.length);

    mockOptions.forEach(mockOption => {
      expect(wrapper.text()).toMatch(mockOption.value);
    });
  });

  it("should open options on ArrowDown key", () => {
    const input = wrapper.find("input");
    input.simulate("keydown", { key: "ArrowDown" });
    const options = wrapper.findWhere(node => node.type() === "li");

    expect(options.length).toBe(mockOptions.length);

    mockOptions.forEach(mockOption => {
      expect(wrapper.text()).toMatch(mockOption.value);
    });
  });

  it("should shrink label on type", () => {
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    inputNode.value = "asf";
    input.simulate("input");

    const legend = wrapper.find("legend");

    expect(legend.text()).toBe("Test Select");
  });

  it("should shrink label with placeholder", () => {
    wrapper = mount(
      <Select
        label="Test Select"
        options={mockOptions}
        handleChange={handleChangeMock}
        placeholder="Test Field"
      />
    );

    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();
    const legend = wrapper.find("legend");

    expect(inputNode.placeholder).toBe("Test Field");
    expect(legend.text()).toBe("Test Select");
  });

  it("should filter options on type", () => {
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    inputNode.value = "f";
    input.simulate("input");
    input.simulate("click");

    const options = wrapper.findWhere(node => node.type() === "li");

    expect(options.length).toBe(1);
    expect(wrapper.text()).toMatch(mockOptions[1].value);
  });

  it("should select option on option click", () => {
    selectNthOption(0);

    const icons = wrapper.find("svg");
    const legend = wrapper.find("legend");

    expect(icons.length).toBe(2);
    expect(legend.text()).toBe("Test Select");
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should clear selection on clear icon click", () => {
    selectNthOption(1);

    const icons = wrapper.find("svg");
    icons.at(1).simulate("click");
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    expect(inputNode.value).toBe("");
    expect(handleChangeMock).toHaveBeenCalledWith("");
    expect(handleChangeMock).toHaveBeenCalledTimes(2);

    clickEmptyInput();
  });
});
