import CONSTANT from "../../constants/constant";

const { fieldTypes } = CONSTANT;

function Select() {
  return (
    <select className="flex items-center w-[140px] h-7 mr-2 p-1 px-2 bg-light-grey text-center">
      {fieldTypes.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
