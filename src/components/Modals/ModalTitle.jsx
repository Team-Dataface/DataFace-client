import PropTypes from "prop-types";

function ModalTitle({ value }) {
  return <h1 className="flex text-xl font-bold mb-5">{value}</h1>;
}

ModalTitle.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ModalTitle;
