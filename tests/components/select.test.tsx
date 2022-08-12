import { mount, ReactWrapper } from "enzyme";
import { h } from "preact";
import Select, { IOption } from "../../src/components/Select";

const mockOptions: IOption[] = [
  {
    key: "op1",
    value: "val1"
  },
  {
    key: "op2",
    value: "val2"
  }
];

const handleChangeMock = jest.fn();

describe("Select", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <Select label="Test Select" options={mockOptions} handleChange={handleChangeMock} />
    );
  });

  it("should render with label", () => {
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    expect(inputNode.placeholder).toMatch("Test Select");
    expect(inputNode.value).toMatch("");
  });

  it("should open options on click", () => {
    const input = wrapper.find("input");
    input.simulate("click");

    const options = wrapper.findWhere(node => node.type() === "li");
    const optionNodes = options.map(opt => opt.getDOMNode<HTMLLIElement>());

    expect(optionNodes.length).toBe(mockOptions.length);

    mockOptions.forEach(mockOption => {
      expect(wrapper.text()).toMatch(mockOption.value);
    });
  });

  it("should open options on ArrowDown key", () => {
    const input = wrapper.find("input");
    input.simulate("keypress", { key: "ArrowDown" });

    const options = wrapper.findWhere(node => node.type() === "li");
    const optionNodes = options.map(opt => opt.getDOMNode<HTMLLIElement>());

    expect(optionNodes.length).toBe(mockOptions.length);

    mockOptions.forEach(mockOption => {
      expect(wrapper.text()).toMatch(mockOption.value);
    });
  });

  it("should open shrink label on type", () => {
    const input = wrapper.find("input");
    const inputNode = input.getDOMNode<HTMLInputElement>();

    inputNode.value = "val1";
    input.simulate("input");

    const legend = wrapper.find("legend");

    expect(legend.text()).toMatch("Test Select");
  });
});
