import PropTypes from "prop-types";

function Select({ options, updateFieldType, index }) {
  return (
    <select
      className="flex items-center w-[140px] h-7 mr-2 p-1 px-2 bg-light-grey text-center"
      onChange={event => updateFieldType(index, event)}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
