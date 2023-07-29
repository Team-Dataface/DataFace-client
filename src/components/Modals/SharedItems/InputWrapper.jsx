import PropTypes from "prop-types";

function InputWrapper({ children }) {
  return (
    <div className="flex justify-center items-center w-full p-2">
      <div className="flex justify-center items-center w-full p-1 px-3 rounded-lg ring-2 ring-grey">
        {children}
      </div>
    </div>
  );
}

InputWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default InputWrapper;
