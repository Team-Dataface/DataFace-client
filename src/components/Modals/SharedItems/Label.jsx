import PropTypes from "prop-types";

function Label({ children }) {
  return (
    <div className="flex justify-end p-3">
      <span className="flex items-center h-7 text-right">{children}</span>
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Label;
