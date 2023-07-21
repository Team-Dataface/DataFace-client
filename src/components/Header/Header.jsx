import Button from "../shared/Button";
import RelationBtn from "./RelationBtn";
import ModifyDocBtns from "./ModifyDocBtns";
import ModifyViewBtns from "./ModifyViewBtns";

import logo from "../../assets/dataface_logo.png";

function Header() {
  return (
    <div className="flex flex-col border-2 w-full">
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
        <div className="left w-9/12">
          <div className="flex justify-between">
            <RelationBtn />
            <ModifyDocBtns />
            <ModifyViewBtns />
          </div>
        </div>

        <div className="right w-3/12 text-center">
          <div>
            <Button>save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
