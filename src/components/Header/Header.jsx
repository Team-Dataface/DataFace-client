import Button from "../shared/Button";
import RelationBtn from "./RelationBtn";
import ModifyDocBtns from "./ModifyDocBtns";
import ModifyViewBtns from "./ModifyViewBtns";

import logo from "../../assets/dataface_logo.png";

function Header() {
  return (
    <div className="flex border-2 w-full">
      <div className="left w-9/12">
        <div>
          <img className="w-20 h-20" src={logo} alt="dataface logo" />
        </div>

        <div className="flex justify-between">
          <RelationBtn />
          <ModifyDocBtns />
          <ModifyViewBtns />
        </div>
      </div>

      <div className="right w-3/12 text-center">
        <div className="my-4">
          <Button>logout</Button>
        </div>
        <div>
          <Button>save</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
