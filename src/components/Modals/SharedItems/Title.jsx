import PropTypes from "prop-types";

function Title({ value }) {
  return <h1 className="flex text-xl font-bold mb-5">{value}</h1>;
}

Title.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Title;
