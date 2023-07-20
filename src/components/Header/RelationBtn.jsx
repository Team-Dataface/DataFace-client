import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../shared/Button";

function RelationBtn({ disabled }) {
  // const navigate = useNavigate();

  return (
    <Button
      className="relation"
      disabled={disabled || false}
      onClick={() => {
        // navigate("/relation");
      }}
    >
      relation
    </Button>
  );
}

RelationBtn.propTypes = {
  disabled: PropTypes.bool,
};

RelationBtn.defaultProps = {
  disabled: false,
};

export default RelationBtn;
