import Button from "../shared/Button";
import RelationButton from "./RelationButton";
import DocHandlerButtons from "./DocHandlerButtons";
import SwitchViewButtons from "./SwitchViewButtons";

import logo from "../../assets/dataface_logo.png";

function Header() {
  return (
    <div className="flex flex-col w-full border-2">
      <div className="flex flex-row justify-between">
        <div>
          <img className="w-20 h-20" src={logo} alt="dataface logo" />
        </div>
        <div>
          <h1>Page Name</h1>
        </div>
        <div className="mx-36">
          <Button>logout</Button>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="w-9/12">
          <div className="flex justify-between">
            <RelationButton />
            <DocHandlerButtons />
            <SwitchViewButtons />
          </div>
        </div>

        <div className="w-3/12 text-center">
          <div>
            <Button>save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
