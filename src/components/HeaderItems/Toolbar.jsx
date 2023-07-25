import PropTypes from "prop-types";

import RelationButton from "./RelationButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";

function Toolbar({ user }) {
  return (
    <div className="flex justify-between items-center w-full h-full mr-3 bg-black-bg">
      <RelationButton />
      <DocHandlerButtons user={user} />
      <SwitchViewButtons />
    </div>
  );
}

Toolbar.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Toolbar;
