import PropTypes from "prop-types";
import Button from "../shared/Button";

function ModifyDocBtns({ disabled }) {
  return (
    <div className="flex">
      <Button className="left" disabled={disabled || false}>
        Left
      </Button>
      <h1>index</h1>
      <Button className="right" disabled={disabled || false}>
        Right
      </Button>
      <Button className="+" disabled={disabled || false}>
        +
      </Button>
      <Button className="-" disabled={disabled || false}>
        -
      </Button>
    </div>
  );
}

ModifyDocBtns.propTypes = {
  disabled: PropTypes.bool,
};

ModifyDocBtns.defaultProps = {
  disabled: false,
};

export default ModifyDocBtns;
