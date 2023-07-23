/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({ children, onClick }) {
  return createPortal(
    <div
      className="fixed flex justify-center items-center left-0 right-0 top-0 bottom-0 bg-lght-gray bg-opacity-50 z-10"
      onClick={onClick}
    >
      <div
        className="flex justify-center items-center h-auto w-auto overflow-auto"
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
