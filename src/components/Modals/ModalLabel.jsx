import PropTypes from "prop-types";

function ModalLabel({ value }) {
  return (
    <div className="flex justify-end p-3">
      <span className="flex items-center h-7">{value}</span>
    </div>
  );
}

ModalLabel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ModalLabel;
