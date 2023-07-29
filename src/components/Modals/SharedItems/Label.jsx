import PropTypes from "prop-types";

function Label({ value }) {
  return (
    <div className="flex justify-end p-3">
      <span className="flex items-center h-7 text-right">{value}</span>
    </div>
  );
}

Label.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Label;
