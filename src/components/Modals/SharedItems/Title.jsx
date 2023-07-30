import PropTypes from "prop-types";

function Title({ children }) {
  return <h1 className="flex text-xl font-bold mb-5">{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
