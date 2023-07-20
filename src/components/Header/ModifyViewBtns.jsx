import PropTypes from "prop-types";
import Button from "../shared/Button";

function ModifyViewBtns({ disabled }) {
  return (
    <div className="flex">
      <Button className="relation" disabled={disabled || false}>
        relation
      </Button>
      <Button className="relation" disabled={disabled || false}>
        relation
      </Button>
    </div>
  );
}

ModifyViewBtns.propTypes = {
  disabled: PropTypes.bool,
};

ModifyViewBtns.defaultProps = {
  disabled: false,
};

export default ModifyViewBtns;
