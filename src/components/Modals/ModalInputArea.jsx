import PropTypes from "prop-types";

function ModalInputArea({ children }) {
  return (
    <div className="flex justify-center items-center w-full p-1 px-3 rounded-lg ring-2 ring-grey">
      {children}
    </div>
  );
}

ModalInputArea.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalInputArea;
