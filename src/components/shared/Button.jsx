import PropTypes from "prop-types";

function Button({ className, type, children, disabled, onClick }) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "click",
  disabled: false,
  className: "",
  onClick: null,
};

export default Button;
